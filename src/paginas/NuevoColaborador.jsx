import React from "react";
import { useContext } from "react";
import Alert from "../components/Alert";
import Colaborador from "../components/Colaborador";
import FormularioColaborador from "../components/FormularioColaborador";
import ProyectosContext from "../context/ProyectosProvider";

const NuevoColaborador = () => {
  const { proyecto, colaborador, alerta, agregarColaborador } =
    useContext(ProyectosContext);

  return (
    <div className="p-3 md:w-2/3 lg:w-3/5 mx-auto">
      <h2 className="text-2xl  font-black">
        Añadir Colaborador(a) al proyecto: {proyecto.nombre}
      </h2>

      <FormularioColaborador />

      {colaborador?.email && (
        <div className="bg-white rounded-md px-5 py-10">
          {colaborador._id && alerta.msg && <Alert alerta={alerta} />}
          <h2 className="text-xl font-black text-center mb-5">Resultado:</h2>

          {colaborador?.email && (
            <div className="flex justify-between items-center">
              <h2 className="text-sm uppercase font-bold text-slate-700">
                {colaborador.nombre}
              </h2>

              <button
                onClick={(e) => agregarColaborador(colaborador._id)}
                className="uppercase  text-sm font-bold bg-gray-500 text-white p-2 rounded-md"
              >
                Agregar al Proyecto
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NuevoColaborador;
