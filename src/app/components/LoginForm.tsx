// src/app/components/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from 'next/image';


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Email ou senha inválidos");
    } else {
      window.location.href = "/admin/leads";
    }
  };

  return (
    <section className="h-screen w-screen dark:bg-white ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image             className="w-37 h-11 mr-2"
            src="/logo.png"
            alt="logo"
            width={37}
            height={12}
          />

        </a>
        <div className="w-full bg-white shadow-xl border border-gray-200 rounded-3xl p-8 w-full max-w-xl overflow-hidden md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-gray-800">
              Acesse sua Dashboard
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-800"
                >
                  Seu Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="https://wa.me/5519999422779"
                  className="text-sm font-medium text-gray-800 hover:underline dark:text-primary-500"
                >
                  Esqueci minha senha
                </a>
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full text-gray-800 border border-gray-200 rounded-3xl bg-white hover:cursor-pointer focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"

              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
