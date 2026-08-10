import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RutaProtegida } from "./components/RutaProtegida";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegistroPage } from "./pages/RegistroPage";
import { PerfilPage } from "./pages/PerfilPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ServiciosListPage } from "./pages/ServiciosListPage";
import { ServicioDetallePage } from "./pages/ServicioDetallePage";
import { ServicioFormPage } from "./pages/ServicioFormPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <PerfilPage />
            </RutaProtegida>
          }
        />
        <Route path="/servicios" element={<ServiciosListPage />} />
        <Route path="/servicios/:id" element={<ServicioDetallePage />} />
        <Route
          path="/servicios/nuevo"
          element={
            <RutaProtegida rolesPermitidos={["Administrador"]}>
              <ServicioFormPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/servicios/:id/editar"
          element={
            <RutaProtegida rolesPermitidos={["Administrador"]}>
              <ServicioFormPage />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
