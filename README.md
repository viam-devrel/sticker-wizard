# sticker wizard!

Sticker wizard is a sticker vending machine with a twist: you don't get to choose which sticker you get. Instead, you'll scan the QR code, take the "which robot are you?" personality quiz, and then receive the sticker you deserve (along with a free personality analysis). This tutorial will walk you through making your own vending machine from scratch, along with a web application that allows you to operate your machine from any device.

This repository contains the web app user interface for the device, built with Svelte. For instructions on how to build sticker wizard from start to finish, see the [codelabs walkthrough](https://codelabs.viam.com/guide/sticker-wizard/index.html?index=..%2F..index#0).

[![Watch the walkthrough video](https://img.youtube.com/vi/TB40-bLkjDg/maxresdefault.jpg)](https://www.youtube.com/watch?v=TB40-bLkjDg)


## Svelte setup instructions

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

### Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Webserver module configuration

### Attributes

The following attributes are available for this model:

| Name                | Type    | Inclusion | Description                                                                         |
| ------------------- | ------- | --------- | ----------------------------------------------------------------------------------- |
| `port`              | integer | Optional  | Configure the port the webserver listens on. Default is `8888`                      |

### Example configuration:

```json
{
  "port": 33333
}
```
