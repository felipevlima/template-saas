import { useRouter } from "next/navigation"
import { initMercadoPago } from '@mercadopago/sdk-react'

export function useMercadoPago() {
  const router = useRouter()

  async function createMercadoPagoCheckout({
    testeId,
    userEmail
  }: { testeId: string, userEmail: string }) {

    initMercadoPago(process.env.NEXT_MERCADO_PAGO_PUBLIC_KEY!)
    
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testeId,
          userEmail
        }),
      })

      const data = await response.json()

      router.push(data.initPoint)
    } catch(err) {
      throw err
    }
  }
  return {
    createMercadoPagoCheckout
  }
}