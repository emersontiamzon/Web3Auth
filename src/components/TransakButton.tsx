// src/components/TransakButton.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Transak } from "@transak/transak-sdk";

declare global {
    interface Window {
        Transak: any;
        transak: any;
    }
}

interface TransakButtonProps {
    isBuyMode?: boolean;
    walletAddress?: string;
    onError?: (error: any) => void;
}

const TransakButton: React.FC<TransakButtonProps> = ({ isBuyMode = true, walletAddress = "", onError }) => {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);

    const initTransak = useCallback(() => {
        if (window.transak) {
            window.transak.close();
            window.transak = null;
        }

        const config: any = {
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
            config.walletAddress = walletAddress;
        } else {
            config.defaultCryptoAmount = 100;
            config.isAutoFillUserData = false;
        }

        const transak = new Transak(config);
        window.transak = transak;
        transak.init();
        setIsWidgetOpen(true);

        const handleEvent = (event: any) => {
            const { eventName, data } = event.detail || {};

            switch (eventName) {
                case 'TRANSAK_WIDGET_CLOSE':
                    console.log("Transak widget closed");
                    setIsWidgetOpen(false);
                    transak.close();
                    break;
                case 'TRANSAK_ORDER_SUCCESSFUL':
                    console.log("Order successful:", data);
                    setIsWidgetOpen(false);
                    transak.close();
                    break;
                case 'TRANSAK_ORDER_FAILED':
                    console.error("Order failed:", data);
                    if (onError) onError(data);
                    break;
                case 'TRANSAK_ERROR':
                    console.error("Transak error:", data);
                    if (onError) onError(data);
                    setIsWidgetOpen(false);
                    transak.close();
                    break;
                default:
                    console.log("Unhandled event:", eventName, data);
            }
        };

        window.addEventListener('TRANSAK_EVENTS', handleEvent);

        return () => {
            window.removeEventListener('TRANSAK_EVENTS', handleEvent);
        };
    }, [isBuyMode, walletAddress, onError]);

    const handleButtonClick = useCallback(() => {
        if (isWidgetOpen) {
            if (window.transak) {
                window.transak.close();
            }
            setIsWidgetOpen(false);
        } else {
            initTransak();
        }
    }, [isWidgetOpen, initTransak]);

    useEffect(() => {
        return () => {
            if (window.transak) {
                window.transak.close();
            }
        };
    }, []);

    return (
        <button
            onClick={handleButtonClick}
            className={`transak-button ${isBuyMode ? "buy" : "sell"}`}
        >
            {isBuyMode ? "Buy Crypto (On-Ramp)" : "Sell Crypto (Off-Ramp)"}
            {isWidgetOpen ? " (Click to close)" : ""}
        </button>
    );
};

export default TransakButton;
