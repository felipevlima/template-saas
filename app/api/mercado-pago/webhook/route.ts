import { NextRequest, NextResponse } from "next/server";
import mpClient, { validateMercadoPagoWebhook } from "@/app/lib/mercado-pago";
import { Payment } from "mercadopago";
import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";

export async function POST(req: NextRequest) {
  try {
    validateMercadoPagoWebhook(req)

    const body = await req.json()
    const { type, data } = body

    switch(type) {
      case "payment":
        const payment = new Payment(mpClient)
        const paymentData = await payment.get({ id: data.id })
        if (paymentData.status === "approved" || paymentData.date_approved !== null) {
          // Handle the successful payment
          console.log("Payment approved:", paymentData)
          await handleMercadoPagoPayment(paymentData)
        }
        break;
      case "subscription_preapproval":
        break
      default:
        console.log("Esse evento não é suportado")

    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch(err) {
    console.log(err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}