import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClase = ({ isActive }) =>
  isActive ? "text-white font-bold" : "text-muted hover:text-accent";

export function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const esStaff = usuario?.rol?.nombre === "Administrador" || usuario?.rol?.nombre === "Empleado";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-accent/30 bg-black/90 px-4 py-3 flex items-center justify-between flex-wrap gap-2 shadow-[0_1px_24px_-8px_var(--color-accent)]">
        <Link
          to="/"
          className="font-display font-extrabold uppercase tracking-wide text-accent animate-pulse"
        >
          Zona de Ataque
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {usuario && <NavLink to="/servicios" className={linkClase}>Juegos</NavLink>}
          {esStaff && <NavLink to="/empleados" className={linkClase}>Encargados</NavLink>}
          {esStaff && <NavLink to="/restricciones" className={linkClase}>Restricciones</NavLink>}
          {usuario && <NavLink to="/perfil" className={linkClase}>Mi perfil</NavLink>}

          {usuario ? (
            <button onClick={handleLogout} className="text-danger">
              Cerrar sesión
            </button>
          ) : (
            <NavLink to="/login" className={linkClase}>Iniciar sesión</NavLink>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
