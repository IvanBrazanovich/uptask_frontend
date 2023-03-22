import React from "react";
import { Link } from "react-router-dom";

const ProyectoPreview = ({ proyecto }) => {
  const { _id, nombre, cliente } = proyecto;
  return (
    <div className="border-b p-3 flex justify-between">
      <h3 className="font-bold">
        {nombre}{" "}
        <span className="font-semibold text-gray-400 uppercase text-sm">
          {cliente}
        </span>
      </h3>

      <Link to={`${_id}`} className="uppercase font-bold text-sm ">
        Ver Proyecto
      </Link>
    </div>
  );
};

export default ProyectoPreview;
