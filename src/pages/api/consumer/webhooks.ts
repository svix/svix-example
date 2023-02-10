import { Webhook } from "svix";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

// IMPORTANT: this prevents next.js from interfering with the payload
// See the docs for more info: https://docs.svix.com/receiving/verifying-payloads/how#nodejs-nextjs
export const config = {
  api: {
    bodyParser: false,
  },
};

// The webhook secret (per endpoint, gotten from the Svix app portal)
const SECRET: string = process.env.SVIX_WEBHOOK_SECRET!;

// Example schemas taken from the sender (e.g. their doc)
interface InvoiceCreated {
  type: "invoice.created";
  id: string;
  amount: number;
}

interface InvoiceDeleted {
  type: "invoice.deleted";
  id: string;
  reason: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") {
    res.status(405).json({});
  }

  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(SECRET);
  let msg: InvoiceDeleted | InvoiceCreated;
  try {
    // The Svix library verifies the headers are valid
    msg = wh.verify(payload, headers as any) as any;
  } catch (err) {
    res.status(400).json({ message: "Bad signature" });
    return;
  }

  // Do something with the message...
  if (msg.type === "invoice.created") {
    console.log("An invoice has been created");
  } else if (msg.type === "invoice.deleted") {
    console.log("An invoice has been deleted");
  } else {
    res.status(400).json({ message: "Unknown event type" });
    return;
  }

  res.json({});
}
