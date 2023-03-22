import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import ProyectosContext from "../context/ProyectosProvider";

const useAdmin = () => {
  const { proyecto } = useContext(ProyectosContext);
  const { auth } = useContext(AuthContext);

  return auth._id === proyecto.creador;
};

export default useAdmin;
