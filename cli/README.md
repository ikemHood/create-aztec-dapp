# create-aztec-dapp

A CLI for creating Aztec dApps with the Next.js framework.

## Usage

### Interactive

```bash
npm create aztec-dapp@latest
```

```bash
npx create-aztec-dapp
```

```bash
yarn create aztec-dapp
```

```bash
pnpm create aztec-dapp
```

```bash
bunx create-aztec-dapp
```

## What's included?

By default, each new Aztec dApp will include:

- [Next.js](https://nextjs.org) app router
- [Tailwind CSS](https://tailwindcss.com)
- [Noir Smart Contract](https://noir-lang.org/)

You will have options to choose:

- A contract type (currently only counter contracts are available, with more
  coming soon)
- Linting/formatting tools (ESLint + Prettier or Biome)

## Features

- **Integrated Smart Contracts**: Every Aztec dApp comes with a Noir smart
  contract in the `contract` directory.
- **Type Safety**: Built with TypeScript for a reliable development experience.
- **Modern UI**: Tailwind CSS for responsive and beautiful UIs out of the box.
- **Next.js App Router**: Uses the latest Next.js features for efficient routing
  and rendering.

## Development

To develop and run the CLI locally:

```bash
git clone https://github.com/ikemHood/create-aztec-dapp.git
cd create-aztec-dapp
pnpm install
pnpm run build
```

## Credits

This project was templated from [create-t3-app](https://github.com/t3-oss/create-t3-app). We've modified it to focus specifically on Aztec development while maintaining the same high standards for developer experience.

## License

MIT
