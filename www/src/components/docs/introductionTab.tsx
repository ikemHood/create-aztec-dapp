/** @jsxImportSource react */
import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import { Fragment } from "react";

export const IntroductionTab = () => {
  return (
    <div className="w-full max-w-2xl my-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-t3-purple-200/20 p-1">
          <TabButton>Aztec Protocol</TabButton>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <p className="my-4">
              Aztec Protocol is a privacy-focused layer 2 blockchain that enables private 
              transactions and smart contracts on Ethereum. It uses zero-knowledge proofs 
              to enable private state on a public blockchain.
            </p>
            <p className="my-4">
              The Create Aztec Dapp tool helps developers quickly scaffold new applications 
              built on Aztec Protocol.
            </p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const TabButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
            selected
              ? "bg-t3-purple-300 font-bold text-t3-purple-800 shadow dark:bg-t3-purple-300/30 dark:text-t3-purple-100"
              : "text-t3-purple-400 hover:bg-t3-purple-300/[0.12] dark:text-t3-purple-100/70 dark:hover:text-t3-purple-100"
          )}
        >
          {children}
        </button>
      )}
    </Tab>
  );
};
