import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, buyer, shipping, orderId } = body;
    console.log({ items, buyer, shipping, orderId });

    const preference = {
      items: items,
      payer: {
        name: buyer.name,
        surname: buyer.surname,
        email: buyer.email,
        phone: {
          area_code: buyer.areaCode,
          number: buyer.phoneNumber,
        },
        identification: {
          type: buyer.idType,
          number: buyer.idNumber,
        },
        address: {
          street_name: buyer.street,
          street_number: buyer.streetNumber,
          zip_code: buyer.zipCode,
        },
      },
      shipments: {
        receiver_address: {
          street_name: shipping.street,
          street_number: shipping.streetNumber,
          zip_code: shipping.zipCode,
          floor: shipping.floor,
          apartment: shipping.apartment,
          city_name: shipping.city,
          state_name: shipping.state,
          country_name: shipping.country,
        },
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [
          {
            id: "credit_card",
          },
        ],
        installments: 1,
      },
      external_reference: orderId,
      notification_url:
        "https://8460-2800-810-425-81f4-c9ef-8927-855f-51c6.ngrok-free.app/api/webhook",
      statement_descriptor: "Sosmascotas",
    };

    const response = await new Preference(client).create({ body: preference });

    if (!response) {
      throw new Error("Error al crear la preferencia en Mercado Pago");
    }

    console.log("******* se creo la preferencia ********");

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
