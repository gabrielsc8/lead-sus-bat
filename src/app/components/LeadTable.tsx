"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaWhatsapp } from "react-icons/fa";
import LeadEditModal from "@/app/components/LeadEditModal";
interface Lead {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  tipoAula: string;
  criadoEm: string;
  camiseta: string;
}

export function LeadTable({ leads }: { leads: Lead[] }) {
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir?");
    if (!confirmed) return;

    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setRefresh(!refresh);
    window.location.reload();
  };

  return (
    <>
      <table className="w-full text-sm text-left table-auto">
        <thead className="border-b border-white/10 text-white/80 uppercase tracking-wide">
          <tr>
            <th className="px-3 py-2">Nome</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">WhatsApp</th>
            <th className="px-3 py-2">Aula</th>
            <th className="px-3 py-2">Cadastrado em</th>
            <th className="px-3 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 10).map((lead) => (
            <tr key={lead.id} className="border-b border-white/5">
              <td className="px-3 py-2">{lead.nome}</td>
              <td className="px-3 py-2">{lead.email}</td>
              <td className="px-3 py-2">{lead.whatsapp}</td>
              <td className="px-3 py-2">{lead.tipoAula}</td>
              <td className="px-3 py-2">
                {new Date(lead.criadoEm).toLocaleString("pt-BR")}
              </td>
              <td className="px-3 py-2 flex justify-center gap-3">
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300"
                  title="Abrir no WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <button
                  onClick={() => setEditingLead(lead)}
                  className="text-blue-400 hover:text-blue-300"
                  title="Editar"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(lead.id)}
                  className="text-red-400 hover:text-red-300"
                  title="Excluir"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingLead && (
        <LeadEditModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onUpdated={() => window.location.reload()}
        />
      )}
    </>
  );
}
