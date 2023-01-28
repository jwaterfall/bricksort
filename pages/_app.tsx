import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { Poppins, Lobster } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "../components/navigation/Navbar";
import Topbar from "../components/navigation/Topbar";

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
                <div className="bg-slate-100 text-slate-900 font-sans flex h-screen overflow-hidden">
                    <Navbar />
                    <main className="grow flex flex-col">
                        <Topbar />
                        <div className="grow w-full overflow-hidden">
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
