// src/web3auth.ts
import { Web3Auth } from '@web3auth/web3auth';

const clientId = 'BAl_hTSX_wrkmYaZtxnZDTd15OrA0Czhx2dc2GOCuTMSLxRbZMsSUqjF_JOSibS9jMyYISzfcNDP3h1CodLF6Fw'; // Replace with your Web3Auth client ID
//const scope = 'openid'; 
const web3auth = new Web3Auth({
    clientId,
    //scope,
    chainConfig: {
        chainNamespace: 'eip155',
        chainId: '0x1', // Ethereum mainnet
    },
});

export default web3auth;