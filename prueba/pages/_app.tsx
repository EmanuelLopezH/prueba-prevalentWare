import "@/pages/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-8 bg-gray-100">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
