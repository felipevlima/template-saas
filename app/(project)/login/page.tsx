import { handleAuth } from "@/app/actions/handle-auth"
import { auth } from "@/app/lib/auth"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={handleAuth}>
        <button type="submit" className="border border-zinc-300 rounded-md py-2 px-4 text-sm font-semibold cursor-pointer">Signin with Google</button>
      </form>
    </div>
  )
}