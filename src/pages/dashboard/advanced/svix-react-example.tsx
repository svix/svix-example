import { getClientUser, postWithAuth } from "@/auth";
import { useEffect, useState } from "react";
import { SvixProvider, useMessages } from "svix-react";

const EmptyState = () => {
  return (
    <div className="text-center">
      <svg
        className="w-12 h-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No messages</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by sending a few messages.</p>
      <div className="mt-6">
        <a
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          href="/dashboard"
        >
          Send messages
        </a>
      </div>
    </div>
  );
};

const InboundMessages = () => {
  const { data: messages, loading } = useMessages();
  if (loading || !messages) {
    return <div>Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Custom Webhooks Portal</h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 max-w-xl mb-4"
        role="alert"
      >
        This page shows an example custom webhooks portal created with the{" "}
        <a href="https://www.npmjs.com/package/svix-react" className="font-bold">
          Svix React.js library
        </a>
        . This gives you the ability to build custom workflows and designs not possible
        with the commonly used{" "}
        <a href="https://docs.svix.com/app-portal" className="font-bold">
          embeddable application portal
        </a>
        .
      </div>
      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {messages.map((m) => (
            <li key={m.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/null/external-subscribe-basic-ui-elements-2.2-sbts2018-outline-color-sbts2018.png"
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {m.eventType}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{"@" + m.id}</p>
                  <p>
                    <time dateTime={m.timestamp.toISOString()}>
                      {m.timestamp.toISOString()}
                    </time>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function SvixReactExampleDashboard() {
  const [token, setToken] = useState<string>();

  const username = getClientUser();

  async function getToken() {
    const res = await postWithAuth(username, "/api/provider/app-portal", {});

    setToken(res.token);
  }

  useEffect(() => {
    getToken();
  }, []);

  if (!username) {
    return <div>App Id not configured</div>;
  }

  if (!token) {
    return <div>Token not set</div>;
  }

  return (
    <SvixProvider appId={username} token={token}>
      <div className="flex flex-col gap-8">
        <InboundMessages />
      </div>
    </SvixProvider>
  );
}
