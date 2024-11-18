"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Cambia aquí
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const payment_id = searchParams.get("payment_id");
  const external_reference = searchParams.get("external_reference");
  const status = searchParams.get("status");

  useEffect(() => {
    console.log("Pago exitoso");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] bg-green-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">¡Pago Exitoso!</h1>
      <p className="text-lg mb-2">Gracias por tu compra.</p>
      <p className="mb-4">Tu transacción ha sido procesada con éxito.</p>
      <p className="py-2 ">
        id de pago:
        <span className="font-bold pl-2">{payment_id}</span>
      </p>
      <p className="py-2">
        id de orden:{" "}
        <span className="font-bold pl-2">{external_reference}</span>
      </p>
      <p className="py-2">
        Estado del pago:
        <span
          className={`ml-2 font-bold px-4 py-2  rounded-lg text-white ${
            status === "approved" ? "bg-green-500" : "bg-yellow-400"
          }`}
        >
          {status === "approved" ? "Aprobado" : "Pendiente"}
        </span>
      </p>

      {/* Detalles adicionales pueden ir aquí */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default SuccessPage;
