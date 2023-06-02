import "@/styles/globals.css";

import Layout from "@/components/layout/layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Event Planner</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        ></meta>
        <meta name="description" content="Event planner"></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
