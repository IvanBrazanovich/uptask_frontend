import React, { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";

const Colaborador = ({ colaborador }) => {
  const { nombre } = colaborador;

  const { eliminarColaborador } = useContext(ProyectosContext);
  return (
    <div className="border-b p-3 flex  items-center justify-between">
      <h2 className="text-xl   font-semibold">{nombre}</h2>

      <button
        onClick={() => eliminarColaborador(colaborador._id)}
        className="rounded-md p-2 bg-red-600 text-white font-bold uppercase "
      >
        Eliminar
      </button>
    </div>
  );
};

export default Colaborador;
