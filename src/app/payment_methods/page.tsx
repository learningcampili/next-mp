import React from "react";

const page = async () => {
  const methods = await fetch("http://localhost:3000/api/payment_methods");

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center bg-slate-800 text-white p-5 overflow-auto">
      <h1 className="text-3xl font-bold p-5">Lista de Metodos de pago</h1>
      <pre>
        payment_methods ={JSON.stringify(await methods.json(), null, 2)}
      </pre>
    </div>
  );
};

export default page;
