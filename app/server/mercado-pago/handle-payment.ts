import resend from "@/app/lib/resend";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  // Aqui você pode implementar a lógica para lidar com o pagamento
  // const {
  //   id,
  //   status,
  //   date_approved,
  //   date_created,
  //   date_of_expiration,
  //   external_reference
  // } = paymentData

  const metadata = paymentData.metadata
  const userEmail = metadata.user_email
  const testeId = metadata.teste_id

  // Por exemplo, atualizar o status do pedido no banco de dados
  console.log("Payment data:", { userEmail, testeId, paymentData })

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