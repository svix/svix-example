import { NextApiRequest } from "next";

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
