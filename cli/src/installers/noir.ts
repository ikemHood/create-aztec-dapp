import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { getNoirTemplate, renderNoirReadme } from "~/installers/noirTemplates.js";

export const noirInstaller: Installer = ({
  projectDir,
  projectName,
  scopedAppName,
  contractType = "counter",
}) => {
  // Create contract directory
  const contractDir = path.join(projectDir, "contract");
  const contractSrcDir = path.join(contractDir, "src");

  fs.ensureDirSync(contractDir);
  fs.ensureDirSync(contractSrcDir);

  // Create Nargo.toml
  const nargoToml = `[package]
name = "${projectName}-contract"
type = "contract"
authors = [""]

[dependencies]
`;
  fs.writeFileSync(path.join(contractDir, "Nargo.toml"), nargoToml);

  const template = getNoirTemplate(contractType);

  fs.writeFileSync(path.join(contractDir, "src", "main.nr"), template.source);

  fs.writeFileSync(
    path.join(contractDir, "README.md"),
    renderNoirReadme({ scopedAppName, contractType })
  );

  // Replace the main project README with the Noir-enabled one
  const noirReadmePath = path.join(PKG_ROOT, "template/extras/README-noir.md");
  const projectReadmePath = path.join(projectDir, "README.md");

  if (fs.existsSync(noirReadmePath)) {
    fs.copyFileSync(noirReadmePath, projectReadmePath);
  }
};
