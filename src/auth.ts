import { NextApiRequest } from "next";

export const hardcodedUsername = "john-doe";

// This is just terrible fake auth which automatically authenticates people
export function getUser(_req: NextApiRequest): string {
  // We assume it's always authenticated as user john-doe
  return hardcodedUsername;
}

export async function postWithAuth(
  _username: undefined | string,
  url: string,
  body: any
): Promise<any> {
  const ret = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await ret.json();
}
