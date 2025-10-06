"use client";

import MovementsChart from "@/components/MovementsChart";
import { protectAdmin } from "@/lib/auth/protectAdmin";
import { useState, useEffect } from "react";
import { calculateTotals, Movement } from "@/lib/movementsUtils";
import { MovementWithUser } from "@/lib/types/movements";
import { exportToCSV } from "@/lib/exportToCSV";

export const getServerSideProps = protectAdmin;

export default function ReportsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [reportMovements, setReportMovements] = useState<MovementWithUser[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await fetch("/api/movements");
        const data = await res.json();
        setMovements(data);
        setReportMovements(data);
      } catch (error) {
        console.error("Error fetching movements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando datos...</p>;

  const { total } = calculateTotals(movements);

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">
        Sistema de gestión de Ingresos y Gastos
      </h2>

      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-lg border-b w-40 mb-10 text-center">Reportes</h1>

        <div className="w-[500] h-[200]">
          <MovementsChart data={movements} />
        </div>
        <div className="flex mt-20">
          <div className="text-center p-2 bg-gray-500 text-white rounded-[10px] w-[150] ">
            Saldo $ {total}
          </div>
          <div className="ml-4">
            <button
              onClick={() => exportToCSV(reportMovements)}
              className="bg-gray-500 text-white px-4 py-2 rounded-[10px] hover:bg-gray-400"
            >
              Descargar CSV
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
