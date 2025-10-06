"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSession } from "@/hooks/useSession";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (session === undefined) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <Loader2 className="animate-spin w-8 h-8 text-gray-300" />
      </div>
    );
  }

  const handleUserClick = (e: React.MouseEvent) => {
    if (session?.user.role !== "Admin") {
      e.preventDefault();
      setOpen(true);
    }
  };
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <div className=" h-[400] flex justify-around">
          <Link
            href="/movements"
            className="w-1/4 m-auto pt-30 p-20 border rounded-[5] h-70 text-center"
          >
            Sistema de gestion de ingresos y gastos
          </Link>
          <Link
            href="/users"
            className="w-1/4 pt-30 m-auto border rounded-[5] h-70 text-center"
            onClick={handleUserClick}
          >
            Gestion de usuarios
          </Link>
          <Link
            href="/reports"
            className="w-1/4 pt-30 m-auto border rounded-[5] h-70 text-center"
            onClick={handleUserClick}
          >
            Reportes
          </Link>
        </div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Acceso denegado</AlertDialogTitle>
              <AlertDialogDescription>
                Solo los administradores pueden acceder.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Entendido
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
