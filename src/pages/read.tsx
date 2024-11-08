import { Menu } from "@/components/menu";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Read() {
    const [dataStructure, setDataStructure] = useState<string>('set');

    const scopeOptions =
        dataStructure === 'set' ? [{ value: 'session', text: 'Sesión' }]
            : [
                { value: 'param', text: 'Parámetro' },
                { value: 'emailsign', text: 'Firma' },
                { value: 'module', text: 'Módulo' }
            ]

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const key = formData.get("key");
        const scope = formData.get("scope");
        const member = formData.get("member");

        const url = dataStructure === "set" ? `/api/skey/${scope}/${key}` : `/api/key/${scope}/${key}`;

        await request(url, {
            ...(dataStructure === "set" && { member }),
        });
    }

    async function request(path: string, body: object) {
        try {
            const response = await fetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            data && data.message && toast(data.message, {
                style: {
                    background: '#d93b2e',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                icon: response.status === 200 ? '🔥' : '🙈',
            });
        } catch (error: any) {
            console.log(error);
            toast(error.message ? error.message : error, {
                style: {
                    background: '#d93b2e',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                icon: '🙈',
            });
            return null;
        }
    }

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">
            <Toaster />
            <h1 className="text-5xl font-bold text-center text-red-600 mb-6">Redis Management</h1>
            <Menu />

            <div className="w-full max-w-xl bg-gray-900 shadow-xl rounded-lg p-6 mb-8">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="key" className="block text-gray-300">Key:</label>
                        <input
                            type="text"
                            name="key"
                            id="key"
                            required
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dataStructure" className="block text-gray-300">Data Structure:</label>
                        <select
                            name="dataStructure"
                            id="dataStructure"
                            value={dataStructure}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDataStructure(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="set">Set</option>
                            <option value="string">String</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="scope" className="block text-gray-300">Scope:</label>
                        <select
                            name="scope"
                            id="scope"
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {scopeOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.text}</option>
                            ))}
                        </select>
                    </div>

                    {dataStructure === "set" && (
                        <div className="mb-4">
                            <label htmlFor="member" className="block text-gray-300">Member to search:</label>
                            <input
                                type="text"
                                name="member"
                                id="member"
                                required
                                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                autoComplete="off"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}