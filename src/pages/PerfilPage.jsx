import { useAuth } from "../context/AuthContext";

export function PerfilPage() {
  const { usuario } = useAuth();

  if (!usuario) return null;

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">Mi perfil</h2>

      <div className="flex flex-col gap-2 text-sm">
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono || "No registrado"}</p>
        <p><strong>Rol:</strong> {usuario.rol?.nombre}</p>
      </div>
    </section>
  );
}
