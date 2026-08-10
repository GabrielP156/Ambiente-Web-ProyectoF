import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarCliente } from "../services/usuarioService";
import { CampoPassword } from "../components/CampoPassword";

const datosIniciales = {
  nombre: "",
  primerApellido: "",
  segundoApellido: "",
  correo: "",
  telefono: "",
  password: "",
};

export function RegistroPage() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(datosIniciales);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      await registrarCliente({
        nombre: datos.nombre,
        primerApellido: datos.primerApellido,
        segundoApellido: datos.segundoApellido || undefined,
        correo: datos.correo,
        telefono: datos.telefono || undefined,
        password: datos.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Registro de cliente</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
            minLength={2}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Primer apellido</label>
          <input
            name="primerApellido"
            value={datos.primerApellido}
            onChange={handleChange}
            required
            minLength={2}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Segundo apellido</label>
          <input
            name="segundoApellido"
            value={datos.segundoApellido}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Teléfono</label>
          <input
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <CampoPassword
            name="password"
            value={datos.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {enviando ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      <p className="text-sm mt-4">
        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600">Inicia sesión</Link>
      </p>
    </section>
  );
}
