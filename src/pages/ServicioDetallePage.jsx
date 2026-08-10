import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenerServicio, cambiarEstadoServicio } from "../services/servicioService";

export function ServicioDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cambiando, setCambiando] = useState(false);

  useEffect(() => {
    obtenerServicio(id)
      .then((data) => setServicio(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCambiarEstado() {
    setCambiando(true);
    try {
      const actualizado = await cambiarEstadoServicio(id, !servicio.activo);
      setServicio(actualizado);
    } catch (err) {
      setError(err.message);
    } finally {
      setCambiando(false);
    }
  }

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!servicio) return null;

  return (
    <section className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">{servicio.nombre}</h2>

      {servicio.imagen ? (
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${servicio.imagen}`}
          alt={servicio.nombre}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm mb-4">
          Sin imagen
        </div>
      )}

      <div className="flex flex-col gap-2 text-sm">
        <p><strong>Descripción:</strong> {servicio.descripcion}</p>
        <p><strong>Precio base:</strong> ₡{servicio.precioBase}</p>
        <p><strong>Duración base:</strong> {servicio.duracionMinutos} minutos</p>
        <p>
          <strong>Estado:</strong>{" "}
          <span className={servicio.activo ? "text-green-700" : "text-red-700"}>
            {servicio.activo ? "Activo" : "Inactivo"}
          </span>
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <Link to={`/servicios/${servicio.id}/editar`} className="bg-blue-600 text-white rounded px-3 py-2 text-sm">
          Editar
        </Link>
        <button
          onClick={handleCambiarEstado}
          disabled={cambiando}
          className="border rounded px-3 py-2 text-sm disabled:opacity-50"
        >
          {servicio.activo ? "Desactivar" : "Activar"}
        </button>
        <button
          onClick={() => navigate("/servicios")}
          className="text-sm text-gray-600"
        >
          Volver
        </button>
      </div>
    </section>
  );
}
