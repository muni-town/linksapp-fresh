# Linksapp

![screen_recording](https://user-images.githubusercontent.com/19251998/198886868-0bd8affb-8f0c-445b-b31e-0e122697c751.gif)

## Usage

### Step 1: Fork
[<kbd> <br> ✨ FORK THIS REPO ✨ <br> </kbd>](https://github.com/commune-org/linksapp-fresh/fork)

### Step 2: Run Setup Wizard

```console
deno run -A --unstable https://github.com/commune-org/linksapp-fresh/raw/main/setup.ts
```

### Step 3: Deno Deploy

Head over to [Deno Deploy](https://deno.com) and create a project. Click "Git" tab in the project settings, select the repository, the production branch (`main`) and the entrypoint file (`main.ts`). This will link the project to the repository and automatically deploy it to the internet. The project will now be available at `https://$PROJECT_NAME.deno.dev`. You can also use a custom domain.

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
