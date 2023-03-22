import { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  //State
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});

  //React Router
  const navigate = useNavigate();

  //Functions
  const getProyectos = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch("http://localhost:4000/api/proyectos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }
      setProyectos(resTwo);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Get Proyectos
  useEffect(() => {
    getProyectos();
  }, []);

  const mostrarAlerta = (datos) => {
    setAlerta(datos);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const agregarProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  // Editar proyecto

  const editarProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      mostrarAlerta({
        msg: "No tienes los permisos necesarios",
        error: true,
      });

      return;
    }

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/proyectos/${proyecto.id}`,
        {
          method: "PUT",
          body: JSON.stringify(proyecto),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      const proyectosActualizados = proyectos.map((item) =>
        item._id === resTwo._id ? resTwo : item
      );

      setProyectos(proyectosActualizados);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  // Nuevo Proyecto
  const nuevoProyecto = async (proyecto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      mostrarAlerta({
        msg: "No tienes los permisos necesarios",
        error: true,
      });

      return;
    }

    try {
      const resOne = await fetch("http://localhost:4000/api/proyectos", {
        method: "POST",
        body: JSON.stringify(proyecto),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      setProyectos([...proyectos, resTwo]);

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Delete proyecto
  const deleteProyecto = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      const proyectosActualizados = proyectos.filter((item) => item._id !== id);

      setProyectos(proyectosActualizados);

      setAlerta({
        msg: resTwo.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  const getProyecto = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setCargando(true);
    try {
      //Ger proyecto
      const resOne = await fetch(`http://localhost:4000/api/proyectos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }
      setProyecto(resTwo.proyecto);
    } catch (err) {
      navigate("/proyectos");
      const message = err.message ? "Hubo un error" : err;
      setAlerta({
        msg: message,
        error: true,
      });
    }

    setCargando(false);
    setAlerta({});
  };

  const submitTarea = async (datos) => {
    if (datos.id) {
      await editarTarea(datos);
    } else {
      await agregarTarea(datos);
    }
  };

  // TAREAS

  const editarTarea = async (datos) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/tareas/${datos.id}`,
        {
          method: "PUT",
          body: JSON.stringify(datos),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      mostrarAlerta({
        msg: "La tarea se editó ",
        error: false,
      });

      const tareasActualizadas = { ...proyecto }.tareas.map((tarea) =>
        tarea._id === resTwo._id ? resTwo : tarea
      );
      setProyecto({ ...proyecto, tareas: tareasActualizadas });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
    setModalFormularioTarea(false);
  };

  const agregarTarea = async (datos) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch("http://localhost:4000/api/tareas/", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      mostrarAlerta({
        msg: "La tarea se agregó ",
        error: false,
      });

      const proyectosActualizado = {
        ...proyecto,
        tareas: [...proyecto.tareas, resTwo.tareaAlmacenada],
      };

      setProyecto(proyectosActualizado);
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
    setModalFormularioTarea(false);
  };

  const estadoTarea = async (id) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/tareas/estado/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      const tareasActualizadas = { ...proyecto }.tareas.map((tarea) =>
        tarea._id === resTwo._id ? resTwo : tarea
      );

      setProyecto({ ...proyecto, tareas: tareasActualizadas });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Close and open modal formuolario tarea
  const handleModalFormularioTarea = (e) => {
    setModalFormularioTarea(!modalFormularioTarea);
  };

  const handleSubmitEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleDeleteTarea = async (id) => {
    //Check if there is a token
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(`http://localhost:4000/api/tareas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      mostrarAlerta({
        msg: "La tarea se eliminó ",
        error: false,
      });

      const tareasActualizadas = { ...proyecto }.tareas.filter(
        (item) => item._id !== id
      );

      setProyecto({ ...proyecto, tareas: tareasActualizadas });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  // COLABORADOR
  const buscarColaborador = async (email) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/proyectos/colaboradores`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      setColaborador(resTwo);
    } catch (err) {
      console.log({ err });
      const message = err.message ? "Hubo un error" : err;
      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  const agregarColaborador = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/proyectos/colaboradores/${proyecto._id}`,
        {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      mostrarAlerta({
        msg: "Agregado correctamente",
        error: false,
      });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;

      mostrarAlerta({
        msg: message,
        error: true,
      });

      setColaborador({});
    }
  };

  const eliminarColaborador = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const resOne = await fetch(
        `http://localhost:4000/api/proyectos/eliminar-colaboradores/${proyecto._id}`,
        {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resTwo = await resOne.json();

      if (!resOne.ok) {
        throw resTwo.msg;
      }

      const nuevosColaboradores = proyecto.colaboradores.filter(
        (colaborador) => colaborador._id !== id
      );

      setProyecto({ ...proyecto, colaboradores: nuevosColaboradores });
      mostrarAlerta({
        msg: "Eliminado correctamente",
        error: false,
      });
    } catch (err) {
      const message = err.message ? "Hubo un error" : err;

      mostrarAlerta({
        msg: message,
        error: true,
      });
    }
  };

  //Cerrar sesión
  const cerrarSesion = () => {
    setProyecto({});
    setProyectos([]);
    setAlerta({});
  };

  return (
    <ProyectosContext.Provider
      value={{
        cerrarSesion,
        eliminarColaborador,
        buscarColaborador,
        handleDeleteTarea,
        tarea,
        cargando,
        setColaborador,
        agregarColaborador,
        alerta,
        agregarProyecto,
        mostrarAlerta,
        proyectos,
        setProyectos,
        getProyectos,
        getProyecto,
        deleteProyecto,
        proyecto,
        setTarea,
        estadoTarea,
        handleModalFormularioTarea,
        handleSubmitEditarTarea,
        modalFormularioTarea,
        submitTarea,
        colaborador,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export default ProyectosContext;

export { ProyectosProvider };
