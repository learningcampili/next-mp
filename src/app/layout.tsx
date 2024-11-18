import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
