import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CampoPassword } from "../components/CampoPassword";
import { Button } from "../components/Button";
import { AuthCard } from "../components/AuthCard";
import { Label } from "../components/Label";
import { Alert } from "../components/Alert";

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
    <AuthCard title="Iniciar sesión" subtitle="Accede a tu zona de juego">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label required>Correo</Label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="tu@correo.com"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <Label required>Contraseña</Label>
          <CampoPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <Alert type="danger">{error}</Alert>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>

      <p className="text-sm mt-4 text-center">
        ¿No tienes cuenta? <Link to="/registro" className="text-hover font-bold">Regístrate</Link>
      </p>
    </AuthCard>
  );
}
