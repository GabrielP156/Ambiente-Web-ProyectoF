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
import { EmpleadosListPage } from "./pages/EmpleadosListPage";
import { EmpleadoDetallePage } from "./pages/EmpleadoDetallePage";
import { EmpleadoFormPage } from "./pages/EmpleadoFormPage";
import { RestriccionesListPage } from "./pages/RestriccionesListPage";
import { RestriccionDetallePage } from "./pages/RestriccionDetallePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RutaProtegida>
              <HomePage />
            </RutaProtegida>
          }
        />
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
        <Route
          path="/servicios"
          element={
            <RutaProtegida>
              <ServiciosListPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/servicios/:id"
          element={
            <RutaProtegida>
              <ServicioDetallePage />
            </RutaProtegida>
          }
        />
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
        <Route
          path="/empleados"
          element={
            <RutaProtegida rolesPermitidos={["Administrador", "Empleado"]}>
              <EmpleadosListPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/empleados/:id"
          element={
            <RutaProtegida rolesPermitidos={["Administrador", "Empleado"]}>
              <EmpleadoDetallePage />
            </RutaProtegida>
          }
        />
        <Route
          path="/empleados/nuevo"
          element={
            <RutaProtegida rolesPermitidos={["Administrador"]}>
              <EmpleadoFormPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/empleados/:id/editar"
          element={
            <RutaProtegida rolesPermitidos={["Administrador"]}>
              <EmpleadoFormPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/restricciones"
          element={
            <RutaProtegida rolesPermitidos={["Administrador", "Empleado"]}>
              <RestriccionesListPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/restricciones/:id"
          element={
            <RutaProtegida rolesPermitidos={["Administrador", "Empleado"]}>
              <RestriccionDetallePage />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
