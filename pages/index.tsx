import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const HomePage: NextPage = () => <>Home Page</>;

export default withPageAuthRequired(HomePage);
