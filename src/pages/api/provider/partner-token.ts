import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getAuthToken,
  getPartnerUser,
  getServerUser,
  getUsecaseFromUsername,
} from "@/auth";

interface DataOut {
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataOut>
) {
  const username = getServerUser(req);
  const partner = getPartnerUser(username);

  const svixToken = getAuthToken(getUsecaseFromUsername(username));
  const svix = new Svix(svixToken);
  // Create a partner app if one doesn't already exist.
  await svix.application.getOrCreate({ name: partner, uid: partner });

  // Create a create-message-token
  const baseUrl = (svix._configuration.baseServer as any).url;
  const ret = await fetch(`${baseUrl}/api/v1/auth/app/${partner}/create-message-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${svixToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Partner token" }),
  });
  const cmgToken = (await ret.json())["token"];

  res.json({ token: cmgToken });
}
