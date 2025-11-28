// src/components/TransakButton.tsx
import React, { useCallback, useEffect, useRef } from "react";
import { Transak } from "@transak/transak-sdk";

declare global {
    interface Window {
        Transak: any;
        transak: any;
    }
}

interface TransakButtonProps {
    isBuyMode?: boolean;
}

const TransakButton: React.FC<TransakButtonProps> = ({ isBuyMode = true }) => {
    const transakRef = useRef<any>(null);

    const initTransak = useCallback(() => {
        // Close any existing instance
        if (window.transak) {
            window.transak.close();
            window.transak = null;
        }

        const config = {
            apiKey: import.meta.env.VITE_TRANSAK_API_KEY || "",
            environment: 'STAGING',
            hostURL: window.location.origin,
            widgetHeight: "600px",
            widgetWidth: "600px",
            themeColor: "000000",
            defaultCryptoCurrency: "USDT",
            fiatCurrency: "USD",
            isBuyCrypto: isBuyMode,
            network: "ethereum",
            cryptoCurrencyList: 'USDT,ETH',
            defaultNetwork: 'ethereum',
            redirectURL: window.location.origin,
        };

        if (isBuyMode) {
            config.walletAddress = "0xFE9891511e79d71eC629A0F629F3cF0d0E5e14fD";
        } else {
            config.defaultCryptoAmount = 100;
            config.isAutoFillUserData = false;
        }

        // Create new Transak instance
        const transak = new Transak(config);
        transakRef.current = transak;
        window.transak = transak;

        // Initialize the widget
        transak.init();

        // Event handlers using window event listeners
        const handleEvent = (event: any) => {
            const { eventName, data } = event.detail || {};
            
            switch (eventName) {
                case 'TRANSAK_WIDGET_CLOSE':
                    console.log("Transak widget closed");
                    transakRef.current = null;
                    transak.close();
                    break;
                case 'TRANSAK_ORDER_SUCCESSFUL':
                    console.log("Order successful:", data);
                    transak.close();
                    break;
                case 'TRANSAK_ORDER_FAILED':
                    console.error("Order failed:", data);
                    break;
                case 'TRANSAK_ERROR':
                    console.error("Transak error:", data);
                    transak.close();
                    break;
                default:
                    console.log("Unhandled event:", eventName, data);
            }
        };

        window.addEventListener('TRANSAK_EVENTS', handleEvent);

        // Cleanup function
        return () => {
            window.removeEventListener('TRANSAK_EVENTS', handleEvent);
        };
    }, [isBuyMode]);

    const handleButtonClick = useCallback(() => {
        if (transakRef.current) {
            transakRef.current.close();
            transakRef.current = null;
        } else {
            initTransak();
        }
    }, [initTransak]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (transakRef.current) {
                transakRef.current.close();
                transakRef.current = null;
            }
        };
    }, []);

    return (
        <button
            onClick={handleButtonClick}
            style={{
                padding: "10px 20px",
                margin: "10px",
                fontSize: "16px",
                backgroundColor: isBuyMode ? "#00bcd4" : "#ff5722",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
            }}
        >
            {isBuyMode ? "Buy Crypto (On-Ramp)" : "Sell Crypto (Off-Ramp)"}
            {transakRef.current ? " (Click to close)" : ""}
        </button>
    );
};

export default TransakButton;
