import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { obtenerEmpleado, cambiarEstadoEmpleado } from "../services/empleadoService";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/AuthContext";

export function EmpleadoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol?.nombre === "Administrador";

  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accionError, setAccionError] = useState(null);
  const [exito, setExito] = useState(null);
  const [cambiando, setCambiando] = useState(false);

  useEffect(() => {
    obtenerEmpleado(id)
      .then((data) => setEmpleado(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleCambiarEstado() {
    setCambiando(true);
    setAccionError(null);
    setExito(null);
    try {
      const actualizado = await cambiarEstadoEmpleado(id, !empleado.activo);
      setEmpleado((prev) => ({ ...prev, activo: actualizado.activo }));
      setExito(actualizado.activo ? "Encargado activado correctamente" : "Encargado desactivado correctamente");
    } catch (err) {
      setAccionError(err.message);
    } finally {
      setCambiando(false);
    }
  }

  if (loading) return <p className="p-6 text-muted">Cargando...</p>;
  if (error) return <p className="p-6 text-danger">{error}</p>;
  if (!empleado) return null;

  return (
    <section className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">
        {empleado.usuario?.nombre} {empleado.usuario?.primerApellido}
      </h2>

      <div className="flex flex-col gap-2 text-sm">
        <p><strong>Código:</strong> {empleado.codigoEmpleado}</p>
        <p><strong>Correo:</strong> {empleado.usuario?.correo}</p>
        <p><strong>Especialidad:</strong> {empleado.especialidad?.nombre}</p>
        <p><strong>Descripción:</strong> {empleado.descripcion || "Sin descripción"}</p>
        <p><strong>Juegos que atiende:</strong> {empleado.servicios?.map((s) => s.nombre).join(", ") || "Ninguno"}</p>
        <p><strong>Citas asignadas:</strong> {empleado.citas?.length ?? 0}</p>
        <p><strong>Restricciones registradas:</strong> {empleado.restricciones?.length ?? 0}</p>
        <p className="flex items-center gap-2">
          <strong>Estado:</strong>
          <Badge color={empleado.activo ? "success" : "danger"}>
            {empleado.activo ? "Activo" : "Inactivo"}
          </Badge>
        </p>
      </div>

      {accionError && <Alert type="danger">{accionError}</Alert>}
      {exito && <Alert type="success">{exito}</Alert>}

      <div className="flex gap-3 mt-4">
        {esAdmin && (
          <>
            <Link to={`/empleados/${empleado.id}/editar`}>
              <Button>Editar</Button>
            </Link>
            <Button variant="outline" onClick={handleCambiarEstado} disabled={cambiando}>
              {empleado.activo ? "Desactivar" : "Activar"}
            </Button>
          </>
        )}
        <button onClick={() => navigate("/empleados")} className="text-sm text-muted">
          Volver
        </button>
      </div>
    </section>
  );
}
