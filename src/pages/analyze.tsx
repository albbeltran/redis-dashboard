import { Menu } from "@/components/menu";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Read() {
    const [selectedMetric, setSelectedMetric] = useState<string>("stats");
    const [infoResult, setInfoResult] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(selectedMetric)
        const result = await request(`/api/info/${selectedMetric}`, {});
        console.log(result.data);
    }

    async function request(path: string, body: object) {
        try {
            const response = await fetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            data && data.data && setInfoResult(data.data);

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

            return data;
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
                        <label htmlFor="param" className="block text-gray-300">Metric:</label>
                        <select
                            name="param"
                            id="param"
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="stats">General</option>
                            <option value="memory">Memory</option>
                            <option value="cpu">CPU</option>
                            <option value="latencystats">Latency</option>
                            <option value="commandstats">Commands</option>
                            <option value="errorstats">Errors</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Search
                    </button>
                </form>

                {infoResult && (
                    <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg overflow-y-auto max-h-64 custom-scrollbar">
                        <h3 className="text-lg font-semibold mb-2">Redis Metrics Result:</h3>
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                            {infoResult}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}