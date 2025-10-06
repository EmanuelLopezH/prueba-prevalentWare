import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useSession } from "@/hooks/useSession";

jest.mock("@/hooks/useSession", () => ({
  useSession: jest.fn(),
}));

describe("Navbar", () => {
  it("muestra alerta cuando el usuario no es admin", () => {
    (useSession as jest.Mock).mockReturnValue({
      session: { user: { role: "User", name: "Test User" } },
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(<Navbar />);

    const usersLink = screen.getByText("Usuarios");
    fireEvent.click(usersLink);

    const alert = screen.getByText("Acceso denegado");
    expect(alert).toBeInTheDocument();
  });

  it("no muestra alerta cuando el usuario es admin", () => {
    (useSession as jest.Mock).mockReturnValue({
      session: { user: { role: "Admin", name: "Admin User" } },
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(<Navbar />);

    const usersLink = screen.getByText("Usuarios");
    fireEvent.click(usersLink);

    expect(screen.queryByText("Acceso denegado")).toBeNull();
  });
});
