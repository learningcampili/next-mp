import { NextResponse } from "next/server";

const accessToken = process.env.MP_ACCESS_TOKEN; // Reemplaza con tu Access Token

export async function GET() {
  try {
    const response = await fetch(
      "https://api.mercadopago.com/v1/payment_methods",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener métodos de pago");
    }

    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al obtener métodos de pago:", error);
    if (error instanceof Error) {
      console.error("Error:", error.message);
      NextResponse.json({ error: error.message }, { status: 500 }); // Manejo específico del error
    } else {
      console.error("Error desconocido:", error);
      NextResponse.json({ error: error }, { status: 500 }); // Manejo general para otros tipos
    }
  }
}
