import * as p from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { CREATE_T3_APP, DEFAULT_APP_NAME } from "~/consts.js";
import {
  type AvailablePackages,
  contractTypes,
  type ContractType,
} from "~/installers/index.js";
import { getVersion } from "~/utils/getT3Version.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { IsTTYError } from "~/utils/isTTYError.js";
import { logger } from "~/utils/logger.js";
import { validateAppName } from "~/utils/validateAppName.js";
import { validateImportAlias } from "~/utils/validateImportAlias.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;

  /** @internal Used in CI. */
  CI: boolean;
  /** @internal Used in CI. */
  tailwind: boolean;
  /** @internal Used in CI. */
  appRouter: boolean;
  /** @internal Used in CI */
  eslint: boolean;
  /** @internal Used in CI */
  biome: boolean;
  /** @internal Used in CI */
  contractType: ContractType;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
  contractType: ContractType;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ["tailwind", "eslint"],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    CI: false,
    tailwind: false,
    importAlias: "~/",
    appRouter: false,
    eslint: false,
    biome: false,
    contractType: "counter",
  },
  contractType: "counter",
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command()
    .name(CREATE_T3_APP)
    .description("A CLI for creating Aztec dApps")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new t3-app",
      false
    )
    /** START CI-FLAGS */
    /**
     * @experimental Used for CI E2E tests. If any of the following option-flags are provided, we
     *               skip prompting.
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "--tailwind [boolean]",
      "Experimental: Boolean value if we should install Tailwind CSS. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )

    /** @experimental - Used for CI E2E tests. Used in conjunction with `--CI` to skip prompting. */
    .option(
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags.importAlias
    )
    .option(
      "--appRouter [boolean]",
      "Explicitly tell the CLI to use the new Next.js app router",
      (value) => !!value && value !== "false"
    )
    .option(
      "--eslint [boolean]",
      "Experimental: Boolean value if we should install eslint and prettier. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--biome [boolean]",
      "Experimental: Boolean value if we should install biome. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false"
    )
    .option(
      "--contractType [type]",
      `Contract type to use. Possible values: ${contractTypes.join(", ")}`,
      "counter"
    )
    /** END CI-FLAGS */
    .version(getVersion(), "-v, --version", "Display the version number")
    .addHelpText(
      "afterAll",
      `\n The t3 stack was inspired by ${chalk
        .hex("#E8DCFF")
        .bold(
          "@t3dotgg"
        )} and has been used to build awesome fullstack applications like ${chalk
          .hex("#E24A8D")
          .underline("https://ping.gg")} \n`
    )
    .parse(process.argv);

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  /** @internal Used for CI E2E tests. */
  if (cliResults.flags.CI) {
    cliResults.packages = [];
    if (cliResults.flags.tailwind) cliResults.packages.push("tailwind");
    if (cliResults.flags.eslint) cliResults.packages.push("eslint");
    if (cliResults.flags.biome) cliResults.packages.push("biome");
    cliResults.packages.push("noir");
    cliResults.contractType = cliResults.flags.contractType;

    return cliResults;
  }

  if (cliResults.flags.default) {
    return cliResults;
  }

  // Explained below why this is in a try/catch block
  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you
  can provide the arguments from the CLI directly: https://create.t3.gg/en/installation#experimental-usage to skip the prompts.`);

      throw new IsTTYError("Non-interactive environment");
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user

    const pkgManager = getUserPkgManager();

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: "What will your project be called?",
              defaultValue: cliProvidedName,
              validate: validateAppName,
            }),
        }),
        language: () => {
          return p.select({
            message: "Will you be using TypeScript or JavaScript?",
            options: [
              { value: "typescript", label: "TypeScript" },
              { value: "javascript", label: "JavaScript" },
            ],
            initialValue: "typescript",
          });
        },
        _: ({ results }) =>
          results.language === "javascript"
            ? p.note(chalk.redBright("Wrong answer, using TypeScript instead"))
            : undefined,
        styling: () => {
          return p.confirm({
            message: "Will you be using Tailwind CSS for styling?",
          });
        },
        appRouter: () => {
          return p.confirm({
            message: "Would you like to use Next.js App Router?",
            initialValue: true,
          });
        },
        linter: () => {
          return p.select({
            message:
              "Would you like to use ESLint and Prettier or Biome for linting and formatting?",
            options: [
              { value: "eslint", label: "ESLint/Prettier" },
              { value: "biome", label: "Biome" },
            ],
            initialValue: "eslint",
          });
        },
        noir: () => {
          return p.select({
            message: "Which contract type would you like to use?",
            options: contractTypes.map(type => ({
              value: type,
              label: type === "counter" ? "Counter Contract" : type,
            })),
            initialValue: "counter",
          });
        },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                "Should we initialize a Git repository and stage the changes?",
              initialValue: !defaultOptions.flags.noGit,
            });
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === "yarn" ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            });
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          });
        },
      },
      {
        onCancel() {
          process.exit(1);
        },
      }
    );

    const packages: AvailablePackages[] = [];
    if (project.styling) packages.push("tailwind");
    if (project.linter === "eslint") packages.push("eslint");
    if (project.linter === "biome") packages.push("biome");
    packages.push("noir");

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      contractType: project.noir as ContractType,
      flags: {
        ...cliResults.flags,
        appRouter: project.appRouter ?? cliResults.flags.appRouter,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
        contractType: project.noir as ContractType,
      },
    };
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default t3 app
    if (err instanceof IsTTYError) {
      logger.warn(`
  ${CREATE_T3_APP} needs an interactive terminal to provide options`);

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default T3 app?`,
        initialValue: true,
      });

      if (!shouldContinue) {
        logger.info("Exiting...");
        process.exit(0);
      }

      logger.info(`Bootstrapping a default T3 app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }

  return cliResults;
};
