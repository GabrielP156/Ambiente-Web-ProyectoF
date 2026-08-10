import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClase = ({ isActive }) =>
  isActive ? "text-white font-bold" : "text-muted hover:text-accent";

export function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-accent/30 bg-bg-alt px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <Link to="/" className="font-extrabold uppercase tracking-wide text-accent">
          Zona de Ataque
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/servicios" className={linkClase}>Juegos</NavLink>
          {usuario && <NavLink to="/perfil" className={linkClase}>Mi perfil</NavLink>}

          {usuario ? (
            <button onClick={handleLogout} className="text-danger">
              Cerrar sesión
            </button>
          ) : (
            <>
              <NavLink to="/login" className={linkClase}>Iniciar sesión</NavLink>
              <NavLink to="/registro" className={linkClase}>Registrarme</NavLink>
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
