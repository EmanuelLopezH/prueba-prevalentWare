"use client";

import { useSession } from "@/hooks/useSession";
import { useState, useEffect } from "react";
import { MovementWithUser } from "@/lib/types/movements";

export default function MovementsPage() {
  const [tableData, setTableData] = useState<MovementWithUser[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { session, loading } = useSession();

  useEffect(() => {
    fetch("/api/movements")
      .then((res) => res.json())
      .then((data) => setTableData(data));
  }, []);

  async function handleSubmit(formData: FormData) {
    "use server";
    const rawFormData = Object.fromEntries(formData);

    const movementData = {
      concept: rawFormData.concepto,
      amount: Number(rawFormData.monto),
      date: new Date(rawFormData.fecha as string).toISOString(),
      userId: session?.user.id as string,
    };

    await fetch("/api/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movementData),
    });

    setShowForm(false);
    window.location.reload();
  }

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">
        Sistema de gestión de Ingresos y Gastos
      </h2>

      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-lg border-b w-40 text-center">
          Ingresos y egresos
        </h1>

        {session?.user.role === "Admin" && (
          <div className="flex justify-end">
            <button
              className="p-2 mt-4 bg-gray-500 text-white rounded-[10px]"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancelar" : "Nuevo movimiento"}
            </button>
          </div>
        )}

        {!showForm ? (
          <div id="table" className="overflow-x-auto p-4 rounded-lg mt-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Concepto
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Monto
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {tableData?.length ? (
                  tableData.map((m: MovementWithUser) => (
                    <tr className="hover:bg-gray-50" key={m.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {m.concept}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        $ {m.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {new Date(m.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {m.user?.name ?? "Desconocido"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      {loading
                        ? "Cargando..."
                        : "No hay movimientos disponibles"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            id="form"
            className="flex flex-col justify-around text-center mt-10 bg-gray-200 p-4 rounded-lg w-[400px] mx-auto"
          >
            <h3 className="text-[25px] mb-4">Nuevo movimiento</h3>
            <form action={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="monto" className="block text-left">
                  Monto
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="concepto" className="block text-left">
                  Concepto
                </label>
                <input
                  type="text"
                  id="concepto"
                  name="concepto"
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fecha" className="block text-left">
                  Fecha
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  className="border p-2 w-full"
                  required
                />
              </div>

              <button
                className="p-2 bg-gray-500 text-white rounded-[10px] w-full"
                type="submit"
              >
                Ingresar
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
