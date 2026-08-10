import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarEmpleados } from "../services/empleadoService";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function EmpleadosListPage() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol?.nombre === "Administrador";

  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarEmpleados()
      .then((data) => setEmpleados(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-primary">Encargados</h2>

        {esAdmin && (
          <Link to="/empleados/nuevo">
            <Button>Nuevo encargado</Button>
          </Link>
        )}
      </div>

      {loading && <p className="text-muted">Cargando encargados...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && empleados.length === 0 && (
        <p className="text-muted">No hay encargados registrados.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {empleados.map((empleado) => (
          <div
            key={empleado.id}
            className="bg-card border border-white/10 rounded-lg p-4 flex flex-col gap-2 transition hover:border-accent/60 hover:shadow-[0_0_20px_-6px_var(--color-accent)]"
          >
            <h3 className="font-bold">
              {empleado.usuario?.nombre} {empleado.usuario?.primerApellido}
            </h3>
            <p className="text-sm text-muted">Código: {empleado.codigoEmpleado}</p>
            <p className="text-sm text-muted">
              Juegos: {empleado.servicios?.map((s) => s.nombre).join(", ") || "Ninguno"}
            </p>
            <p className="text-sm text-muted">Citas asignadas: {empleado._count?.citas ?? 0}</p>

            <Badge color={empleado.activo ? "success" : "danger"}>
              {empleado.activo ? "Activo" : "Inactivo"}
            </Badge>

            <Link to={`/empleados/${empleado.id}`} className="text-accent text-sm mt-2">
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
