import { json, redirect, type RequestHandler, type ServerLoad } from '@sveltejs/kit';
import { signIn, signOut } from '@auth/sveltekit/client';
import type { User } from '@auth/sveltekit';

declare global {
	//eslint-disable-next-line
	namespace App {
		interface Locals {
			user: User;
		}
	}
}

export function withPageAuthRequired(next: ServerLoad): ServerLoad {
	return async (request) => {
		const session = await request.locals.auth();
		if (!session?.user) throw redirect(303, '/signin');
		return next({ ...request, locals: { ...request.locals, user: session.user } });
	};
}

export function withRouteAuthRequired(next: RequestHandler): RequestHandler {
	return async (request) => {
		const session = await request.locals.auth();
		if (!session?.user) return json({ error: 'Unauthorized' }, { status: 401 });
		return next({ ...request, locals: { ...request.locals, user: session.user } });
	};
}

export function handleSignIn(callbackUrl?: string) {
	signIn('auth0', callbackUrl ? { callbackUrl } : { redirect: false }, {
		scope: 'api openid profile email',
		prompt: 'login'
	});
}

export function handleSignOut(callbackUrl?: string) {
	signOut(callbackUrl ? { callbackUrl } : {});
}
