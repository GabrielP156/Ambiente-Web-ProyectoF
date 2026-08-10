import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenerServicio, cambiarEstadoServicio } from "../services/servicioService";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

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

  if (loading) return <p className="p-6 text-muted">Cargando...</p>;
  if (error) return <p className="p-6 text-danger">{error}</p>;
  if (!servicio) return null;

  return (
    <section className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">{servicio.nombre}</h2>

      {servicio.imagen ? (
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${servicio.imagen}`}
          alt={servicio.nombre}
          className="w-full h-48 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-black/40 rounded flex items-center justify-center text-muted text-sm mb-4">
          Sin imagen
        </div>
      )}

      <div className="flex flex-col gap-2 text-sm">
        <p><strong>Descripción:</strong> {servicio.descripcion}</p>
        <p><strong>Precio base:</strong> ₡{servicio.precioBase}</p>
        <p><strong>Duración base:</strong> {servicio.duracionMinutos} minutos</p>
        <p className="flex items-center gap-2">
          <strong>Estado:</strong>
          <Badge color={servicio.activo ? "success" : "danger"}>
            {servicio.activo ? "Activo" : "Inactivo"}
          </Badge>
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <Link to={`/servicios/${servicio.id}/editar`}>
          <Button>Editar</Button>
        </Link>
        <Button variant="outline" onClick={handleCambiarEstado} disabled={cambiando}>
          {servicio.activo ? "Desactivar" : "Activar"}
        </Button>
        <button
          onClick={() => navigate("/servicios")}
          className="text-sm text-muted"
        >
          Volver
        </button>
      </div>
    </section>
  );
}
