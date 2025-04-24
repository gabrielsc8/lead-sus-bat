import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST: Cria um novo lead
export async function POST(request: Request) {
  const data = await request.json();

  try {
    const lead = await prisma.lead.create({
      data: {
        nome: data.nome,
        whatsapp: data.whatsapp,
        sexo: data.sexo,
        email: data.email,
        dataNascimento: new Date(data.dataNascimento),
        camiseta: data.camiseta,
        tipoAula: data.tipoAula,
        aceiteLgpd: data.aceiteLgpd,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}

// GET: Retorna todos os leads
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { criadoEm: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Erro ao buscar leads:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
