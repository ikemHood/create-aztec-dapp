import { tailwindInstaller } from "~/installers/tailwind.js";
import { type PackageManager } from "~/utils/getUserPkgManager.js";
import { biomeInstaller } from "./biome.js";
import { dynamicEslintInstaller } from "./eslint.js";
import { noirInstaller } from "./noir.js";

export const contractTypes = ["counter"] as const;
export type ContractType = (typeof contractTypes)[number];

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = [
  "tailwind",
  "eslint",
  "biome",
  "noir",
] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  appRouter?: boolean;
  projectName: string;
  scopedAppName: string;
  contractType?: ContractType;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = Record<
  AvailablePackages,
  {
    inUse: boolean;
    installer: Installer;
  }
>;

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
  contractType: ContractType = "counter"
): PkgInstallerMap => ({
  tailwind: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },
  eslint: {
    inUse: packages.includes("eslint"),
    installer: dynamicEslintInstaller,
  },
  biome: {
    inUse: packages.includes("biome"),
    installer: biomeInstaller,
  },
  noir: {
    inUse: true, // Always include Noir
    installer: (opts) => noirInstaller({ ...opts, contractType }),
  },
});
