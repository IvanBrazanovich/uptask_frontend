import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  //React
  const navigate = useNavigate();

  useEffect(() => {
    setCargando(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }
    const auntenticar = async () => {
      try {
        const resOne = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resTwo = await resOne.json();

        if (!resOne.ok) {
          throw resTwo.msg;
        }

        setAuth(resTwo);
      } catch (err) {
        console.log(err);
      }
      setCargando(false);
    };
    auntenticar();
  }, []);

  const cerrarAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ cerrarAuth, setAuth, auth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
