import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { Lobster, Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import AlertProvider from "../components/AlertProvider";

import "../globals.css";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const lobster = Lobster({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-lobster",
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
    <div className={`font-sans ${poppins.variable} ${lobster.variable}`}>
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <AlertProvider>
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <Topbar />
                        <main className="flex-1 overflow-x-auto scrollbar-none p-4 bg-base-300">
                            <Component {...pageProps} />
                        </main>
                        <Navbar />
                    </div>
                </AlertProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </UserProvider>
    </div>
);

export default App;
