import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {  
            toast("Welcome again!", {
                style: {
                    background: '#d93b2e',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                duration: 1500,
                icon: '🎉',
            });

            setTimeout(() => router.push('/'), 2000);
        } else {
            toast("Nope! Try again", {
                style: {
                    background: '#d93b2e',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                icon: '🥷',
            });
        }
    }

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">
            <Toaster />
            <h1 className="text-5xl font-bold text-center text-red-600 mb-6">Redis Management</h1>

            <div className="w-full max-w-xl rounded-lg p-6">
                <form className="mt-4" onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-300">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300">Password:</label>
                        <input
                            type="passwword"
                            name="password"
                            id="password"
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}