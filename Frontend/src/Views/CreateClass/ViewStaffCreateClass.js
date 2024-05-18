import React from "react";

const ViewStafCreateClass = ({
  inputData,
  showErroresForm,
  handleSubmit,
  setInputData,
}) => {
  const handleChange = (e, field) => {
    setInputData({
      ...inputData,
      [field]: e.target.value,
    });
  };

  return (
    <div className="CreateClass-CreateClassStyle">
      <div className="CreateClass-form-container">
        <h1 className="CreateClass-title">Crear Clase</h1>
        <div className="CreateClass-social-message">
          <div className="CreateClass-line"></div>
          <div className="CreateClass-message">Tus citas programadas</div>
          <div className="CreateClass-line"></div>
        </div>
        <form onSubmit={handleSubmit} className="CreateClass-form">
          <div className="CreateClass-input-group">
            <label htmlFor="inputActivity">*Actividad:</label>
            <select
              id="inputActivity"
              className="CreateClass-select"
              value={inputData.service}
              onChange={(e) => handleChange(e, "service")}
            >
              <option value="">Seleccione una opcion</option>
              <option value="box">Box</option>
              <option value="plunche">Plunche</option>
              <option value="baile">Baile</option>
            </select>
          </div>
          <div className="CreateClass-input-group">
            <label htmlFor="inputDate">*Fecha:</label>
            <input
              type="date"
              id="inputDate"
              value={inputData.date}
              onChange={(e) => handleChange(e, "date")}
              min={new Date().toISOString().split("T")[0]}
              className="CreateClass-input"
              required
            />
          </div>
          <div className="CreateClass-input-group">
            <label htmlFor="inputHour">*Hora:</label>
            <input
              type="time"
              id="inputHour"
              value={inputData.hour}
              onChange={(e) => handleChange(e, "hour")}
              className="CreateClass-input"
              required
            />
          </div>
          <div className="CreateClass-input-group">
            <label htmlFor="inputCapacity">*Cantidad de cupos:</label>
            <input
              type="number"
              id="inputCapacity"
              value={inputData.capacity}
              onChange={(e) => handleChange(e, "capacity")}
              min="1"
              max="500"
              required
            />
          </div>

          <div className="CreateClass-input-group">
            <label htmlFor="inputRepeatEvery">
              <hr />
              Opciones de abajo para más de 1 clase
              <hr />
              Repetir cada (minutos):
            </label>
            <input
              type="number"
              id="inputRepeatEvery"
              value={inputData.repeatEveryMinutes}
              onChange={(e) => handleChange(e, "repeatEveryMinutes")}
              className="CreateClass-input"
              min="1"
              max="999"
            />
          </div>
          <div className="CreateClass-input-group">
            <label htmlFor="inputRepeatFor">
              Repetir por (veces segun la cantidad de minutos anterior):
            </label>
            <input
              type="number"
              id="inputRepeatFor"
              value={inputData.repeatNTimes}
              onChange={(e) => handleChange(e, "repeatNTimes")}
              className="CreateClass-input"
              min="1"
              max="100"
            />
          </div>
          <div className="CreateClass-input-group">
            <label htmlFor="inputRepeatWeekly">
              Repetir cantidad todo lo anterior (semanas consecutivas):
            </label>
            <input
              type="number"
              id="inputRepeatWeekly"
              value={inputData.repeatWeekly}
              onChange={(e) => handleChange(e, "repeatWeekly")}
              className="CreateClass-input"
              min="1"
              max="52"
            />
          </div>

          {/* por si hay un error en el form se muestre*/}
          <div className={`m-3 ${showErroresForm ? "" : "d-none"}`}>
            {showErroresForm}
          </div>

          <button type="submit" className="CreateClass-buttom mt-4">
            Crear Clase
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewStafCreateClass;
