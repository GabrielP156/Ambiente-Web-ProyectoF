import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarCliente } from "../services/usuarioService";
import { CampoPassword } from "../components/CampoPassword";
import { Button } from "../components/Button";
import { AuthCard } from "../components/AuthCard";
import { Label } from "../components/Label";
import { Alert } from "../components/Alert";

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
  const [exito, setExito] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setExito(null);
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
      setExito("Cuenta creada correctamente, ya podés iniciar sesión");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthCard title="Registro" subtitle="Crea tu cuenta de cliente">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label required>Nombre</Label>
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
          <Label required>Primer apellido</Label>
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
          <Label>Segundo apellido</Label>
          <input
            name="segundoApellido"
            value={datos.segundoApellido}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <Label required>Correo</Label>
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
          <Label>Teléfono</Label>
          <input
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <Label required>Contraseña</Label>
          <CampoPassword
            name="password"
            value={datos.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <p className="text-xs text-muted mt-1">
            Mínimo 8 caracteres, con mayúscula, minúscula y número.
          </p>
        </div>

        {error && <Alert type="danger">{error}</Alert>}
        {exito && <Alert type="success">{exito}</Alert>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Registrando..." : "Registrarme"}
        </Button>
      </form>

      <p className="text-sm mt-4 text-center">
        ¿Ya tienes cuenta? <Link to="/login" className="text-hover font-bold">Inicia sesión</Link>
      </p>
    </AuthCard>
  );
}
