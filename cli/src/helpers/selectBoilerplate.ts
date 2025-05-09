import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "packages" | "projectDir">
>;

// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/extras/src/pages/_app");

  const usingTw = packages.tailwind.inUse;

  // We only have two options: with tailwind or without
  let appFile = usingTw ? "with-tw.tsx" : "base.tsx";

  const appSrc = path.join(appFileDir, appFile);
  const appDest = path.join(projectDir, "src/pages/_app.tsx");
  fs.copySync(appSrc, appDest);
};

// Similar to _app, but for app router
export const selectLayoutFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const layoutFileDir = path.join(PKG_ROOT, "template/extras/src/app/layout");

  const usingTw = packages.tailwind.inUse;

  // We only have two options: with tailwind or without
  let layoutFile = usingTw ? "with-tw.tsx" : "base.tsx";

  const layoutSrc = path.join(layoutFileDir, layoutFile);
  const layoutDest = path.join(projectDir, "src/app/layout.tsx");
  fs.copySync(layoutSrc, layoutDest);
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  const usingTw = packages.tailwind.inUse;

  // Always use the Aztec wallet integration
  // We only have two options: with tailwind or without
  let indexFile = usingTw ? "with-aztec-tw.tsx" : "with-aztec.tsx";

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  fs.copySync(indexSrc, indexDest);
};

// Similar to index, but for app router
export const selectPageFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/app/page");

  const usingTw = packages.tailwind.inUse;

  // Always use the Aztec wallet integration
  // We only have two options: with tailwind or without
  let indexFile = usingTw ? "with-aztec-tw.tsx" : "with-aztec.tsx";

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/app/page.tsx");
  fs.copySync(indexSrc, indexDest);
};
