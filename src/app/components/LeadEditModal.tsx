"use client";

import React, { useState } from "react";

interface Lead {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  tipoAula: string;
  criadoEm: string;
  camiseta: string;
}
interface LeadEditModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdated: () => void;
}

export default function LeadEditModal({
  lead,
  onClose,
  onUpdated,
}: LeadEditModalProps) {
  const [form, setForm] = useState({
    nome: lead.nome,
    email: lead.email,
    whatsapp: lead.whatsapp,
    tipoAula: lead.tipoAula,
    camiseta: lead.camiseta,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated();
      onClose();
    } else {
      alert("Erro ao atualizar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-2xl border border-border w-full max-w-md space-y-4">
        <h3 className="text-xl font-semibold">Editar Lead</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full bg-input border border-border rounded-xl px-4 py-2 placeholder-muted text-foreground focus:outline-none focus:ring-2 ring-ring"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-input border border-border rounded-xl px-4 py-2 placeholder-muted text-foreground focus:outline-none focus:ring-2 ring-ring"
          />
          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "").slice(0, 11);
              v = v.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
              handleChange({ ...e, target: { ...e.target, value: v } });
            }}
            className="w-full bg-input border border-border rounded-xl px-4 py-2 placeholder-muted text-foreground focus:outline-none focus:ring-2 ring-ring"
          />
          <select
            name="tipoAula"
            value={form.tipoAula}
            onChange={handleChange}
            className="w-full bg-input border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 ring-ring"
          >
            <option value="">Tipo de Aula</option>
            <option value="Quarta-Feira - 30/04 - 19:30">Quarta (30/04) Presencial</option>
            <option value="Sábado - 03/05 - 15:00">Sábado (03/05) Presencial</option>
            <option value="Online">Online</option>
          </select>
          <select
            name="camiseta"
            value={form.camiseta}
            onChange={handleChange}
            className="w-full bg-input border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 ring-ring"
          >
            <option value="">Tamanho da Camiseta</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="EXG">EXG</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-muted text-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-cyan text-background font-semibold hover:bg-cyan/90 transition"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
