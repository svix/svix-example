import { getClientUser } from "@/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginFinished } from "./autologin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const clientUser = getClientUser();
  const [username, setUsername] = useState(clientUser);
  const [loading, setLoading] = useState(false);

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await loginFinished(router, username, null, null);

    setLoading(false);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Please signup</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        This is a fake signup form created to demonstrate the signup flow. It uses the{" "}
        <a
          href="https://api.svix.com/docs#tag/Application/operation/v1.application.create"
          className="font-bold"
        >
          create application API
        </a>{" "}
        behind the scenes to create a{" "}
        <a href="https://docs.svix.com/quickstart" className="font-bold">
          consumer application
        </a>{" "}
        to send webhooks to. Click <q>Signup</q> to continue.
      </div>

      <div className="w-full max-w-xs">
        <form
          onSubmit={signup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input id="password" type="password" value="*************" disabled />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Signup"}
            </Button>
            {!loading && (
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
