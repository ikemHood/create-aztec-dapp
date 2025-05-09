import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";

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

    // Choose the correct contract implementation based on contractType
    let mainNr = "";

    if (contractType === "counter") {
        mainNr = `contract Main {
    fn double(x: Field) -> pub Field { x * 2 }
    fn triple(x: Field) -> pub Field { x * 3 }
    fn quadruple(x: Field) -> pub Field { double(double(x)) }
}
`;
    }
    // Add more contract types here as they are supported

    fs.writeFileSync(path.join(contractDir, "src", "main.nr"), mainNr);

    // Add a README file for the contract with appropriate content based on contract type
    let contractReadmeContent = "";

    if (contractType === "counter") {
        contractReadmeContent = `# ${scopedAppName} Counter Smart Contract

This is a Noir counter smart contract for the ${scopedAppName} application.

## Functions

- \`double(x)\`: Doubles the input value
- \`triple(x)\`: Triples the input value
- \`quadruple(x)\`: Quadruples the input value using the double function twice

## Development

To build the contract:

\`\`\`
cd contract
nargo build
\`\`\`

For more information about Noir, visit [noir-lang.org](https://noir-lang.org/).
`;
    }
    // Add more contract type readme content here

    fs.writeFileSync(path.join(contractDir, "README.md"), contractReadmeContent);

    // Replace the main project README with the Noir-enabled one
    const noirReadmePath = path.join(PKG_ROOT, "template/extras/README-noir.md");
    const projectReadmePath = path.join(projectDir, "README.md");

    if (fs.existsSync(noirReadmePath)) {
        fs.copyFileSync(noirReadmePath, projectReadmePath);
    }
}; 