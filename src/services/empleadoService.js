import { get, post, put, patch } from "./api";

export function listarEmpleados() {
  return get("/empleados");
}

export function obtenerEmpleado(id) {
  return get(`/empleados/${id}`);
}

export function crearEmpleado(datos) {
  return post("/empleados", datos);
}

export function actualizarEmpleado(id, datos) {
  return put(`/empleados/${id}`, datos);
}

export function cambiarEstadoEmpleado(id, activo) {
  return patch(`/empleados/${id}/estado`, { activo });
}

export function obtenerAgendaEmpleado(id, fecha) {
  return get(`/empleados/${id}/agenda?fecha=${fecha}`);
}
