import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthProvider";

const RutaProtegida = () => {
  const { auth, cargando } = useContext(AuthContext);

  if (cargando) return "cargando...";

  return (
    <>
      {auth._id ? (
        <div>
          <Header />

          <div className="md:flex">
            <Sidebar />

            <main className="grow">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
