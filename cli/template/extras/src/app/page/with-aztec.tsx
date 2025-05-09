"use client";

import React, { useState } from "react";
import { useAztecWallet } from "~/hooks/useWallet";
import Link from "next/link";

import styles from "./index.module.css";

export default function HomePage() {
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
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Aztec <span className={styles.pinkSpan}>dApp</span>
                </h1>

                {!isConnected ? (
                    <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className={styles.connectButton}
                        style={{
                            opacity: isLoading ? 0.5 : 1,
                            cursor: isLoading ? "not-allowed" : "pointer"
                        }}
                    >
                        {isLoading ? "Connecting..." : "Connect Wallet"}
                    </button>
                ) : (
                    <div className={styles.connectedContainer}>
                        <div className={styles.walletAddress}>
                            Connected: {address}
                        </div>
                        <p className={styles.readyText}>
                            Your smart contract is ready to use!
                        </p>
                    </div>
                )}

                <div className={styles.cardRow}>
                    <Link
                        className={styles.card}
                        href="https://docs.aztec.network/"
                        target="_blank"
                    >
                        <h3 className={styles.cardTitle}>Aztec Docs →</h3>
                        <div className={styles.cardText}>
                            Learn more about Aztec, zero-knowledge proofs, and smart contract development.
                        </div>
                    </Link>
                    <Link
                        className={styles.card}
                        href="https://noir-lang.org/"
                        target="_blank"
                    >
                        <h3 className={styles.cardTitle}>Noir Docs →</h3>
                        <div className={styles.cardText}>
                            Learn about Noir, the domain-specific language for zero-knowledge proofs.
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
} 