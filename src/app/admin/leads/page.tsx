import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib2/auth';
import { redirect } from "next/navigation";
import ChartG from "@/app/components/ChartG";
import DataTable from "@/app/components/DataTable";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return redirect("/login");
  }


  return (
    <div>
    <Navbar />
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <ChartG />
        <DataTable />
        <Footer />
    </div>

    </div>
  );
}



// <div className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/10 mt-10">
// <div className="flex justify-between items-center mb-4"
  ////  <h2 className="text-xl font-semibold">Todos os Leads</h2>
   // <input
 //     type="text"
 ///     placeholder="Buscar por nome ou email..."
 //     className="bg-white/10 border border-white/20 text-black px-4 py-2 rounded-lg w-64 focus:outline-none"
 ///   />
//  </div>

//<LeadTable leads={leads} />
//</div>