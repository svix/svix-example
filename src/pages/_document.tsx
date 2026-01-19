import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Svix | example.svix.com</title>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-32x32.png" sizes="32x32" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
