import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headerList = await headers()
    const signature = headerList.get("stripe-signature");
  
    if (!signature || !secret) {
      return NextResponse.json({ error: "Signature not found" }, { status: 400 });
    }
  
    const event = stripe.webhooks.constructEvent(body, signature, secret)
  
    switch(event.type) {
      case 'checkout.session.completed': // Pagamento realizado se status = paid
        const metadata = event.data.object.metadata
  
        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(event)
        }
  
        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event)
        }
        break;
      case 'checkout.session.expired':
        console.log("Enviar um email para o usuario avisando que o pagamento expirou") // Expirou o tempo
        break;
      case 'checkout.session.async_payment_succeeded':
        console.log("Enviar um email para o usuario avisando que o pagamento foi realizado") // Boleto pago
        break
      case 'checkout.session.async_payment_failed': // Boleto falhou
        console.log("Enviar um email para o usuario avisando que o pagamento falhou")
        break
      case 'customer.subscription.updated': // Atualizou assinatura
        console.log("Alguma coisa mudou na assinatura")
        break
      case 'customer.subscription.deleted': // Cancelou a asssinatura
        await handleStripeCancelSubscription(event)
        break;
      case 'customer.subscription.created': // Criou a assinatura
        console.log("Mensagem de boas vindas porque acabou de assinar")
        break;
      default:
        console.log("Unhandled event type:", event.type)
        break;
    }

    return NextResponse.json({ received: "Webhook received" }, { status: 200 })
  } catch(err) {
    console.log(err)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}