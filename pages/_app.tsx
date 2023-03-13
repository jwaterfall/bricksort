import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { Lobster, Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Sidebar from "../components/Sidebar";

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

import "../globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
    <div className={`${roboto.variable} ${lobster.variable}`}>
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <div className="flex w-full h-screen bg-gray-700 font-sans overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 rounded-l-[3rem] bg-gray-800 p-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
                        <div className="flex flex-col gap-8">
                            <Component {...pageProps} />
                        </div>
                    </main>
                </div>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </UserProvider>
    </div>
);

export default App;
