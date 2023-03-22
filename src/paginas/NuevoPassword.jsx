import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const token = useParams().token;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const resOne = await fetch(
          `http://localhost:4000/api/usuarios/olvide-password/${token}`
        );

        const resTwo = await resOne.json();

        //If there is and error, throw to catch
        if (!resOne.ok) {
          throw resTwo.msg;
        }

        setTokenValido(true);
      } catch (err) {
        const message = err.message ? "Hubo un error" : err;
        setAlert({
          msg: message,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.trim() === "" || password.length < 6) {
      setAlert({
        msg: "El Password no es válido",
        error: true,
      });
      return;
    }

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/usuarios/olvide-password/${token}`,
        {
          method: "POST",
          body: JSON.stringify({ password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resTwo = await resOne.json();

      //If there is and error, throw to catch
      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlert({
        msg: resTwo.msg,
        error: false,
      });
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
        Reestablece tu password y no pierdas acceso a tus proyectos
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-5 rounded-md py-10 px-5 shadow-md"
      >
        {alert.msg && <Alert alerta={alert} />}

        {tokenValido ? (
          <>
            <div className="mb-5">
              <label className="block font-bold uppercase" htmlFor="password">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                className="px-2 bg-slate-50 block w-full  py-1 mt-2"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-sky-800 w-full py-2 uppercase font-bold"
            >
              Guardar Nuevo Password
            </button>
          </>
        ) : null}
      </form>

      <div className="flex justify-between mt-10 text-xs uppercase font-semibold text-slate-600   ">
        <Link to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to="/registrar">¿No tienes una cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default NuevoPassword;
