import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
  });

  return (
    <>
      <Head>
        <title>Svix example</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Login required</h1>
      </main>
    </>
  );
}
