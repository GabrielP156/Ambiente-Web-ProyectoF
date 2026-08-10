import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, obtenerPerfil } from "../services/usuarioService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    obtenerPerfil()
      .then((data) => setUsuario(data))
      .catch(() => {
        localStorage.removeItem("token");
        setUsuario(null);
      })
      .finally(() => setCargando(false));
  }, []);

  async function login(correo, password) {
    const data = await loginService(correo, password);
    localStorage.setItem("token", data.token);
    const perfil = await obtenerPerfil();
    setUsuario(perfil);
    return perfil;
  }

  function logout() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
