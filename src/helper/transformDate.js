const transformDate = (date) => {
  const fecha = new Date(date.split("T")[0].split("-"));

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return fecha.toLocaleDateString("es-ES", options);
};

export default transformDate;
