import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";

interface DataIn {
  username: string;
  company: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data: DataIn = req.body;

  // Do real signup stuff
  // ...

  // Create Svix application (can also do lazily at a later stage. See docs)
  const svix = new Svix(process.env.SVIX_TOKEN!);

  // REMOVE {
  // This is just a hack for the example because of the fake auth
  try {
    await svix.application.get(data.username);
    // Application already exists which means a user exists, so let's just return
    res.json({});
    return;
  } catch {
    // Assume this means an application doesn't exist
  }
  // } REMOVE

  // Create an application with a uid so that we can refer to it later
  await svix.application.create({ name: data.company, uid: data.username });

  res.json({});
}
