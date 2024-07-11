import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthToken, getServerUser, getUsecaseFromUsername } from "@/auth";

interface DataOut {
  bridgeToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataOut>
) {
  const username = getServerUser(req);

  const svixToken = getAuthToken(getUsecaseFromUsername(username));
  const svix = new Svix(svixToken);
  // Create a bridge configuration
  const baseUrl = (svix._configuration.baseServer as any).url;
  const ret = await fetch(
    `${baseUrl}/api/v1/app/${username}/events/subscription/bridge1/create-token`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${svixToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Partner token" }),
    }
  );
  const bridgeToken = (await ret.json())["bridgeToken"];

  res.json({ bridgeToken });
}
