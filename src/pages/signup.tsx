import { getClientUser, postWithAuth } from "@/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const username = getClientUser();

  async function signup(e: React.FormEvent) {
    e.preventDefault();

    await postWithAuth(username, "/api/provider/signup", {
      username,
      company: "John Doe's",
    });

    router.push("/dashboard");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Please signup</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        This is a fake signup form created to demonstrate the signup flow.
        <br />
        Click <q>Signup</q> to continue.
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              disabled
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value="*************"
              disabled
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              value="Signup"
            />
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
