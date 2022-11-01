# Linksapp

![screen_recording](https://user-images.githubusercontent.com/19251998/198886868-0bd8affb-8f0c-445b-b31e-0e122697c751.gif)

### Usage

Navigate to the folder where you'd like to clone the repo and run the setup
wizard:

```console
deno run -A --unstable https://github.com/commune-org/linksapp-fresh/raw/main/setup.ts
```

Push and deploy your repo using Deno Deploy.

Don't forget to clear Deno cache if you're re-running the setup wizard after a
new release:

```console
deno cache --reload https://github.com/commune-org/linksapp-fresh/raw/main/setup.ts
```

### Features

- Social links
- Github readme
- Banner
- External links
- RSS feed

### Badges

[![Made with Fresh](https://fresh.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)
