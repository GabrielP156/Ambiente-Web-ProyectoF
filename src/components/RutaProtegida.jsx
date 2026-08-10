import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RutaProtegida({ children, rolesPermitidos }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const rolUsuario = usuario.rol?.nombre;

  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
