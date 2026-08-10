import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listarEspecialidades } from "../services/especialidadService";
import {
  crearServicio,
  actualizarServicio,
  obtenerServicio,
} from "../services/servicioService";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import { Alert } from "../components/Alert";

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
  const [exito, setExito] = useState(null);
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
    setExito(null);
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
      setExito(esEdicion ? "Juego actualizado correctamente" : "Juego creado correctamente");
      setTimeout(() => navigate("/servicios"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">
        {esEdicion ? "Editar juego" : "Nuevo juego"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label required>Nombre</Label>
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
          <Label required>Descripción</Label>
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
          <Label required>Precio base (por hora)</Label>
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
          <Label required>Duración base (minutos)</Label>
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
          <Label required>Especialidad</Label>
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
          <Label>Imagen</Label>
          <div className="border border-white/20 rounded px-3 py-2 text-sm text-muted bg-black/40">
            Carga de imagen pendiente (el API todavía no tiene el endpoint de subida)
          </div>
        </div>

        {error && <Alert type="danger">{error}</Alert>}
        {exito && <Alert type="success">{exito}</Alert>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </section>
  );
}
