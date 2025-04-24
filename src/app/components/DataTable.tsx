// src/app/components/DataTable.tsx
"use client";

import * as React from "react";
import { IconSearch, IconBrandWhatsapp, IconTrash } from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

// 1) Schema de validação
export const schema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  whatsapp: z.string(),
  sexo: z.string(),
  dataNascimento: z.string(),
  camiseta: z.string(),
  tipoAula: z.string(),
  aceiteLgpd: z.boolean(),
  criadoEm: z.string(),
});

type Lead = z.infer<typeof schema>;

// 2) Hook para buscar os leads
function useLeadsData() {
  const [data, setData] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/leads")
      .then((res) => (res.ok ? res.json() : Promise.reject("Erro")))
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export default function DataTable() {
  const { data, loading } = useLeadsData();

  // 3) Estados da tabela
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = React.useState("");

  // 4) Filtrar localmente por nome, email ou WhatsApp
  const filtered = React.useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((l) =>
      l.nome.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.whatsapp.toLowerCase().includes(q)
    );
  }, [search, data]);

  // 5) Handlers de exclusão e edição
  async function handleDelete(id: number) {
    if (!confirm("Confirma exclusão?")) return;
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Excluído");
      refetch();
    } else {
      toast.error("Falha ao excluir");
    }
  }

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection).map(Number);
    if (!ids.length) return;
    if (!confirm(`Excluir ${ids.length} selecionado(s)?`)) return;
    await Promise.all(
      ids.map((id) => fetch(`/api/leads/${id}`, { method: "DELETE" }))
    );
    toast.success("Excluídos");
    refetch();
  }

  function handleBulkOrSingleDelete(id: number) {
    const selectedIds = Object.keys(rowSelection).map(Number);
    if (selectedIds.length > 1) {
      handleBulkDelete();
    } else {
      handleDelete(id);
    }
  }

  function refetch() {
    // força re-fetch de data
    window.location.reload();
  }

  // 6) Exportação
  function handleExportExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filtered);
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "leads.xlsx");
  }

  function handleExportPDF() {
    const doc = new jsPDF();
    const headers = ["Nome", "Email", "WhatsApp", "Aula", "Cadastrado em"];
    const rows = filtered.map((l) => [
      l.nome,
      l.email,
      l.whatsapp,
      l.tipoAula,
      new Date(l.criadoEm).toLocaleString("pt-BR"),
    ]);
    autoTable(doc, { head: [headers], body: rows });
    doc.save("leads.pdf");
  }

  // 7) Definição de colunas
  const columns = React.useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
          />
        ),
        enableSorting: false,
      },
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "whatsapp", header: "WhatsApp" },
      { accessorKey: "tipoAula", header: "Aula" },
      {
        accessorKey: "criadoEm",
        header: "Cadastrado em",
        cell: ({ row }) => new Date(row.original.criadoEm).toLocaleString("pt-BR"),
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const lead = row.original;
          const phone = lead.whatsapp.replace(/\D/g, "");
          return (
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400"
              >
                <IconBrandWhatsapp size={20} />
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => handleBulkOrSingleDelete(lead.id)}
                title={
                  Object.keys(rowSelection).length > 1
                    ? `Excluir ${Object.keys(rowSelection).length} selecionados`
                    : "Excluir este lead"
                }
              >
                <IconTrash size={20} className="text-red-500 hover:text-red-400" />
              </Button>
            </div>
          );
        },
      },
    ],
    [rowSelection]
  );

  // 8) Instancia a tabela
  const table = useReactTable({
    data: filtered,
    columns,
    state: { rowSelection, sorting, columnVisibility, columnFilters, pagination },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  if (loading) return <div>Carregando…</div>;

  // 9) Render
  return (
    <>
      <div>
        <div className="flex gap-2 mt-10 mb-4 items-center">
          <Button size="sm" className="cursor-pointer" onClick={handleExportExcel}>
            Exportar Excel
          </Button>
          <Button size="sm" className="cursor-pointer" onClick={handleExportPDF}>
            Exportar PDF
          </Button>

          <div className="relative max-w-sm ml-auto">
            <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-00" size={20} />
            <input
              className="pl-8 pr-2 py-1 border rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar nome, email ou telefone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>Nenhum resultado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between py-2">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <div className="space-x-2">
            <Button
              className="cursor-pointer"
              size="sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Anterior
            </Button>
            <Button
              className="cursor-pointer"
              size="sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}