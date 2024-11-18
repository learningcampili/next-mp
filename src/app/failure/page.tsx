"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { useSearchParams } from "next/navigation"; // Importa useSearchParams

const FailurePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //   const payment_id = searchParams.get("payment_id");
  const external_reference = searchParams.get("external_reference");
  //const status = searchParams.get("status");

  useEffect(() => {
    console.log("Pago fallido");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] bg-red-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">¡Pago Fallido!</h1>
      <p className="text-lg mb-2">
        Lamentamos informarte que tu transacción no pudo ser procesada.
      </p>
      <p className="mb-4">
        Por favor, verifica tus datos y vuelve a intentarlo.
      </p>

      {/* <p className="py-2 ">
        ID de pago:
        <span className="font-bold pl-2">{payment_id}</span>
      </p> */}
      <p className="py-2">
        ID de orden:{" "}
        <span className="font-bold pl-2">{external_reference}</span>
      </p>
      <p className="py-2">
        Estado del pago:
        <span
          className={`ml-2 font-bold px-4 py-2 rounded-lg text-white bg-red-500`}
        >
          Fallido
        </span>
      </p>

      {/* Botón para volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default FailurePage;