import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import ProyectosContext from "../context/ProyectosProvider";
import Alert from "./Alert";

const FormularioProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [cliente, setCliente] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState(null);

  //Use Context
  const { mostrarAlerta, agregarProyecto, alerta, proyecto } =
    useContext(ProyectosContext);

  //React router
  const params = useParams();

  useEffect(() => {
    if (params.id && proyecto.nombre) {
      const { _id, nombre, cliente, fechaEntrega, descripcion } = proyecto;
      setNombre(nombre);
      setCliente(cliente);
      setFechaEntrega(fechaEntrega.split("T")[0]);
      setDescripcion(descripcion);
      setId(_id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [nombre, cliente, fechaEntrega, descripcion]
        .map((item) => item.trim())
        .includes("")
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    await agregarProyecto({
      id,
      nombre,
      cliente,
      fechaEntrega,
      descripcion,
    });

    setId(null);
    setNombre("");
    setCliente("");
    setFechaEntrega("");
    setDescripcion("");
  };

  return (
    <div className="bg-white w-3/5  mx-auto rounded-md my-10 shadow py-5 px-3">
      <form onSubmit={handleSubmit}>
        {alerta.msg && <Alert alerta={alerta} />}

        <div className="my-5">
          <label htmlFor="nombre" className="block my-2 uppercase font-bold">
            Nombre Proyecto
          </label>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            id="nombre"
            className="border rounded-md p-2  block w-full"
            placeholder="Nombre del proyecto"
          />
        </div>

        <div className="my-5">
          <label htmlFor="cliente" className="block my-2 uppercase font-bold">
            Nombre Cliente
          </label>

          <input
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            type="text"
            id="cliente"
            className="border rounded-md p-2  block w-full"
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="fechaEntrega"
            className="block my-2 uppercase font-bold"
          >
            Fecha de entrega
          </label>

          <input
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            id="fechaEntrega"
            type="date"
            className="border rounded-md p-2  block w-full"
            placeholder="Nombre del proyecto"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="descripcion"
            className="block my-2 uppercase font-bold"
          >
            Descripción
          </label>

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            id="descripcion"
            type="textarea"
            className="border rounded-md p-2  block w-full"
            placeholder="Descripción del proyecto"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 block w-full py-3 text-white font-bold uppercase rounded-md hover:bg-sky-700 transition-colors"
        >
          {params.id ? "Actualizar Proyecto" : "Crear Proyecto"}
        </button>
      </form>
    </div>
  );
};

export default FormularioProyecto;
