import { execa } from "execa";
import { logger } from "./logger.js";

export async function checkAndInstallAztec() {
  try {
    await execa("aztec", ["--version"]);
    logger.success("Aztec is already installed");
    return true;
  } catch (error) {
    logger.info("Aztec is not installed. Installing now...");

    try {
      await execa("bash", ["-i", "-c", "curl -s https://install.aztec.network | bash"], {
        stdio: "inherit", 
      });
      logger.success("Aztec installed successfully");
      return true;
    } catch (installError) {
      logger.error("Failed to install Aztec. Please install it manually using:");
      logger.info("bash -i <(curl -s https://install.aztec.network)");
      return false;
    }
  }
}
