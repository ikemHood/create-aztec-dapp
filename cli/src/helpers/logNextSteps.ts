import { DEFAULT_APP_NAME } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { isInsideGitRepo, isRootGitRepo } from "./git.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  noInstall,
  projectDir,
}: Pick<
  InstallerOptions,
  | "projectName"
  | "noInstall"
  | "projectDir"
>) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  if (projectName !== ".") {
    logger.info(`  cd ${projectName}`);
  }
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === "yarn") {
      logger.info(`  ${pkgManager}`);
    } else {
      logger.info(`  ${pkgManager} install`);
    }
  }

  // Always show Noir instructions since it's always included
  logger.info(`  # For developing smart contracts`);
  logger.info(`  cd contract`);
  logger.info(`  nargo build`);
  logger.info(`  # Return to project root`);
  logger.info(`  cd ..`);

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`);
  } else {
    logger.info(`  ${pkgManager} dev`);
  }

  if (!(await isInsideGitRepo(projectDir)) && !isRootGitRepo(projectDir)) {
    logger.info(`  git init`);
  }
  logger.info(`  git commit -m "initial commit"`);
};
