import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  // convertir IncomingHttpHeaders -> Headers
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    } else if (value !== undefined) {
      headers.append(key, value);
    }
  }

  const session = await auth.api.getSession({ headers });

  if (!session) {
    res.status(401).json({ error: "No autenticado" });
    return null;
  }

  return session;
}
