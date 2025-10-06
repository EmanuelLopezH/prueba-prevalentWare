import { useEffect,  useState } from "react";
import { authClient } from "@/lib/auth/client";
import type { Session} from "@/lib/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      // ✅ le decimos a TS que esto es un Session
      setSession((data as Session) ?? null);
      setLoading(false);
    });
  }, []);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/", // a dónde regresar después del login
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    setSession(null);
  };

  return { session, loading, signIn, signOut };
}