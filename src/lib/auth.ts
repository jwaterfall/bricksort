import { redirect } from '@sveltejs/kit';
import { signIn, signOut } from '@auth/sveltekit/client';

export async function handlePageAuth(locals: App.Locals) {
	const session = await locals.auth();
	if (!session?.user) throw redirect(303, '/signin');
	return session.user;
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
