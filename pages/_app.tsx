import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "../components/navigation/Navbar";
import Topbar from "../components/navigation/Topbar";

import "../globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
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
);

export default App;
