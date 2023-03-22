import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <aside className="w-56 lg:w-64 px-3 py-5">
      <h2 className="font-bold">Hola: {auth?.nombre}</h2>

      <Link
        to="crear-proyecto"
        className="p-2 bg-sky-600 block my-2 rounded-md  font-bold text-white text-center uppercase "
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
