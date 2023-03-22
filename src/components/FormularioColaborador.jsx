import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import Alert from "./Alert";
import FormularioProyecto from "./FormularioProyecto";

const FormularioColaborador = () => {
  //State
  const [email, setEmail] = useState("");

  //Effect
  useEffect(() => {
    setColaborador({});
  }, []);

  //Context
  const {
    setColaborador,
    alerta,
    colaborador,
    mostrarAlerta,
    buscarColaborador,
  } = useContext(ProyectosContext);

  //Funciones
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      mostrarAlerta({
        msg: "Debes rellenar el campo con un mail válido",
        error: true,
      });

      return;
    }

    buscarColaborador(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white my-10 rounded-md py-10 px-5  "
    >
      {alerta.msg && !colaborador._id && <Alert alerta={alerta} />}

      <div>
        <label htmlFor="email" className="block my-2 uppercase font-bold">
          Email Colaborador
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="border rounded-md p-2  block w-full"
          placeholder="Email del Usuario"
        />
      </div>

      <button
        className="p-2 block w-full bg-sky-600 text-white font-bold  my-5 rounded-md uppercase"
        type="submit"
      >
        Buscar Colaborador
      </button>
    </form>
  );
};

export default FormularioColaborador;
