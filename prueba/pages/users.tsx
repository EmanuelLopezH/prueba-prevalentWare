"use client";

import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { protectAdmin } from "@/lib/auth/protectAdmin";

export const getServerSideProps = protectAdmin;

export default function UsersPage() {
  const [usersTable, setUsersTable] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inicial
  useEffect(() => {
    fetch(`/api/users/`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => {
        setUsersTable(Array.isArray(data) ? data : data.users ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);

    const userData = {
      name: rawFormData.nombre as string,
      role: rawFormData.rol as string,
    };

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      // actualizar el estado local sin recargar
      setUsersTable((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...userData } : u))
      );

      setUserId("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al actualizar el usuario.");
    }
  }

  if (loading) return <p className="text-center mt-10">Cargando usuarios...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center">
        Sistema de gestión de Ingresos y Gastos
      </h2>

      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-lg border-b w-40 text-center">Usuarios</h1>
        {!showForm ? (
          <div id="table" className="overflow-x-auto p-4 rounded-lg mt-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Correo
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {usersTable.map((u) => (
                  <tr className="hover:bg-gray-50" key={u.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {u.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {u.phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setUserId(u.id);
                          setShowForm(true);
                        }}
                      >
                        Editar usuario
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col justify-around text-center mt-10 bg-gray-200 p-6 rounded-lg w-[400px] mx-auto">
            <h3 className="text-[25px] mb-4">Editar Usuario</h3>
            <form action={handleSubmit}>
              <div className="mb-4 flex flex-col">
                <label htmlFor="nombre" className="block text-left">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="rol" className="block text-left">
                  Rol
                </label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="p-2 bg-gray-500 text-white rounded-[10px] w-1/4"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setUserId("");
                  }}
                  className="p-2 bg-gray-500 text-white rounded-[10px] w-1/4"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
