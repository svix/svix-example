<h1 align="center">
    <a style="text-decoration: none" href="https://www.svix.com">
      <img width="120" src="https://avatars.githubusercontent.com/u/80175132?s=200&v=4" />
      <p align="center">Svix - Webhooks as a service</p>
    </a>
</h1>
<h2 align="center">
  <a href="https://svix.com">Website</a> | <a href="https://docs.svix.com">Documentation</a> | <a href="https://svix.com/slack">Community Slack</a>
<h2>

# Example Svix Application

This is an example Next.js application showing how to use Svix both as a provider (sender) and a consumer (receiver) of webhooks.

While this application is writing in TypeScript and targets Next.js, it's a useful example for all other languages and frameworks, and shows how to structure an integration.

The application consists of a fake *Signup* form to let a customer "signup" to your application, a fake *Dashboard* that is meant to simulate your real application, and a *Webhooks Portal* to let your customers interact with the webhooks dashboard (add endpoints, see logs, etc).

# What is Svix?

Svix makes it easy for developers to send webhooks. Developers make one API call, and Svix takes care of deliverability, retries, security, and more. For more information, please refer to the [Svix homepage](https://www.svix.com).

# Documentation

You can find general usage documentation at <https://docs.svix.com>. For complete API documentation with code examples for each endpoint in all of our official client libraries head over to our API documentation site at <https://api.svix.com>.

# Support & Community

  - [GitHub Issues](https://github.com/svix/svix-webhooks/issues) - report issues and make suggestions.
  - [Community Forum](https://github.com/svix/svix-webhooks/discussions) - ask questions, and start discussions!
  - [Slack](https://www.svix.com/slack/) - come and chat with us!

To stay up-to-date with new features and improvements be sure to watch our repo!

## Code structure

This codebase contains example code for a webhooks provider (Svix customer), a webhook consumer (Svix customer's customer), and some boilerplate Next.js code. It includes both the UI parts and the server API parts.

### Provider

These files demonstrate how a Svix integration looks like from on provider's (Svix customer) side. This covers both the API and the UI parts.

#### API parts
This file implements a fake signup flow and demonstrates how to create a Svix Application for the customer (consumer) once they sign up to your application.
```
src/pages/api/provider/signup.ts
```

This file is meant to represent business logic on your end, and demonstrates how to send webhooks once events occur on the backend.
```
src/pages/api/provider/fake-server-action.ts
```

This file demonstrates how to securely give your customers access to the pre-built Application Portal. This works in tandem with the UI part below, and supplies it with the login magic link.
```
src/pages/api/provider/app-portal.ts
```

#### UI parts
This page shows how to embed the Svix application portal in your UI using the Svix React library. This page requires the above app portal API page.
```
src/pages/dashboard/webhooks.tsx
```

These two files aren't actually important. They are only needed for a functional example, and are there to simulate having a real application.
```
src/pages/dashboard/index.tsx
src/pages/signup.tsx
```

### Consumer
This API endpoint demonstrates how a consumer of webhooks should verify the integrity of the webhooks using the Svix libraries:
```
src/pages/api/consumer/webhooks.ts
```

### The "advanced" subdirectories
The advanced subdirectories include more advanced topics and examples that are not needed in most cases, and are only needed for advanced use-cases.

## Running it locally

Clone the repository and install needed dependencies
```
git clone https://github.com/svix/svix-example
cd svix-example

# Install needed deps
npm i
```

Create a file called `.env.local` and set both the Svix token (get yours from dashboard.svix.com), and a placeholder webhook secret (we'll get the real one later):

```
# Provider config
SVIX_TOKEN=testsk_SInWH9Tx7tS4Him4re6Zawyx0vf7XlU.eu

# Consumer config
SVIX_WEBHOOK_SECRET="whsec_dont_worry_about_it_for_now"
```

### Creating the needed event types

This example assumes your environment has two event types: `invoice.created` and `invoice.deleted` in your environment. To create them, please head to the [event type page](https://dashboard.svix.com/event-types) on the Svix dashboard. For more information about event types, please refer to [the event types docs](https://docs.svix.com/event-types).

### Verifying webhook signatures

The endpoints in the example will fail to verify the signatures because the webhook secret we set in the previous section is bad. In order to fix that, you would need to navigate to [the Webhooks Portal tab](http://localhost:3000/dashboard/webhooks), click on the endpoint you created, copy the webhook secret, paste it in `.env.local`, and restart your local server.
