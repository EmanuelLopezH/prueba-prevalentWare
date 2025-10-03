import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
        href="/movements"
        className="m-4 p-2  hover:rounded hover:bg-gray-500 hover:text-black"
      >
        Ingresos y egresos
      </Link>
      <Link
        href="/users"
        className="m-4 p-2  hover:rounded hover:bg-gray-500 hover:text-black"
      >
        Usuarios
      </Link>
      <Link
        href="/reports"
        className="m-4 p-2  hover:rounded hover:bg-gray-500 hover:text-black"
      >
        Reportes
      </Link>
    </div>
  );
}
