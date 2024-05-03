import { NextApiRequest } from "next";

export enum Usecase {
  Ai = "ai",
  Fintech = "fintech",
  Devtools = "devtools",
  Logistics = "logistics",
  Gtm = "gtm",
}

// This is just terrible fake auth which automatically authenticates people
export function getServerUser(req: NextApiRequest): string {
  const username = req.headers.authorization;
  if (!username) {
    throw Error("Authentication failed");
  }
  return username;
}

export function getClientUser(): string {
  let user = undefined;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("username");
  }
  return user ?? "john-doe";
}

export function getClientLogo(): string {
  let logo = undefined;
  if (typeof window !== "undefined") {
    logo = localStorage.getItem("logo");
  }
  return logo ?? "/logoipsum.svg";
}

export function getClientAvatar(): string {
  let avatar = undefined;
  if (typeof window !== "undefined") {
    avatar = localStorage.getItem("avatar");
  }
  return (
    avatar ??
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
}

export function getUsecaseFromUsername(username: string): Usecase {
  if (username.startsWith("ai-")) {
    return Usecase.Ai;
  } else if (username.startsWith("devtools-")) {
    return Usecase.Devtools;
  } else if (username.startsWith("logistics-")) {
    return Usecase.Logistics;
  } else if (username.startsWith("gtm-")) {
    return Usecase.Gtm;
  } else if (username.startsWith("fintech-")) {
    return Usecase.Fintech;
  } else {
    return Usecase.Fintech;
  }
}

/// The usecase parameter isn't useful in most implementations.
/// It's only used here to support different use cases in the same app.
/// Most implementations will just have one token.
export function getAuthToken(usecase: Usecase): string {
  if (process.env.SVIX_TOKEN_MAP) {
    const map = JSON.parse(process.env.SVIX_TOKEN_MAP);
    return map[usecase];
  } else {
    return process.env.SVIX_TOKEN!;
  }
}

export async function postWithAuth(
  username: string,
  url: string,
  body: any
): Promise<any> {
  const ret = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: username,
    },
    body: JSON.stringify(body),
  });

  return await ret.json();
}
