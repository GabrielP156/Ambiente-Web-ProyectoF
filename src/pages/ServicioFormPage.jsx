import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listarEspecialidades } from "../services/especialidadService";
import {
  crearServicio,
  actualizarServicio,
  obtenerServicio,
} from "../services/servicioService";

const datosIniciales = {
  nombre: "",
  descripcion: "",
  precioBase: "",
  duracionMinutos: "",
  especialidadId: "",
};

export function ServicioFormPage() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [datos, setDatos] = useState(datosIniciales);
  const [imagenActual, setImagenActual] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarEspecialidades()
      .then((data) => setEspecialidades(data))
      .catch(() => setEspecialidades([]));
  }, []);

  useEffect(() => {
    if (!esEdicion) return;

    obtenerServicio(id).then((data) => {
      setDatos({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precioBase: data.precioBase,
        duracionMinutos: data.duracionMinutos,
        especialidadId: data.especialidadId,
      });
      setImagenActual(data.imagen);
    });
  }, [id, esEdicion]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    const payload = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      precioBase: Number(datos.precioBase),
      duracionMinutos: Number(datos.duracionMinutos),
      especialidadId: Number(datos.especialidadId),
    };

    try {
      if (esEdicion) {
        await actualizarServicio(id, { ...payload, imagen: imagenActual });
      } else {
        await crearServicio(payload);
      }
      navigate("/servicios");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar juego" : "Nuevo juego"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
            minLength={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            required
            minLength={10}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Precio base (por hora)</label>
          <input
            type="number"
            name="precioBase"
            value={datos.precioBase}
            onChange={handleChange}
            required
            min={0.01}
            step="0.01"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Duración base (minutos)</label>
          <input
            type="number"
            name="duracionMinutos"
            value={datos.duracionMinutos}
            onChange={handleChange}
            required
            min={15}
            max={480}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Especialidad</label>
          <select
            name="especialidadId"
            value={datos.especialidadId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Imagen</label>
          <div className="border rounded px-3 py-2 text-sm text-gray-400 bg-gray-50">
            Carga de imagen pendiente (el API todavía no tiene el endpoint de subida)
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {enviando ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
}
