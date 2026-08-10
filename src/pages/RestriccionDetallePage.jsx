import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerRestriccion } from "../services/restriccionService";
import { Badge } from "../components/Badge";

export function RestriccionDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restriccion, setRestriccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerRestriccion(id)
      .then((data) => setRestriccion(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-muted">Cargando...</p>;
  if (error) return <p className="p-6 text-danger">{error}</p>;
  if (!restriccion) return null;

  return (
    <section className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">{restriccion.tipoRestriccion?.nombre}</h2>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex items-center gap-2">
          <strong>Aplica a:</strong>
          <Badge color={restriccion.empleado ? "warning" : "danger"}>
            {restriccion.empleado
              ? `${restriccion.empleado.usuario?.nombre} ${restriccion.empleado.usuario?.primerApellido}`
              : "Establecimiento completo"}
          </Badge>
        </p>
        <p><strong>Fecha:</strong> {restriccion.fecha?.slice(0, 10)}</p>
        <p>
          <strong>Horario restringido:</strong>{" "}
          {restriccion.todoElDia ? "Todo el día" : `${restriccion.horaInicio} - ${restriccion.horaFin}`}
        </p>
        <p><strong>Motivo:</strong> {restriccion.motivo}</p>
        <p className="flex items-center gap-2">
          <strong>Estado:</strong>
          <Badge color={restriccion.activo ? "success" : "danger"}>
            {restriccion.activo ? "Activa" : "Inactiva"}
          </Badge>
        </p>
      </div>

      <button onClick={() => navigate("/restricciones")} className="text-sm text-muted mt-4">
        Volver
      </button>
    </section>
  );
}
