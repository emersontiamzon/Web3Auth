// src/App.tsx
import React, { useState } from "react";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import TransakButton from "./components/TransakButton";
import "./App.css";

function App() {
    const { connect, isConnected, connectorName, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
    const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
    const { userInfo } = useWeb3AuthUser();
    const { address } = useAccount();
    const [transakError, setTransakError] = useState<string>("");

    const handleTransakError = (error: any) => {
        setTransakError(error.message || "An error occurred with Transak.");
    };

    const ErrorDisplay = ({ message }: { message?: string }) => {
        if (!message) return null;
        return <div className="error-banner">{message}</div>;
    };

    const Header = () => (
        <header className="header">
            <div className="logo">
                <a href="/">CoinExchange.Cash</a>
            </div>
            <div className="wallet-actions">
                {connectLoading || disconnectLoading ? (
                    <div className="loading-spinner"></div>
                ) : isConnected ? (
                    <button onClick={() => disconnect()} className="btn btn-secondary">
                        Disconnect
                    </button>
                ) : (
                    <button onClick={() => connect()} className="btn btn-primary">
                        Connect Wallet
                    </button>
                )}
            </div>
        </header>
    );

    const Hero = () => (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">The Future of Digital Wallets is Here</h1>
                <p className="hero-subtitle">A seamless and secure way to interact with the decentralized web.</p>
                {!isConnected && (
                    <button onClick={() => connect()} className="btn btn-primary btn-large">
                        Get Started Now
                    </button>
                )}
            </div>
        </section>
    );

    const Features = () => (
        <section className="features">
            <h2 className="section-title">Why Choose CoinExchange.Cash?</h2>
            <div className="feature-cards">
                <div className="feature-card">
                    <h3>Easy On-Ramp</h3>
                    <p>Buy crypto directly with your credit card using our trusted partner, Transak.</p>
                </div>
                <div className="feature-card">
                    <h3>Best-in-Class Security</h3>
                    <p>Your assets are protected with the power of Web3Auth's non-custodial MPC wallets.</p>
                </div>
                <div className="feature-card">
                    <h3>Multi-Chain Ready</h3>
                    <p>Access a wide range of decentralized applications across multiple blockchains.</p>
                </div>
            </div>
        </section>
    );

    const Dashboard = () => (
        <section className="dashboard">
            <h2 className="section-title">Your Dashboard</h2>
            <div className="dashboard-content">
                <div className="wallet-info">
                    <p><strong>Status:</strong> Connected to {connectorName}</p>
                    <p><strong>Address:</strong> {address}</p>
                    {userInfo && <p><strong>Name:</strong> {userInfo.name}</p>}
                </div>
                <div className="dashboard-actions">
                    <TransakButton isBuyMode={true} walletAddress={address as string} onError={handleTransakError} />
                    <TransakButton isBuyMode={false} walletAddress={address as string} onError={handleTransakError} />
                </div>
            </div>
        </section>
    );

    return (
        <div className="app-container">
            <Header />
            <main>
                <ErrorDisplay message={connectError?.message || disconnectError?.message || transakError} />
                {isConnected ? (
                    <Dashboard />
                ) : (
                    <>
                        <Hero />
                        <Features />
                    </>
                )}
            </main>
            <footer className="footer">
                <p>&copy; 2025 CoinExchange.Cash. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;