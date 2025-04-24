// src/app/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-white m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://comunidadedafe.org/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
           
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-800">
              Comunidade da Fé Church
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-800 sm:mb-0 ">
            <li>
              <a href="/login" className="hover:underline me-4 md:me-6">
                Login
              </a>
            </li>
            <li>
              <a href="http://wa.me/5519999422779" className="hover:underline">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://comunidadedafe.org/" className="hover:underline">
            Comunidade da Fé Church™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
