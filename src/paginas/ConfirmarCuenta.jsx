import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { Link, useParams } from "react-router-dom";

const ConfirmarCuenta = () => {
  const [alert, setAlert] = useState({});

  const id = useParams().id;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const resOne = await fetch(
          `http://localhost:4000/api/usuarios/confirmar/${id}`
        );

        const resTwo = await resOne.json();
        if (!resOne.ok) {
          throw resTwo.msg;
        }
        setAlert({
          msg: resTwo.msg,
          error: false,
        });
      } catch (err) {
        const message = err.message ? "Hubo un error" : err;
        console.log(err);
        setAlert({
          msg: message,
          error: true,
        });
      }
    };

    confirmarCuenta();
  }, []);

  return (
    <div className="mx-auto w-3/5 lg:w-2/5 text-slate-600">
      <h2 className="text-3xl font-black text-sky-600 capitalize">
        Crea tu cuenta y administra tus {""}
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Message */}
      <div className="shadow-md bg-white py-10 px-5 mt-10 rounded-md">
        {alert.msg && <Alert alerta={alert} />}

        <div className="text-center mt-10 text-xs uppercase font-bold text-sky-600   ">
          <Link to="/"> Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
