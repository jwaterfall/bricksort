import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const HomePage: NextPage = () => <div>home</div>;

export default withPageAuthRequired(HomePage);
