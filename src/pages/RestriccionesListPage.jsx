import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarRestricciones } from "../services/restriccionService";
import { Badge } from "../components/Badge";

export function RestriccionesListPage() {
  const [restricciones, setRestricciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarRestricciones()
      .then((data) => setRestricciones(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Restricciones de horario</h2>

      {loading && <p className="text-muted">Cargando restricciones...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && restricciones.length === 0 && (
        <p className="text-muted">No hay restricciones registradas.</p>
      )}

      <div className="flex flex-col gap-3">
        {restricciones.map((r) => (
          <Link
            key={r.id}
            to={`/restricciones/${r.id}`}
            className="bg-card border border-white/10 rounded-lg p-4 flex flex-col gap-1 transition hover:border-accent/60"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-sm">{r.tipoRestriccion?.nombre}</span>
              <Badge color={r.empleado ? "warning" : "danger"}>
                {r.empleado
                  ? `Empleado: ${r.empleado.usuario?.nombre} ${r.empleado.usuario?.primerApellido}`
                  : "Establecimiento completo"}
              </Badge>
            </div>
            <p className="text-sm text-muted">Fecha: {r.fecha?.slice(0, 10)}</p>
            <p className="text-sm text-muted">
              Horario: {r.todoElDia ? "Todo el día" : `${r.horaInicio} - ${r.horaFin}`}
            </p>
            <p className="text-sm text-muted">Motivo: {r.motivo}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
