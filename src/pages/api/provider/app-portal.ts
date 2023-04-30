import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/auth";

interface DataOut {
  url: string;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataOut>
) {
  const username = getUser(req);

  const svix = new Svix(process.env.SVIX_TOKEN!);
  // The username would normally be fetched from auth, and not body!
  const { url, token } = await svix.authentication.appPortalAccess(username, {});

  res.json({ url, token });
}
