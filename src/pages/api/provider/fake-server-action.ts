import { Svix } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerUser } from "@/auth";

// The type parameter makes it easy to trigger events in this exapmle app.
// Normally, this would just be two different API routes that actually do something.
interface DataIn {
  type: "invoice.created" | "invoice.deleted";
}

// The webhook events supported (and their schemas)
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
  const username = getServerUser(req);
  const data: DataIn = req.body;

  const svix = new Svix(process.env.SVIX_TOKEN!);

  // Fake do something, and send a webhook to the customer
  // The username would normally be just the user the event is related to, for the sake of the
  // example we are using the user who triggered the fake event
  if (data.type === "invoice.created") {
    console.log("Fake doing somethig useful");
    const payload: InvoiceCreated = {
      type: "invoice.created",
      id: "invoice_12324",
      amount: 500,
    };
    await svix.message.create(username, { eventType: data.type, payload });
  } else if (data.type === "invoice.deleted") {
    console.log("Fake doing somethig useful");
    const payload: InvoiceDeleted = {
      type: "invoice.deleted",
      id: "invoice_12324",
      reason: "User asked for refund",
    };
    await svix.message.create(username, { eventType: data.type, payload });
  }

  res.json({});
}
