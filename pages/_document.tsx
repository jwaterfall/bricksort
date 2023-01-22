import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className="h-full">
                <Head>
                    <title>Bricksort</title>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <meta name="description" content="An app to help you organize your LEGO collection." />
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
