import React, { useContext } from "react";
import { useEffect } from "react";
import ProyectoPreview from "../components/ProyectoPreview";
import ProyectosContext from "../context/ProyectosProvider";

const Proyectos = () => {
  const { proyectos, getProyectos } = useContext(ProyectosContext);

  useEffect(() => {
    getProyectos();
  }, []);

  return (
    <div className="p-3 ">
      <h1 className="font-black  text-3xl ">Proyectos </h1>

      {proyectos?.length > 0 ? (
        <div className="bg-white shadow mt-10 rounded-md  ">
          {proyectos.map((proyecto) => {
            return <ProyectoPreview key={proyecto._id} proyecto={proyecto} />;
          })}
        </div>
      ) : (
        <div>Todavía no hay proyectos</div>
      )}
    </div>
  );
};

export default Proyectos;
