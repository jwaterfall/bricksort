import { redirect } from '@sveltejs/kit';

export async function handlePageAuth(locals: App.Locals) {
	const session = await locals.auth();
	if (!session?.user) throw redirect(303, '/auth/signin/auth0');
}