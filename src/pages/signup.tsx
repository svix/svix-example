import { Anvil } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground p-1">
            <Anvil className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
      <Alert className="max-w-lg" variant="info">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a fake signup form created to demonstrate the signup flow. <br />
          It uses the{" "}
          <a
            target="_blank"
            href="https://api.svix.com/docs#tag/Application/operation/v1.application.create"
            className="underline"
            rel="noreferrer"
          >
            create application API
          </a>{" "}
          behind the scenes to create a{" "}
          <a
            target="_blank"
            href="https://docs.svix.com/quickstart#create-a-consumer-application"
            className="underline"
            rel="noreferrer"
          >
            consumer application
          </a>{" "}
          to send webhooks to. <br />
          Click Signup to continue.
        </AlertDescription>
      </Alert>
    </div>
  );
}
