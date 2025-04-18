import { db } from "@/app/lib/firebase";
import resend from "@/app/lib/resend";
import "server-only"
import Stripe from "stripe";

export async function handleStripeSubscription(event: Stripe.CheckoutSessionCompletedEvent) {
  if (event.data.object.payment_status === 'paid') {
    console.log("Assinatura criada com sucesso. Enviar um email liberar acesso")
    const metadata = event.data.object.metadata

    const userId = metadata?.userId

    const userEmail = event.data.object.customer_email || event.data.object.customer_details?.email

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
      // to: [userEmail],
      to: ["felip.3lima@hotmail.com"],
      subject: 'Hello world',
      text: 'Assinatura realizada com sucesso'
    })

    if (error) {
      console.log(error)
    }

    console.log(data)
  }
}