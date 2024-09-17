"use server";

import { signIn, signOut, auth } from "@/src/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

export const doLogin = async (formData: FormData): Promise<void> => {
  const action = formData.get("action") as string | null;
  if (!action) {
    throw new Error("Action is required");
  }

  await signIn(action, { redirectTo: "/dashboard" });
};

export const doLogout = async (): Promise<void> => {
  await signOut({ redirectTo: "/" });
};

export const getAuth = async (): Promise<{
  isAuthenticated: boolean;
  user?: User;
}> => {
  try {
    const session = await auth();
    if (session) {
      return {
        isAuthenticated: true,
        user: session.user as User, // Adjust based on your session structure
      };
    }
    return { isAuthenticated: false };
  } catch (error) {
    console.error("Failed to get authentication status", error);
    throw new Error("Authentication check failed");
  }
};
