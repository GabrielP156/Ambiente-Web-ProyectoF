import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="p-6 text-center">
      <h1 className="text-2xl font-bold text-danger">Página no encontrada</h1>
      <p className="text-muted mt-2">
        <Link to="/" className="text-accent">Volver al inicio</Link>
      </p>
    </section>
  );
}
