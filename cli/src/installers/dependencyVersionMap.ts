/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // TailwindCSS
  tailwindcss: "^4.0.15",
  postcss: "^8.5.3",
  "@tailwindcss/postcss": "^4.0.15",

  "@tanstack/react-query": "^5.69.0",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",

  // biome
  "@biomejs/biome": "1.9.4",

  // eslint / prettier
  prettier: "^3.5.3",
  "@eslint/eslintrc": "^3.3.1",
  "prettier-plugin-tailwindcss": "^0.6.11",
  eslint: "^9.23.0",
  "eslint-config-next": "^15.2.3",
  "eslint-plugin-drizzle": "^0.2.3",
  "typescript-eslint": "^8.27.0",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
