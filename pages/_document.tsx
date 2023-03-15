import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="application-name" content="Bricksort" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Bricksort" />
                    <meta name="description" content="An app to sort your LEGO bricks into sets" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#FFFFFF" />
                    <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
