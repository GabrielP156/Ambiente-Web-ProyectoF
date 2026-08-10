import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="p-6 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-gray-600 mt-2">
        <Link to="/" className="text-blue-600">Volver al inicio</Link>
      </p>
    </section>
  );
}
