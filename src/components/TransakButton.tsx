// src/components/TransakButton.tsx
import React, { useEffect } from "react";
import { Transak } from "@transak/transak-sdk";
       
// Extend the Window interface to include the transak property
declare global {
    interface Window {
        transak: any;
    }
}

interface TransakButtonProps {
    isBuyMode?: boolean; // true = buy, false = sell
}

const TransakButton: React.FC<TransakButtonProps> = ({ isBuyMode = true }) => {
    const openTransakWidget = () => {
        const config: any = {
            apiKey: import.meta.env.VITE_TRANSAK_API_KEY || "", // Load from environment variables
            environment: Transak.ENVIRONMENTS.STAGING,
            hostURL: window.location.href,
            widgetHeight: "600px",
            widgetWidth: "600px",
            themeColor: "000000",
            defaultCryptoCurrency: "USDT",
            fiatCurrency: "USD",
            isBuyCrypto: false, // true = BUY, false = SELL

            // Common configuration for both buy and sell
            network: "ethereum",
            cryptoCurrencyList: 'USDT,ETH',
            defaultNetwork: 'ethereum',

            // Email and user identification
            email: '', // Can be pre-filled or left empty for user to enter
            redirectURL: window.location.origin,//window.location.href,
            hideMenu: false,
        };

        if (isBuyMode) {
            // Buy configuration
            config.walletAddress = "0xFE9891511e79d71eC629A0F629F3cF0d0E5e14fD"; // User's wallet for receiving crypto
        } else {
            // Sell configuration
            config.defaultCryptoAmount = 100; // Default amount to sell (in USD equivalent)
            config.isAutoFillUserData = false; // Let user enter their bank details
        }

        const transak = new Transak(config);

        transak.init();

        // Event handlers
      /*  transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
            console.log("Transak widget closed");
            transak.close();
        });

        transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
            console.log("Order successful:", orderData);
            transak.close();
        });

        transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, (orderData: any) => {
            console.error("Order failed:", orderData);
        });

        transak.on(Transak.EVENTS.TRANSAK_ERROR, (error: any) => {
            console.error("Transak error:", error);
        });*/
    };

    return (
        <button
            onClick={openTransakWidget}
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
        </button>
    );
};

export default TransakButton;
