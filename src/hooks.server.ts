import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Auth0Provider from '@auth/core/providers/auth0';
import type { Provider } from '@auth/core/providers';
import type { Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const config: SvelteKitAuthConfig = {
	providers: [
		Auth0Provider({
			id: 'auth0',
			name: 'Auth0',
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER_BASE_URL,
			wellKnown: 'https://dev-****.auth0.com/.well-known/openid-configuration'
		}) as Provider
	],
	secret: process.env.AUTH0_SECRET,
	debug: true,
	session: {
		maxAge: 1800 // 30 mins
	},
	callbacks: {
		jwt: async ({ token, profile }) => {
			if (profile?.sub) {
				token.sub = profile.sub;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (session.user && token?.sub) {
				session.user.id = token.sub
			}
			return session;
		}
	}
};

export const handle = SvelteKitAuth(config) satisfies Handle;
