import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { auth } from "@/lib/auth";

function toWebHeaders(incoming: GetServerSidePropsContext["req"]["headers"]): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(incoming)) {
    if (typeof value === "string") headers.append(key, value);
    else if (Array.isArray(value)) for (const v of value) headers.append(key, v);
  }
  return headers;
}

export const protectAdmin: GetServerSideProps = async (context) => {
  const { req } = context;
  const headers = toWebHeaders(req.headers);

  const session = await auth.api.getSession({ headers });

  if (!session || session.user.role !== "Admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
