// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {credentials} from "../config";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === credentials.email && password === credentials.password) {
            localStorage.setItem('isLogin', true);
            window.location.reload();
        } else {
            alert('Invalid email or password');
            localStorage.setItem('isLogin', false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-300">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
