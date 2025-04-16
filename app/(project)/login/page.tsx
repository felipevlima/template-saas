import { handleAuth } from "@/app/actions/handle-auth"

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={handleAuth}>
        <button type="submit" className="border border-zinc-300 rounded-md py-2 px-4 text-sm font-semibold cursor-pointer">Signin with Google</button>
      </form>
    </div>
  )
}