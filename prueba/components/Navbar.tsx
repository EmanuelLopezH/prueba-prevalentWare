"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react"; // <- spinner

export default function Navbar() {
  const { session, signIn, signOut } = useSession();
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
    <div className="flex flex-col justify-start items-start bg-black p-4 text-white min-h-screen w-56">
      <Link href="/">
        <Image
          className="mb-30 mt-10 mx-auto"
          src="/prevalentLogo.jpg"
          width={150}
          height={10}
          alt="logo"
        />
      </Link>

      <Link
        href="/"
        className="m-4 p-2 hover:rounded hover:bg-gray-500 hover:text-black"
      >
        Inicio
      </Link>

      <Link
        href="/movements"
        className="m-4 p-2 hover:rounded hover:bg-gray-500 hover:text-black"
      >
        Ingresos y egresos
      </Link>

      <Link
        href="/users"
        className="m-4 p-2 hover:rounded hover:bg-gray-500 hover:text-black"
        onClick={handleUserClick}
      >
        Usuarios
      </Link>

      <Link
        href="/reports"
        className="m-4 p-2 hover:rounded hover:bg-gray-500 hover:text-black"
        onClick={handleUserClick}
      >
        Reportes
      </Link>

      <div className="mt-30 ml-4">
        {session ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="text-black"
                variant="outline"
                onClick={() => {
                  signOut();
                  window.location.reload();
                }}
              >
                {session.user.name}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cerrar sesión</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Button className="text-black" variant="outline" onClick={signIn}>
                Iniciar con GitHub
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Iniciar Sesión</p>
            </TooltipContent>
          </Tooltip>
        )}
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
    </div>
  );
}
