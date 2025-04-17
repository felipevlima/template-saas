import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json()
  const price = process.env.STRIPE_PRODUCT_PRICE_ID

  if (!price) {
    return new Response("Price not found", { status: 500 })
  }

  const metadata = {
    testeId,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: 'payment',
      payment_method_types: ['card', 'boleto'],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
      ...(userEmail && { customer_email: userEmail }),
      metadata
    })

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch(err) {
    console.log(err)
  }
}