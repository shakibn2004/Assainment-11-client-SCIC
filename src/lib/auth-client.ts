import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined"
        ? (process.env.NODE_ENV === "production" ? window.location.origin : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"))
        : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"),
});

export const { signIn, signUp, signOut, useSession } = authClient;
