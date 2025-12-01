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

    const Dashboard = () => {
        const [copySuccess, setCopySuccess] = useState('');

        const copyToClipboard = () => {
            if (address) {
                navigator.clipboard.writeText(address);
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            }
        };

        return (
            <section className="dashboard">
                <div className="dashboard-header">
                    <h2 className="section-title">Your Dashboard</h2>
                    <div className="user-profile">
                        {userInfo?.profileImage && <img src={userInfo.profileImage} alt="Profile" className="profile-image" />}
                        <span>{userInfo?.name || 'User'}</span>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card wallet-details-card">
                        <h3>Wallet Details</h3>
                        <div className="wallet-info">
                            <p><strong>Status:</strong> <span className="status-dot"></span> Connected</p>
                            <p><strong>Connector:</strong> {connectorName}</p>
                            <div className="address-bar">
                                <span className="address-label">Address:</span>
                                <span className="address-text">{address}</span>
                                <button onClick={copyToClipboard} className="btn-copy">
                                    {copySuccess || (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card actions-card">
                        <h3>Quick Actions</h3>
                        <div className="dashboard-actions">
                            <TransakButton isBuyMode={true} walletAddress={address as string} onError={handleTransakError} />
                            <TransakButton isBuyMode={false} walletAddress={address as string} onError={handleTransakError} />
                        </div>
                    </div>
                </div>
            </section>
        );
    };

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