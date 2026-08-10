import { get } from "./api";

export function listarEspecialidades() {
  return get("/especialidades");
}
