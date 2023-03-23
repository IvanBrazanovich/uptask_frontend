import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useContext(AuthContext);

  //React Router
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].map((item) => item.trim()).includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Fetch data
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/usuarios/login`);
      const resOne = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/usuarios/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("hola");
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      //Get token from local storage
      localStorage.setItem("token", resTwo.token);

      //Send authentication to context
      setAuth(resTwo);

      //Reset form
      setEmail("");
      setPassword("");

      //Go to proyectos page
      navigate("/proyectos");
    } catch (error) {
      setAlert({
        msg: error,
        error: true,
      });
    }
  };

  return (
    <div className="mx-auto w-3/5 lg:w-2/5 text-slate-600  ">
      <h2 className="text-3xl font-black text-sky-600 capitalize">
        Inicia Sesión y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-5 rounded-md py-10 px-5 shadow-md"
      >
        {alert.msg && <Alert alerta={alert} />}

        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email "
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold uppercase" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password   "
            className="px-2 bg-slate-50 block w-full  py-1 mt-2"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-sky-800 w-full py-2 uppercase font-bold"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="flex justify-between mt-10 text-xs uppercase font-semibold text-slate-600   ">
        <Link to="registrar">¿No tienes una cuenta? Regístrate</Link>
        <Link to="olvide-password">Olvidé mi Password</Link>
      </div>
    </div>
  );
};

export default Login;
