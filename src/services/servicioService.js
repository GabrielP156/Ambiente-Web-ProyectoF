import { get, post, put, patch } from "./api";

export function listarServicios() {
  return get("/servicios");
}

export function listarServiciosActivos() {
  return get("/servicios/activos");
}

export function obtenerServicio(id) {
  return get(`/servicios/${id}`);
}

export function crearServicio(datos) {
  return post("/servicios", datos);
}

export function actualizarServicio(id, datos) {
  return put(`/servicios/${id}`, datos);
}

export function cambiarEstadoServicio(id, activo) {
  return patch(`/servicios/${id}/estado`, { activo });
}
