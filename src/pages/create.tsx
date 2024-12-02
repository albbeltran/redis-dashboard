import { Menu } from "@/components/menu";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { handleFront } from "@/utils/handleError";

export default function Create() {
  const [setItems, setSetItems] = useState<string[]>([]);
  const [setValue, setSetValue] = useState<string>('');
  const [duplicatedText, setDuplicatedText] = useState<string>('');
  const [activeForm, setActiveForm] = useState<string>("");

  const toggleForm = (form: string) => {
    setActiveForm((prevForm) => (prevForm === form ? "" : form));
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSetValue(e.currentTarget.value);
  }

  useEffect(() => {
    const duplicated = setItems.filter(item => item === setValue);
    if (duplicated && duplicated.length) setDuplicatedText('Already on list.');
    else setDuplicatedText('');
  }, [setValue]);

  function handleAddBtn() {
    if (duplicatedText || setValue === '') return;
    setSetItems(prevItems => [...prevItems, setValue]);
    setSetValue('');
  }

  function handleRemoveBtn(value: string) {
    setSetItems(prevItems => prevItems.filter(item => item !== value));
  }

  async function handleSetsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const setKey = formData.get("setKey");
    const setTtl = formData.get("setTtl");
    const setScope = formData.get("setScope");

    console.log({ setKey, setItems, setTtl, setScope });

    await request("/api/skey", {
      key: setKey,
      value: setItems,
      ttl: setTtl,
      scope: setScope,
    });
  }

  async function handleStringsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const stringKey = formData.get("stringKey");
    const stringValue = formData.get("stringValue");
    const stringTtl = formData.get("stringTtl");
    const stringScope = formData.get("stringScope");

    await request("/api/key", {
      key: stringKey,
      value: stringValue,
      ttl: stringTtl,
      scope: stringScope,
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

      if (data && data.message) {
        toast(data.message, {
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
      }
    } catch (error: unknown) {
      handleFront(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">
      <Toaster />
      <h1 className="text-5xl font-bold text-center text-red-600 mb-6">Redis Management</h1>
      <Menu />

      {/* Set Form */}
      <div className="w-full max-w-xl bg-gray-900 shadow-xl rounded-lg p-6 mb-8">
        <h3
          onClick={() => toggleForm("sets")}
          className="text-2xl font-semibold text-white cursor-pointer"
        >
          Sets
        </h3>
        {activeForm === "sets" && (
          <form className="mt-4" onSubmit={handleSetsSubmit}>
            <div className="mb-4">
              <label htmlFor="setKey" className="block text-gray-300">Key:</label>
              <input
                type="text"
                name="setKey"
                id="setKey"
                required
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="setValue" className="block mb-1 text-gray-300">Value:</label>
              <div className="flex gap-5">
                <input
                  type="text"
                  name="setValue"
                  id="setValue"
                  value={setValue}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="off"
                />
                <button onClick={handleAddBtn} className="w-2/4 bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors" type="button">Agregar</button>
              </div>
              <p className="text-red-600">{duplicatedText}</p>

              {setItems && setItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 mt-3">
                  <div className="w-full p-3 rounded-md bg-gray-800 text-neutral-500">{item}</div>
                  <button
                    onClick={() => handleRemoveBtn(item)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none transition-colors"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor="setTtl" className="block text-gray-300">TTL:</label>
              <input
                type="text"
                name="setTtl"
                id="setTtl"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="setScope" className="block text-gray-300">Scope:</label>
              <select
                name="setScope"
                id="setScope"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="session">Sesión</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Save
            </button>
          </form>
        )}
      </div>

      {/* String Form */}
      <div className="w-full max-w-xl bg-gray-900 shadow-xl rounded-lg p-6">
        <h3
          onClick={() => toggleForm("strings")}
          className="text-2xl font-semibold text-white cursor-pointer"
        >
          Strings
        </h3>
        {activeForm === "strings" && (
          <form className="mt-4" onSubmit={handleStringsSubmit} >
            <div className="mb-4">
              <label htmlFor="stringKey" className="block text-gray-300">Key:</label>
              <input
                type="text"
                name="stringKey"
                id="stringKey"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stringValue" className="block text-gray-300">Value:</label>
              <input
                type="text"
                name="stringValue"
                id="stringValue"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stringTtl" className="block text-gray-300">TTL:</label>
              <input
                type="text"
                name="stringTtl"
                id="stringTtl"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stringScope" className="block text-gray-300">Scope:</label>
              <select
                name="stringScope"
                id="stringScope"
                className="w-full p-3 border border-gray-700 rounded-md mt-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="param">Parámetro</option>
                <option value="emailsign">Firma</option>
                <option value="module">Módulo</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}