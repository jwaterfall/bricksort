import { NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const CollectionPage: NextPage = () => <div>collection</div>;

export default withPageAuthRequired(CollectionPage);
