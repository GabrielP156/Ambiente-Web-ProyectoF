import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarServicios } from "../services/servicioService";

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
        <h2 className="text-xl font-bold">Juegos</h2>
        <Link
          to="/servicios/nuevo"
          className="bg-blue-600 text-white rounded px-3 py-2 text-sm"
        >
          Nuevo juego
        </Link>
      </div>

      {loading && <p>Cargando juegos...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && servicios.length === 0 && (
        <p>No hay juegos registrados.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="border rounded p-4 flex flex-col gap-2">
            {servicio.imagen ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${servicio.imagen}`}
                alt={servicio.nombre}
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                Sin imagen
              </div>
            )}

            <h3 className="font-bold">{servicio.nombre}</h3>
            <p className="text-sm text-gray-600">₡{servicio.precioBase} / {servicio.duracionMinutos} min</p>

            <span
              className={`text-xs w-fit px-2 py-1 rounded ${
                servicio.activo
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {servicio.activo ? "Activo" : "Inactivo"}
            </span>

            <div className="flex gap-3 text-sm mt-2">
              <Link to={`/servicios/${servicio.id}`} className="text-blue-600">Ver detalle</Link>
              <Link to={`/servicios/${servicio.id}/editar`} className="text-blue-600">Editar</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
