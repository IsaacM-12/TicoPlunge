import React from "react";

const ViewUserAppointment = ({
  showClasses,
  setInputData,
  inputData,
  handleSubmitSearch,
  showErrorSearch,
  reserveAsClient,
  showAlerts,
}) => {
  return (
    <div className="AppointmentStyle">
      <h1>Reserva tu clase </h1>
      {/* para mostrar mensajes */}
      <div className={`m-4 ${showAlerts ? "" : "d-none"}`}>
        <div className="mostrar-alert">{showAlerts}</div>
      </div>

      <div className="container mt-5 ">
        <div className="search">
          <form className="form-inline" onSubmit={handleSubmitSearch}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Ingrese su búsqueda"
                value={inputData.search}
                onChange={(e) =>
                  setInputData({ ...inputData, search: e.target.value })
                }
              />
            </div>
            <div className=" mb-2">
              <input
                type="date"
                id="inputDate"
                className="input-date"
                value={inputData.searchDate}
                onChange={(e) =>
                  setInputData({ ...inputData, searchDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* por si hay un error en el form se muetre*/}
            <div className={`m-4 ${showErrorSearch ? "" : "d-none"}`}>
              <div className="d-flex justify-content-center align-items-center">
                {showErrorSearch}
              </div>
            </div>

            <button type="submit" className="btn btn-primary m-4">
              Buscar
            </button>
          </form>
        </div>
        <div className="card-container">
          {showClasses.length > 0 ? (
            showClasses.map((item, index) => (
              <div key={index} className="card">
                <span>Profesor: {item.usuario}</span>
                <br />
                <span>
                  Hora:{" "}
                  {new Date(item.date).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <br />
                <span>
                  Fecha: {new Date(item.date).toLocaleDateString("es-ES")}
                </span>
                <br />
                <span>Cupos disponibles: {item.capacity}</span>
                <br />
                <span>Actividad: {item.service}</span>
                <button
                  className="btn btn-primary m-4"
                  onClick={() => reserveAsClient(item._id)}
                >
                  AGENDAR
                </button>
              </div>
            ))
          ) : (
            <div className="no-data">
              <h2>No hay datos disponibles</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUserAppointment;
