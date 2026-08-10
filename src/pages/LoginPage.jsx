import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CampoPassword } from "../components/CampoPassword";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      await login(correo, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <CampoPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-sm mt-4">
        ¿No tienes cuenta? <Link to="/registro" className="text-blue-600">Regístrate</Link>
      </p>
    </section>
  );
}
