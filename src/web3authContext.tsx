import {AUTH_CONNECTION, CHAIN_NAMESPACES, MFA_LEVELS, WALLET_CONNECTORS, WEB3AUTH_NETWORK} from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import { mainnet } from 'viem/chains';

const clientId = "BAl_hTSX_wrkmYaZtxnZDTd15OrA0Czhx2dc2GOCuTMSLxRbZMsSUqjF_JOSibS9jMyYISzfcNDP3h1CodLF6Fw"; // get from https://dashboard.web3auth.io

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    mfaLevel: MFA_LEVELS.NONE,
    chainConfig: {
      chainNamespace:  CHAIN_NAMESPACES.EIP155,
      chainId: "0x5afe",//'0xa4b1' + mainnet.id.toString(16),
      rpcTarget: "https://sapphire-devnet.rpc.oasis.cloud", // or the official devnet RPC
      displayName: "Sapphire Devnet",
      ticker: "ETH",
      tickerName: "Ethereum",
    },
    modalConfig: {
      connectors: {
        [WALLET_CONNECTORS.AUTH]: {
          label: "auth",
          loginMethods: {
            google: {
              name: "google login",
              authConnectionId: "google-et",
            },
          },
        },
      },
    },
  }
};

export default web3AuthContextConfig;