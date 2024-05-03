import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthToken, getServerUser, getUsecaseFromUsername } from "@/auth";

interface DataOut {
  url: string;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataOut>
) {
  const username = getServerUser(req);

  const svix = new Svix(getAuthToken(getUsecaseFromUsername(username)));
  // The username would normally be fetched from auth, and not body!
  const { url, token } = await svix.authentication.appPortalAccess(username, {});

  res.json({ url, token });
}
