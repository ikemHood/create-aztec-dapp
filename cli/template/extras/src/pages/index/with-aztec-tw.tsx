import React, { useState } from "react";
import { useAztecWallet } from "~/hooks/useWallet";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const { connect, isConnected, address } = useAztecWallet();

    // Connect wallet function
    const connectWallet = async () => {
        setIsLoading(true);
        try {
            await connect();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Aztec dApp</title>
                <meta name="description" content="Aztec dApp with smart contracts" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Aztec <span className="text-[hsl(280,100%,70%)]">dApp</span>
                    </h1>

                    {!isConnected ? (
                        <button
                            onClick={connectWallet}
							type="button"
                            disabled={isLoading}
                            className={`flex items-center justify-center rounded-md bg-purple-700 px-6 py-3 text-lg font-medium text-white ${isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-purple-600"}`}
                        >
                            {isLoading ? "Connecting..." : "Connect Wallet"}
                        </button>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-lg bg-white/10 px-4 py-2 text-white">
                                Connected: {address}
                            </div>
                            <p className="text-xl text-white">
                                Your smart contract is ready to use!
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                        <Link
                            href="https://docs.aztec.network/"
                            target="_blank"
                            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        >
                            <h3 className="text-2xl font-bold">Aztec Docs →</h3>
                            <div className="text-lg">
                                Learn more about Aztec, zero-knowledge proofs, and smart contract development.
                            </div>
                        </Link>
                        <Link
                            href="https://noir-lang.org/"
                            target="_blank"
                            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                        >
                            <h3 className="text-2xl font-bold">Noir Docs →</h3>
                            <div className="text-lg">
                                Learn about Noir, the domain-specific language for zero-knowledge proofs.
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
} 