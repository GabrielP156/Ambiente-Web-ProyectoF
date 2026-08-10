import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarServicios } from "../services/servicioService";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

export function ServiciosListPage() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarServicios()
      .then((data) => setServicios(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Juegos</h2>
        <Link to="/servicios/nuevo">
          <Button>Nuevo juego</Button>
        </Link>
      </div>

      {loading && <p className="text-muted">Cargando juegos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && servicios.length === 0 && (
        <p className="text-muted">No hay juegos registrados.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="bg-card border border-white/10 rounded p-4 flex flex-col gap-2">
            {servicio.imagen ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${servicio.imagen}`}
                alt={servicio.nombre}
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <div className="w-full h-32 bg-black/40 rounded flex items-center justify-center text-muted text-sm">
                Sin imagen
              </div>
            )}

            <h3 className="font-bold">{servicio.nombre}</h3>
            <p className="text-sm text-muted">₡{servicio.precioBase} / {servicio.duracionMinutos} min</p>

            <Badge color={servicio.activo ? "success" : "danger"}>
              {servicio.activo ? "Activo" : "Inactivo"}
            </Badge>

            <div className="flex gap-3 text-sm mt-2">
              <Link to={`/servicios/${servicio.id}`} className="text-accent">Ver detalle</Link>
              <Link to={`/servicios/${servicio.id}/editar`} className="text-accent">Editar</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
