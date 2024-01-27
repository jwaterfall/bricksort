'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const HomePage = () => <>Home</>;

export default withPageAuthRequired(HomePage);
