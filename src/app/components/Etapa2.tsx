"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  nome: string;
  whatsapp: string;
  sexo: string;
  email: string;
  dataNascimento: string;
  camiseta: string;
  tipoAula: string;
  aceiteLgpd: boolean;
}

interface Etapa2Props {
  form: FormData;
  handleChange: (e: React.ChangeEvent<any>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function Etapa2({ form, handleChange, onBack, onSubmit }: Etapa2Props) {
  const [showLgpd, setShowLgpd] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = form.camiseta && form.tipoAula && form.aceiteLgpd;

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isValid) onSubmit();
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [isValid, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sobre sua participação</h2>

      <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho da camiseta *</label>
      <select
        name="camiseta"
        value={form.camiseta}
        onChange={handleChange}
        className="mb-4 w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 py-2 cursor-pointer"
        required
      >
        <option value="">Selecione</option>
        <option value="P">P</option>
        <option value="M">M</option>
        <option value="G">G</option>
        <option value="GG">GG</option>
        <option value="EXG">EXG</option>
      </select>

      <label className="block text-sm font-medium text-gray-700 mb-1">Como você gostaria de participar das aulas? *</label>
      <select
        name="tipoAula"
        value={form.tipoAula}
        onChange={handleChange}
        className="mb-4 w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-blue-500 py-2 cursor-pointer"
        required
      >
        <option value="">Selecione</option>
        <option value="Quarta-Feira - 30/04 - 19:30">Aula Presencial (Quarta-Feira - 30/04 - 19:30)</option>
        <option value="Sábado - 03/05 - 15:00">Aula Presencial (Sábado - 03/05 - 15:00)</option>
        <option value="Online">Aula Online</option>
      </select>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="aceiteLgpd"
            checked={form.aceiteLgpd}
            onChange={handleChange}
            className="mt-1 cursor-pointer"
            required
          />
          <label className="text-sm text-gray-700">
            Sim, estou de acordo com o uso dos dados conforme a LGPD.
          </label>
        </div>
        <button
          type="button"
          onClick={() => setShowLgpd(!showLgpd)}
          className="text-sm text-blue-600 underline self-start cursor-pointer"
        >
          {showLgpd ? "Ocultar detalhes" : "Ler mais sobre a LGPD"}
        </button>
        {showLgpd && (
          <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded-xl">
            Os dados fornecidos serão utilizados exclusivamente para fins de organização e comunicação sobre o batismo. Garantimos que suas informações não serão compartilhadas com terceiros e estão protegidas conforme a Lei Geral de Proteção de Dados (LGPD).
          </p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-2xl py-3 px-5 transition cursor-pointer"
        >
          Voltar
        </button>

        <button
          onClick={async () => {
            if (loading || !isValid) return;
            setLoading(true);
            await onSubmit();
            setLoading(false);
          }}
          disabled={!isValid || loading}
          className={`w-1/2 font-semibold rounded-2xl py-3 px-5 transition ${
            !isValid || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
          }`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </motion.div>
  );
}
