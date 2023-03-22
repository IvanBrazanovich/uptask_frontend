import React, { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Colaborador from "../components/Colaborador";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import ProyectosContext from "../context/ProyectosProvider";
import useAdmin from "../hooks/useAdmin";

const Proyecto = () => {
  //Context
  const {
    getProyecto,
    cargando,
    proyecto,
    handleModalFormularioTarea,
    alerta,
  } = useContext(ProyectosContext);

  //React router
  const params = useParams();

  useEffect(() => {
    getProyecto(params.id);
  }, []);

  const admin = useAdmin();

  //Destructuring
  const { nombre, _id } = proyecto;

  if (cargando) return "Cargando...";

  if (alerta.msg) return <Alert alerta={alerta} />;

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{nombre}</h2>

          {admin && (
            <Link
              to={`/proyectos/editar/${_id}`}
              className="flex uppercase font-bold hover:text-black text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <h2>Editar</h2>
            </Link>
          )}
        </div>

        {admin && (
          <button
            onClick={handleModalFormularioTarea}
            className="bg-sky-500 text-white flex rounded-md p-3 mt-3 gap-1 uppercase font-semibold  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            <h2>Nueva Tarea</h2>
          </button>
        )}

        <div className="my-10">
          <h2 className="my-5 font-bold">Tareas del Proyecto</h2>
          {proyecto?.tareas?.map((tarea) => {
            return <Tarea key={tarea._id} tarea={tarea} />;
          })}
        </div>

        {/* COLABORADORES */}
        {admin && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="font-bold my-5">Colaboradores</h2>
              <Link
                to={`/proyectos/nuevo-colaborador/${_id}`}
                className="flex uppercase font-bold hover:text-black text-gray-500"
              >
                Añadir
              </Link>
            </div>

            <div className="bg-white rounded-md">
              {proyecto?.colaboradores?.length > 0
                ? proyecto?.colaboradores?.map((colaborador) => {
                    return (
                      <Colaborador
                        colaborador={colaborador}
                        key={colaborador._id}
                      />
                    );
                  })
                : "Todavía no hay ningún colaborador"}
            </div>
          </div>
        )}
      </div>

      <ModalFormularioTarea />
    </>
  );
};

export default Proyecto;
