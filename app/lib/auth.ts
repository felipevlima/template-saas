import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { firebaseCert } from "./firebase";

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  providers: [Google],
  adapter: FirestoreAdapter({
    credential: firebaseCert
  })
})