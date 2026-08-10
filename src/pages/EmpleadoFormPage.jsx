import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listarUsuarios } from "../services/usuarioService";
import { listarEspecialidades } from "../services/especialidadService";
import { listarServicios } from "../services/servicioService";
import {
  crearEmpleado,
  actualizarEmpleado,
  obtenerEmpleado,
} from "../services/empleadoService";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import { Alert } from "../components/Alert";

const datosIniciales = {
  usuarioId: "",
  especialidadId: "",
  codigoEmpleado: "",
  descripcion: "",
};

export function EmpleadoFormPage() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [datos, setDatos] = useState(datosIniciales);
  const [servicioIds, setServicioIds] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarUsuarios("Empleado").then(setUsuarios).catch(() => setUsuarios([]));
    listarEspecialidades().then(setEspecialidades).catch(() => setEspecialidades([]));
    listarServicios().then(setServicios).catch(() => setServicios([]));
  }, []);

  useEffect(() => {
    if (!esEdicion) return;

    obtenerEmpleado(id).then((data) => {
      setDatos({
        usuarioId: data.usuarioId,
        especialidadId: data.especialidadId,
        codigoEmpleado: data.codigoEmpleado,
        descripcion: data.descripcion || "",
      });
      setServicioIds(data.servicios.map((s) => s.id));
    });
  }, [id, esEdicion]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  function toggleServicio(servicioId) {
    setServicioIds((prev) =>
      prev.includes(servicioId)
        ? prev.filter((sid) => sid !== servicioId)
        : [...prev, servicioId]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setExito(null);

    if (servicioIds.length === 0) {
      setError("Debes asignar al menos un juego al encargado");
      return;
    }

    setEnviando(true);

    const payload = {
      usuarioId: Number(datos.usuarioId),
      especialidadId: Number(datos.especialidadId),
      codigoEmpleado: datos.codigoEmpleado,
      descripcion: datos.descripcion || null,
      servicioIds,
    };

    try {
      if (esEdicion) {
        await actualizarEmpleado(id, payload);
      } else {
        await crearEmpleado(payload);
      }
      setExito(esEdicion ? "Encargado actualizado correctamente" : "Encargado creado correctamente");
      setTimeout(() => navigate("/empleados"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">
        {esEdicion ? "Editar encargado" : "Nuevo encargado"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label required>Usuario</Label>
          <select
            name="usuarioId"
            value={datos.usuarioId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un usuario con rol Empleado</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.primerApellido} ({u.correo})
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label required>Código de empleado</Label>
          <input
            name="codigoEmpleado"
            value={datos.codigoEmpleado}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="EMP-001"
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
          <Label>Descripción</Label>
          <textarea
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            minLength={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <Label required>Juegos que puede atender</Label>
          <div className="flex flex-col gap-1 border rounded px-3 py-2">
            {servicios.map((servicio) => (
              <label key={servicio.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={servicioIds.includes(servicio.id)}
                  onChange={() => toggleServicio(servicio.id)}
                />
                {servicio.nombre}
              </label>
            ))}
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
