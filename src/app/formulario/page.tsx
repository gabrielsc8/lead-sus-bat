"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Etapa1 } from "@/app/components/Etapa1";
import { Etapa2 } from "@/app/components/Etapa2";
import { AnimatePresence } from "framer-motion";

export default function Formulario() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    sexo: "",
    email: "",
    dataNascimento: "",
    camiseta: "",
    tipoAula: "",
    aceiteLgpd: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const linkWhatsApp = `https://chat.whatsapp.com/IX6tQK6C0k8Ex4SFnjbrUt`;
      window.location.href = linkWhatsApp;
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://i.imgur.com/7I3rMdw.png')] bg-cover bg-no-repeat">
      <div
        ref={ref}
        className="w-full max-w-2xl bg-white text-white shadow-xl border border-neutral-700 rounded-3xl p-8"
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Etapa1
              key="etapa1"
              form={form}
              handleChange={handleChange}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <Etapa2
              key="etapa2"
              form={form}
              handleChange={handleChange}
              onBack={() => setStep(0)}
              onSubmit={handleSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
