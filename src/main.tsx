import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { mainnet, sepolia, polygon, polygonAmoy } from 'viem/chains';

import web3AuthContextConfig from "./web3authContext";
import App from "./App";

// Configure chains
const chains = [
  {
    ...mainnet,
    rpcUrls: {
      ...mainnet.rpcUrls,
      default: { http: ['https://rpc.ankr.com/eth'] },
    },
  },
  {
    ...sepolia,
    rpcUrls: {
      ...sepolia.rpcUrls,
      default: { http: ['https://rpc.sepolia.org'] },
    },
  },
  {
    ...polygon,
    rpcUrls: {
      ...polygon.rpcUrls,
      default: { http: ['https://polygon-rpc.com'] },
    },
  },
  {
    ...polygonAmoy,
    rpcUrls: {
      ...polygonAmoy.rpcUrls,
      default: { http: ['https://rpc-amoy.polygon.technology'] },
    },
  },
];

// Create a client
const queryClient = new QueryClient();

 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <App />
        </WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  </React.StrictMode>
);