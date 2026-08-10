import { get } from "./api";

export function listarRestricciones() {
  return get("/restricciones-horario");
}

export function obtenerRestriccion(id) {
  return get(`/restricciones-horario/${id}`);
}
