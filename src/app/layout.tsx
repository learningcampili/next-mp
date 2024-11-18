import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Nextjs + Mercado Pago",
  description: "implementacion de mercado pago con nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-70px)]">{children}</main>
      </body>
    </html>
  );
}
