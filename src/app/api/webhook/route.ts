import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const paymentId =
    request.nextUrl.searchParams.get("data.id") ||
    request.nextUrl.searchParams.get("id");
  const type =
    request.nextUrl.searchParams.get("type") ||
    request.nextUrl.searchParams.get("topic");

  if (!paymentId || !type) {
    console.log("****** Parámetros faltantes en la query ******");
    return NextResponse.json(
      { error: "Parámetros faltantes" },
      { status: 400 }
    );
  }

  if (type === "payment") {
    try {
      const payment = await new Payment(client).get({ id: paymentId });

      console.log("*******************************");
      console.log("Detalles del pago:", JSON.stringify(payment, null, 2));
      console.log("*******************************");

      if (payment.status === "approved") {
        console.log("****** Pago aprobado ******");
        console.log("****** actualiza base de datos ******");
        console.log("****** envia correo ******");
        // Aquí puedes agregar la lógica para procesar el pago aprobado
        // actualizar base de datos
      } else {
        console.log("****** Estado del pago: *******", payment.status);
      }

      return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
      console.error("****** Error en el webhook de pago: *******", error);
      return NextResponse.json(
        { error: "Error processing payment webhook" },
        { status: 500 }
      );
    }
  } else if (type === "merchant_order") {
    // Aquí puedes manejar los webhooks de merchant_order si es necesario
    console.log("****** Recibido webhook de merchant_order ******");
    return NextResponse.json(
      { message: "Merchant order webhook received" },
      { status: 200 }
    );
  } else {
    console.log(
      `******** Ignorando webhook de tipo desconocido: ${type} ********`
    );
    return NextResponse.json(
      { message: "Unknown webhook type" },
      { status: 200 }
    );
  }
}
