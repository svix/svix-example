// IGNORE THIS PAGE: this is an internal paged that's used for testing.
// Feel free to ignore when learning how to use Svix.
import React from "react";
import { useSearchParams } from "next/navigation";
import { NextRouter, useRouter } from "next/router";
import { getClientUser, postWithAuth } from "@/auth";

export async function loginFinished(
  router: NextRouter,
  username: string | null,
  logo: string | null,
  avatar: string | null
) {
  if (!username) {
    // Still loading...
    return;
  }

  if (logo) {
    localStorage.setItem("logo", logo);
  } else {
    localStorage.removeItem("logo");
  }
  if (avatar) {
    localStorage.setItem("avatar", avatar);
  } else {
    localStorage.removeItem("avatar");
  }
  if (username) {
    localStorage.setItem("username", username);
  } else {
    localStorage.removeItem("username");
  }

  username = username ?? getClientUser();
  await postWithAuth(username, "/api/provider/signup", {
    username,
    company: "Anvil Technologies",
  });

  router.push("/dashboard");
}

export default function AutoLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const logo = searchParams.get("logo");
  const avatar = searchParams.get("avatar");
  const username = searchParams.get("user");

  React.useEffect(() => {
    loginFinished(router, username, logo, avatar);
  }, [logo, username]);

  return <>Loading...</>;
}
