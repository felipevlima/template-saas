import { handleAuth } from "@/app/actions/handle-auth"
import { auth } from "@/app/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dashboads() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Welcome to the dashboard!</p>
      {session?.user?.email}
      <form action={handleAuth}>
        <button type="submit">Signout</button>
      </form>
      <Link href={"/payments"}>
        Pagamentos  
      </Link>
    </div>
  )
}