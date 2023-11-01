// IGNORE THIS PAGE: this is an internal paged that's used for testing.
// Feel free to ignore when learning how to use Svix.
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClientUser, postWithAuth } from "@/auth";

export default function AutoLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const logo = searchParams.get("logo");
  const username = searchParams.get("user");

  async function loginFinished(username: string | null, logo: string | null) {
    if (!username && !logo) {
      // Still loading...
      return;
    }

    if (logo) {
      localStorage.setItem("logo", logo);
    } else {
      localStorage.removeItem("logo");
    }
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }

    username = username ?? getClientUser();
    await postWithAuth(username, "/api/provider/signup", {
      username,
      company: "John Doe's",
    });

    router.push("/dashboard");
  }

  React.useEffect(() => {
    loginFinished(username, logo);
  }, [logo, username]);

  return <>Loading...</>;
}
