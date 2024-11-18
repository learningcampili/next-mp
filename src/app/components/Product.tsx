"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const items = [
  {
    title: "Yummy Moritas",
    description: "Yummy Moritas",
    quantity: 1,
    currency_id: "ARS",
    unit_price: 50,
  },
  {
    title: "Yummy Banana",
    description: "Yummy Banana",
    quantity: 1,
    currency_id: "ARS",
    unit_price: 45,
  },
];

export const Product = () => {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
      locale: "es-AR",
    });
  }, []);

  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const createPreference = async () => {
    try {
      console.log("create preference frontend");

      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          orderId: "1234567890",
          buyer: {
            name: "John Doe",
            surname: "Doe",
            email: "johndoe@example.com",
            phoneNumber: "5555555555",
            idType: "DNI",
            idNumber: "12345678",
            street: "Calle Mayor",
            streetNumber: "123",
            zipCode: "12345",
            areaCode: "11", // Opcional
          },
          shipping: {
            street: "Calle Mayor",
            streetNumber: "123",
            zipCode: "12345",
            floor: "3",
            apartment: "4",
            city: "Ciudad de México",
            state: "Estado de México",
            country: "México",
          },
        }),
      });
      const data = await response.json();
      console.log("**************************");
      console.log("data en el front", data);
      console.log("**************************");

      const { id } = data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    console.log("****** handleBuy ******");
    const id = await createPreference();
    if (id) setPreferenceId(id);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 bg-slate-800 rounded-lg p-4 flex flex-col justify-center items-center border-2 border-slate-700 ">
      <Image
        src="/assets/images/producto.png"
        alt="Descripción de la imagen"
        width={500}
        height={300}
        priority
        className="bg-slate-800 rounded-lg mb-0"
      />

      <h3 className="text-2xl font-bold">Yummy Moritas</h3>
      <p className="text-sm">$50 ARS</p>
      <button
        onClick={handleBuy}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full my-5"
      >
        Comprar
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};
