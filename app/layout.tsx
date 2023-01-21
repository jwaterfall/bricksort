import { FC, PropsWithChildren } from "react";
import { Poppins, Lobster } from "@next/font/google";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../globals.css";

const roboto = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const lobster = Lobster({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-lobster",
});

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en" className={`${roboto.variable} ${lobster.variable} h-full`}>
        <head />
        <body className="bg-slate-100 text-slate-900 font-sans flex h-full overflow-hidden">
            <Sidebar />
            <main className="grow flex flex-col">
                <Topbar />
                <div className="grow w-full overflow-hidden">{children}</div>
            </main>
        </body>
    </html>
);

export default Layout;
