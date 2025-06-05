import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getClientAvatar, getClientLogo } from "@/auth";

export default function AppLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [logo, setLogo] = useState("/logoipsum.svg");
  const [avatar, setAvatar] = useState<string>();
  const loggedIn = router.pathname !== "/signup";

  useEffect(() => {
    setLogo(getClientLogo());
    setAvatar(getClientAvatar());
  }, []);

  const title = `${loggedIn ? "Dashboard" : "Signup"} · Svix Example`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/">
              <img src={logo} className="h-8" alt="Logo" />
            </Link>
            {loggedIn && (
              <nav className="flex gap-6 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className={
                    router.pathname === "/dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  Dashboard
                </Link>
              </nav>
            )}
            <div>
              {loggedIn ? (
                <img src={avatar} className="h-8 w-8 rounded-full" alt="avatar" />
              ) : (
                <Link href="/signup" className="text-sm">
                  Signup
                </Link>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      </div>
    </>
  );
}
