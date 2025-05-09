import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home(): React.ReactElement {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Connect wallet function
    const connectWallet = async () => {
        setIsLoading(true);
        try {
            // Here we would use the Aztec wallet SDK
            // For this template, we'll just simulate a connection
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsConnected(true);
            setWalletAddress("0x1234...abcd"); // This would be the actual address
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // @ts-ignore - Suppress Next.js Head component type error
        <>
            <Head>
                <title>Aztec dApp</title>
                <meta name="description" content="Aztec dApp with smart contracts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom, #2e026d, #15162c)"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3rem",
                    padding: "4rem 1rem"
                }}>
                    <h1 style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        letterSpacing: "-0.025em",
                        color: "white"
                    }}>
                        Aztec <span style={{ color: "hsl(280,100%,70%)" }}>dApp</span>
                    </h1>

                    {!isConnected ? (
                        <button
                            onClick={connectWallet}
                            disabled={isLoading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0.75rem 1.5rem",
                                fontSize: "1.125rem",
                                fontWeight: "500",
                                color: "white",
                                backgroundColor: "#9333ea",
                                borderRadius: "0.375rem",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                opacity: isLoading ? "0.5" : "1"
                            }}
                        >
                            {isLoading ? "Connecting..." : "Connect Wallet"}
                        </button>
                    ) : (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem"
                        }}>
                            <div style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "0.5rem",
                                color: "white"
                            }}>
                                Connected: {walletAddress}
                            </div>
                            <p style={{
                                fontSize: "1.25rem",
                                color: "white"
                            }}>
                                Your smart contract is ready to use!
                            </p>
                        </div>
                    )}

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1rem",
                        maxWidth: "900px"
                    }}>
                        <Link href="https://docs.aztec.network/" target="_blank"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                padding: "1rem",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "0.75rem",
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: "700",
                            }}>Aztec Docs →</h3>
                            <div style={{
                                fontSize: "1.125rem",
                            }}>
                                Learn more about Aztec, zero-knowledge proofs, and smart contract development.
                            </div>
                        </Link>
                        <Link href="https://noir-lang.org/" target="_blank"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                padding: "1rem",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "0.75rem",
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            <h3 style={{
                                fontSize: "1.5rem",
                                fontWeight: "700",
                            }}>Noir Docs →</h3>
                            <div style={{
                                fontSize: "1.125rem",
                            }}>
                                Learn about Noir, the domain-specific language for zero-knowledge proofs.
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
} 