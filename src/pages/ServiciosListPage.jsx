import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarServicios } from "../services/servicioService";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

const OPCIONES_ORDEN = {
  nombre_asc: (a, b) => a.nombre.localeCompare(b.nombre),
  nombre_desc: (a, b) => b.nombre.localeCompare(a.nombre),
  precio_asc: (a, b) => a.precioBase - b.precioBase,
  precio_desc: (a, b) => b.precioBase - a.precioBase,
};

export function ServiciosListPage() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState("nombre_asc");

  useEffect(() => {
    listarServicios()
      .then((data) => setServicios(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const serviciosOrdenados = [...servicios].sort(OPCIONES_ORDEN[orden]);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-primary">Juegos</h2>

        <div className="flex items-center gap-3">
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="nombre_asc">Nombre (A-Z)</option>
            <option value="nombre_desc">Nombre (Z-A)</option>
            <option value="precio_asc">Precio (menor a mayor)</option>
            <option value="precio_desc">Precio (mayor a menor)</option>
          </select>

          <Link to="/servicios/nuevo">
            <Button>Nuevo juego</Button>
          </Link>
        </div>
      </div>

      {loading && <p className="text-muted">Cargando juegos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && servicios.length === 0 && (
        <p className="text-muted">No hay juegos registrados.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {serviciosOrdenados.map((servicio) => (
          <div
            key={servicio.id}
            className="bg-card border border-white/10 rounded-lg p-4 flex flex-col gap-2 transition hover:border-accent/60 hover:shadow-[0_0_20px_-6px_var(--color-accent)]"
          >
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
