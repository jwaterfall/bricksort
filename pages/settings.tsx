import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const SettingsPage: NextPage = () => <div>settings</div>;

export default withPageAuthRequired(SettingsPage);
