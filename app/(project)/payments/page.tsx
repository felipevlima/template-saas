"use client"
import { useMercadoPago } from "@/app/hooks/useMercadoPago"
import { useStripe } from "@/app/hooks/useStripe"

export default function Payments() {
  const { createPaymentStripeCheckout, createSubscriptionStripeCheckout, handleCreateStripePortal } = useStripe()
  const { createMercadoPagoCheckout } = useMercadoPago()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-xl font-bold">Pagamentos</h1>
      <div className="flex items-center justify-center gap-4">
        <button 
          className="border rounded-lg px-4 py-2 border-zinc-300 font-semibold text-sm hover:bg-zinc-100 cursor-pointer" 
          onClick={() => createPaymentStripeCheckout({
            testId: "123"
          })}
        >
          Criar pagamento Stripe
        </button>
        <button className="border rounded-lg px-4 py-2 border-zinc-300 font-semibold text-sm hover:bg-zinc-100 cursor-pointer" onClick={() => createSubscriptionStripeCheckout({ testId: "123" })}>Criar Assinatura Stripe</button>
        <button className="border rounded-lg px-4 py-2 border-zinc-300 font-semibold text-sm hover:bg-zinc-100 cursor-pointer" onClick={() => handleCreateStripePortal()}>Criar portal de Pagamentos</button>
        <button className="border rounded-lg px-4 py-2 border-zinc-300 font-semibold text-sm hover:bg-zinc-100 cursor-pointer" onClick={() => createMercadoPagoCheckout({testeId: "123", userEmail: "felip.3lima@hotmail.com"})}>Criar pagamento Mercado Pago</button>
      </div>
    </div>
  )
}