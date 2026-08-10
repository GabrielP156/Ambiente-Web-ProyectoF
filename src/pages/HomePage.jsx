import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";

const JUEGOS = ["Bolos", "Pool", "Futbolín", "PlayStation"];

export function HomePage() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 gap-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
        Zona de Ataque
      </h1>

      <p className="text-muted max-w-md">
        Bolos, pool, futbolín y PlayStation. Elige un juego y reserva tu horario.
      </p>

      <div className="flex gap-2 flex-wrap justify-center">
        {JUEGOS.map((juego) => (
          <Badge key={juego} color="info">{juego}</Badge>
        ))}
      </div>

      <div className="flex gap-4 mt-2">
        <Link to="/servicios">
          <Button>Ver juegos</Button>
        </Link>
        <Link to="/login">
          <Button variant="outline">Iniciar sesión</Button>
        </Link>
      </div>
    </section>
  );
}
