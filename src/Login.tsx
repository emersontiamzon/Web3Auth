// src/Login.tsx
import React from 'react';
import web3auth from './web3auth';

const Login = () => {
    const handleLogin = async () => {
        try {
            await web3auth.connect();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Web3Auth</button>
        </div>
    );
};

export default Login;