import { FC, PropsWithChildren } from "react";
import { Poppins, Lobster } from "@next/font/google";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../globals.css";

const roboto = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lobster = Lobster({
  weight: ["400"],
  variable: "--font-lobster",
});

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={`${roboto.variable} ${lobster.variable} h-full`}>
    <head />
    <body className="bg-background text-text font-sans flex h-full">
      <Sidebar />
      <div className="grow">
        <Topbar />
        <main>{children}</main>
      </div>
    </body>
  </html>
);

export default Layout;
