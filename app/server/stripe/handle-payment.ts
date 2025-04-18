import { EmailTemplate } from "@/app/components/EmailTemplate";
import { db } from "@/app/lib/firebase";
import resend from "@/app/lib/resend";
import "server-only"

import Stripe from "stripe";

export async function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {
  if (event.data.object.payment_status === 'paid') {
    console.log("Pagamento realizado com sucesso. Enviar um email liberar acesso")
    const metadata = event.data.object.metadata
    
    const userId = metadata?.userId
    const userEmail = event.data.object.customer_email

    if (!userId || !userEmail) {
      console.log("User ID not found in metadata")
      return
    }

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    })

    const { data, error } = await resend.emails.send({
      from: 'Teste <teste@resend.dev>',
      to: [userEmail],
      subject: 'Hello world',
      text: 'Pagamento realizado com sucesso'
    })

    if (error) {
      console.log(error)
    }

    console.log(data)
  }
}