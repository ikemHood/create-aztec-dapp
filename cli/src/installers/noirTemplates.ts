export const noirContractTypes = ["counter", "voting", "token", "nft"] as const;

export type NoirContractType = (typeof noirContractTypes)[number];

type NoirTemplate = {
  label: string;
  title: string;
  description: string;
  functions: Array<{
    name: string;
    description: string;
  }>;
  source: string;
};

const noirTemplates: Record<NoirContractType, NoirTemplate> = {
  counter: {
    label: "Counter Contract",
    title: "Counter Smart Contract",
    description:
      "A minimal starter contract with simple arithmetic helpers for quick prototyping.",
    functions: [
      { name: "double(x)", description: "Doubles the input value." },
      { name: "triple(x)", description: "Triples the input value." },
      {
        name: "quadruple(x)",
        description: "Quadruples the input value using `double` twice.",
      },
    ],
    source: `contract Main {
    fn double(x: Field) -> pub Field { x * 2 }
    fn triple(x: Field) -> pub Field { x * 3 }
    fn quadruple(x: Field) -> pub Field { double(double(x)) }
}
`,
  },
  voting: {
    label: "Voting Contract",
    title: "Voting Smart Contract",
    description:
      "A lightweight voting example with proposal and tally helpers for demos and prototypes.",
    functions: [
      {
        name: "cast_vote(choice)",
        description: "Records a vote choice for a proposal.",
      },
      {
        name: "tally(yes_votes, no_votes)",
        description: "Combines vote counts into a simple total.",
      },
    ],
    source: `contract Main {
    fn cast_vote(choice: Field) -> pub Field { choice }
    fn tally(yes_votes: Field, no_votes: Field) -> pub Field { yes_votes + no_votes }
}
`,
  },
  token: {
    label: "Token Contract",
    title: "Token Smart Contract",
    description:
      "A simple fungible token example with mint and transfer helpers.",
    functions: [
      {
        name: "mint(total_supply, amount)",
        description: "Adds newly minted tokens to the supply.",
      },
      {
        name: "transfer(balance, amount)",
        description: "Subtracts the transferred amount from a balance.",
      },
    ],
    source: `contract Main {
    fn mint(total_supply: Field, amount: Field) -> pub Field { total_supply + amount }
    fn transfer(balance: Field, amount: Field) -> pub Field { balance - amount }
}
`,
  },
  nft: {
    label: "NFT Contract",
    title: "NFT Smart Contract",
    description:
      "A simple non-fungible token example for ownership and transfer flows.",
    functions: [
      {
        name: "mint(token_id)",
        description: "Creates a new token identifier.",
      },
      {
        name: "transfer(token_id, new_owner)",
        description: "Represents a token handoff to a new owner.",
      },
    ],
    source: `contract Main {
    fn mint(token_id: Field) -> pub Field { token_id }
    fn transfer(token_id: Field, new_owner: Field) -> pub Field { token_id + new_owner }
}
`,
  },
};

export const getNoirTemplate = (contractType: NoirContractType) =>
  noirTemplates[contractType];

export const renderNoirReadme = ({
  scopedAppName,
  contractType,
}: {
  scopedAppName: string;
  contractType: NoirContractType;
}) => {
  const template = getNoirTemplate(contractType);

  return `# ${scopedAppName} ${template.title}

This is a Noir ${template.label.toLowerCase()} for the ${scopedAppName} application.

## What this template includes

${template.description}

## Functions

${template.functions
  .map((item) => `- \`${item.name}\`: ${item.description}`)
  .join("\n")}

## Development

To build the contract:

\`\`\`
cd contract
nargo build
\`\`\`

For more information about Noir, visit [noir-lang.org](https://noir-lang.org/).
`;
};
