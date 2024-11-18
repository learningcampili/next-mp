"use client";

import React from "react";

const Page = () => {
  const preference = {
    items: [
      {
        title: "Producto Ejemplo 1",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 100.0,
      },
      {
        title: "Producto Ejemplo 2",
        quantity: 2,
        currency_id: "ARS",
        unit_price: 50.0,
      },
    ],
    payer: {
      name: "Juan",
      surname: "Pérez",
      email: "juan.perez@example.com",
      phone: { area_code: "11", number: "12345678" },
      identification: { type: "DNI", number: "12345678" },
    },
    shipments: {
      cost: 100.0,
      mode: "not_specified",
      receiver_address: {
        zip_code: "1400",
        street_name: "Av. Siempre Viva",
        street_number: 742,
        neighborhood: { id: "1234", name: "Springfield" },
        city: { id: "1234", name: "Buenos Aires" },
        state: { id: "1", name: "Buenos Aires" },
        country: { id: "AR", name: "Argentina" },
      },
    },
    external_reference: "order_12345",
    back_urls: {
      success: "http://www.tusitio.com/success",
      failure: "http://www.tusitio.com/failure",
      pending: "http://www.tusitio.com/pending",
    },
    notification_url: "http://www.tusitio.com/webhook", // URL para recibir notificaciones
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [
        { id: "credit_card" }, // todas las tarjetas de credito
        { id: "ticket" }, // mercado pago y rapipago
      ],
    },
  };

  const formattedObject = `
  {
    items: [
      ${preference.items
        .map(
          (item) => `
      {
        title: "${item.title}",
        quantity: ${item.quantity},
        currency_id: "${item.currency_id}",
        unit_price: ${item.unit_price}
      }`
        )
        .join(",")}
    ],
    payer: {
      name: "${preference.payer.name}",
      surname: "${preference.payer.surname}",
      email: "${preference.payer.email}",
      phone: {
        area_code: "${preference.payer.phone.area_code}",
        number: "${preference.payer.phone.number}"
      },
      identification: {
        type: "${preference.payer.identification.type}",
        number: "${preference.payer.identification.number}"
      }
    },
    shipments: {
      cost: ${preference.shipments.cost},
      mode: "${preference.shipments.mode}",
      receiver_address: {
        zip_code: "${preference.shipments.receiver_address.zip_code}",
        street_name: "${preference.shipments.receiver_address.street_name}",
        street_number: ${preference.shipments.receiver_address.street_number},
        neighborhood:{
          id:"${preference.shipments.receiver_address.neighborhood.id}",
          name:"${preference.shipments.receiver_address.neighborhood.name}"
        },
        city:{
          id:"${preference.shipments.receiver_address.city.id}",
          name:"${preference.shipments.receiver_address.city.name}"
        },
        state:{
          id:"${preference.shipments.receiver_address.state.id}",
          name:"${preference.shipments.receiver_address.state.name}"
        },
        country:{
          id:"${preference.shipments.receiver_address.country.id}",
          name:"${preference.shipments.receiver_address.country.name}"
        }
      }
    },
    external_reference:"${preference.external_reference}",
    back_urls:{
      success:"${preference.back_urls.success}",
      failure:"${preference.back_urls.failure}",
      pending:"${preference.back_urls.pending}"
    },
    notification_url:"${preference.notification_url}",
    auto_return:"${preference.auto_return}",
    payment_methods:{
      excluded_payment_types:[
        ${preference.payment_methods.excluded_payment_types
          .map(
            (type) => `
        { id:"${type.id}"}`
          )
          .join(",")}
      ]
    }
  }
  `;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formattedObject.trim())
      .then(() => {
        alert("Preferencia copiada al portapapeles!");
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-800 text-white p-5 overflow-auto">
      <h1 className="text-3xl font-bold p-5">
        Todas las opciones de preferencia
      </h1>
      <pre className="text-sm">{formattedObject}</pre>

      <button
        onClick={copyToClipboard}
        className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
      >
        Copiar Preferencia como Objeto
      </button>
    </div>
  );
};

export default Page;
