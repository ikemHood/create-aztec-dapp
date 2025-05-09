# create-aztec-dapp Documentation Site

Based on the [Astro Starter Kit: Docs Site](https://github.com/withastro/astro/tree/latest/examples/docs). New to Astro?

- Check out [their documentation](https://docs.astro.build).
- Jump into their [Discord server](https://astro.build/chat).
- Deploy a site to production with the guide, [Deploy an Astro Website](https://docs.astro.build/guides/deploy).

## Outline

- [Features](#features)
- [Run Site Locally](#run-site-locally)
- [Command Cheat Sheet](#command-cheat-sheet)
- [Customize This Theme](#customize-this-theme)
  - [Site Metadata](#site-metadata)
  - [CSS Styling](#css-styling)
  - [Page Metadata](#page-metadata)
  - [Sidebar Navigation](#sidebar-navigation)
- [Credits](#credits)

## Features

- ✅ **Full Markdown support**
- ✅ **Responsive mobile-friendly design**
- ✅ **Sidebar navigation**
- ✅ **Search (powered by Algolia)**
- ✅ **Automatic table of contents**
- ✅ **Automatic list of contributors**
- ✅ (and, best of all) **dark mode**

## Run Site Locally

```bash
git clone https://github.com/ikemHood/create-aztec-dapp.git
cd create-aztec-dapp/www
pnpm i
pnpm dev
```

## Command Cheat Sheet

All commands are run from the root of the project, from a terminal.

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Customize This Theme

### Site Metadata

`src/config.ts` contains several data objects that describe metadata about your site like title, description, default language, and Open Graph details. You can customize these to match your project.

### CSS Styling

The theme's look and feel is controlled by a few key variables that you can customize yourself. You'll find them in the `public/theme.css` CSS file. If you've never worked with CSS variables before, give [MDN's guide on CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) a quick read.

This theme uses a "cool blue" accent color by default. To customize this for your project, change the `--theme-accent` variable to whatever color you'd like:

```diff
/* public/theme.css */

:root {
  color-scheme: light;
-  --theme-accent: hsla(var(--color-blue), 1);
+  --theme-accent: hsla(var(--color-red), 1);   /* or: hsla(#FF0000, 1); */
```

### Page Metadata

Astro uses frontmatter in Markdown pages to choose layouts and pass properties to those layouts. If you are using the default layout, you can customize the page in many different ways to optimize SEO and other things.

```markdown
---
title: Example title
description: Really cool docs example that uses Astro
layout: ../../layouts/MainLayout.astro
---

# Page content...
```

This uses the `title` and `description` properties to set the document title, meta title, meta description, and Open Graph description. See `src/components/HeadSEO.astro` for more SEO related properties.

### Sidebar Navigation

The sidebar navigation is controlled by the `SIDEBAR` variable in your `src/config.ts` file. You can customize the sidebar by modifying this object. A default, starter navigation has already been created for you.

```ts
// src/config.ts

export const SIDEBAR = {
  en: {
    "Create Aztec Dapp": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Installation", link: "en/installation" },
    ],
  },
};
```

## Credits

This documentation site was templated from the [create-t3-app](https://github.com/t3-oss/create-t3-app) project. We've modified it to focus specifically on Aztec development while maintaining the same high standards for developer experience.
