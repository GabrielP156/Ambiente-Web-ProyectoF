import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <Link to="/" className="font-bold">Gestión de Citas</Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/servicios">Juegos</Link>
          {usuario && <Link to="/perfil">Mi perfil</Link>}

          {usuario ? (
            <button onClick={handleLogout} className="text-red-600">
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/registro">Registrarme</Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
