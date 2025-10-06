import { getServerSideProps } from "@/pages/users";
import { auth } from "@/lib/auth";
import type { GetServerSidePropsContext } from "next";

// Mock completo de better-auth
jest.mock("better-auth", () => ({
  betterAuth: jest.fn().mockReturnValue({
    api: {
      getSession: jest.fn(),
    },
  }),
}));

// Mock del prismaAdapter
jest.mock("better-auth/adapters/prisma", () => ({
  prismaAdapter: jest.fn(),
}));
describe("getServerSideProps (usuarios protegidos)", () => {
  it("redirige al home si no hay sesión", async () => {
    (auth.api.getSession as unknown as jest.Mock).mockResolvedValue(null);

    const context = {
      req: { headers: {} },
      res: {},
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      redirect: { destination: "/", permanent: false },
    });
  });

  // Caso: usuario no admin → redirige
  it("redirige si el usuario no es admin", async () => {
    (auth.api.getSession as unknown as jest.Mock).mockResolvedValue({
      user: { role: "User", name: "Juan" },
    });

    const context = {
      req: { headers: {} },
      res: {},
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      redirect: { destination: "/", permanent: false },
    });
  });

  // Caso: usuario admin → permite acceso
  it("permite acceso si el usuario es admin", async () => {
    (auth.api.getSession as unknown as jest.Mock).mockResolvedValue({
      user: { role: "Admin", name: "Emanuel" },
    });

    const context = {
      req: { headers: {} },
      res: {},
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({ props: {} });
  });
});
