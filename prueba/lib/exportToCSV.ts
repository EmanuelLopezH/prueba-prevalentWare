import { MovementWithUser } from "./types/movements";


export function exportToCSV(data: MovementWithUser[]) {
    if (!data || data.length === 0) return;

    const headers = ["Id", "Concepto", 'Monto', 'Fecha', 'Usuario'];

    const rows = data.map((m) => [
        m.id,
        m.concept,
        m.amount,
        new Date(m.date).toLocaleDateString("es-CO"),
        m.user?.name ?? 'Desconocido'
     ]);

     const csvContent =
     [headers.join(",")]
      .concat(rows.map((row) => row.map((cell) => `"${cell}"`).join(",")))
      .join("\n");

      const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_movimientos.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}