import React from "react";
import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import transformDate from "../helper/transformDate";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { nombre, estado, descripcion, fechaEntrega, prioridad, _id } = tarea;

  //CONTEXT
  const { estadoTarea, handleSubmitEditarTarea, handleDeleteTarea } =
    useContext(ProyectosContext);

  const admin = useAdmin();

  return (
    <div className="flex bg-white p-3 border-b justify-between">
      <div className="flex gap-1 flex-col">
        <p className=" font-semibold">{nombre}</p>
        <p className="text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm font-semibold">{transformDate(fechaEntrega)}</p>
        <p className="text-gray-600">Prioridad: {prioridad}</p>
      </div>

      <div className="flex gap-1 items-center">
        {admin && (
          <button
            onClick={() => handleSubmitEditarTarea(tarea)}
            className="uppercase font-semibold text-white bg-indigo-600 py-1 px-4 rounded-md"
          >
            Editar
          </button>
        )}
        {estado ? (
          <button
            onClick={() => estadoTarea(_id)}
            className="uppercase font-semibold text-white bg-blue-600 py-1 px-4 rounded-md"
          >
            Completa
          </button>
        ) : (
          <button
            onClick={() => estadoTarea(_id)}
            className="uppercase font-semibold text-white bg-gray-600 py-1 px-4 rounded-md"
          >
            Incompleta
          </button>
        )}
        {admin && (
          <button
            onClick={() => handleDeleteTarea(_id)}
            className="uppercase font-semibold text-white bg-red-600 py-1 px-4 rounded-md"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
