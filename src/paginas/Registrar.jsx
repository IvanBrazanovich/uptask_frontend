import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alert, setAlert] = useState({});

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      [nombre, email, password, repetirPassword]
        .map((item) => item.trim())
        .includes("")
    ) {
      setAlert({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlert({
        error: true,
        msg: "Los passwords no coinciden",
      });
      return;
    }

    setAlert({});

    registrarPersona();
  };

  const registrarPersona = async () => {
    try {
      const resOne = await fetch("http://localhost:4000/api/usuarios", {
        method: "POST",
        body: JSON.stringify({ email, password, nombre }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resTwo = await resOne.json();
      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlert({
        msg: resTwo.msg,
        error: false,
      });

      setEmail("");
      setNombre("");
      setPassword("");
      setRepetirPassword("");
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      setAlert({
        msg: message,
        error: true,
      });
    }
  };

  return (
    <div className="mx-auto w-3/5 lg:w-2/5 text-slate-600  ">
      <h2 className="text-3xl font-black text-sky-600 capitalize">
        Crea tu cuenta y administra tus {""}
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-5 rounded-md py-10 px-5 shadow-md"
      >
        {alert.msg && <Alert alerta={alert} />}

        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="nombre">
            {" "}
            nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            autoComplete="on"
            id="nombre"
            name="nombre"
            placeholder="Tu Nombre"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            placeholder="Email de Registro"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="on"
            name="password"
            placeholder="Password de Registro"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <div className="mb-5">
          <label
            className="block font-bold uppercase"
            htmlFor="repetirpassword"
          >
            Repetir Password
          </label>
          <input
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            type="password"
            id="repetirpassword"
            autoComplete="on"
            name="repetirpassword"
            placeholder="Password de Registro"
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-sky-800 w-full py-2 uppercase font-bold"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="flex justify-between mt-10 text-xs uppercase font-semibold text-slate-600   ">
        <Link to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/olvide-password">Olvidé mi Password</Link>
      </div>
    </div>
  );
};

export default Registrar;
