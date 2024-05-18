import React from "react";

import { redirectPrivateFeedback } from "../../GlobalVariables";

const ViewNoneloginPrivateFeedback = ({
  handleSubmit,
  setInputData,
  inputData,
  showErroresForm,
  comentarios,
  deleteComentario,
  showAlerts,
}) => {
  return (
    <div className="PrivateFeedbackStyle">
      {/* para mostrar mensajes */}
      <div className={` ${showAlerts ? "" : "d-none"}`}>
        <div className="mostrar-alert">{showAlerts}</div>
      </div>

      <div className="PrivateFeedback-rating-card">
        <form onSubmit={handleSubmit}>
          <div className="PrivateFeedback-text-wrapper">
            <p className="PrivateFeedback-text-title">
              Deja tu comentario de forma anónima
            </p>
            <p className="PrivateFeedback-text-subtitle">
              Solo lo verán los trabajadores, no estará de forma pública
            </p>
          </div>

          <div>
            <textarea
              type="text"
              id="inputComentario"
              className="m-4"
              value={inputData.comentario}
              onChange={(e) =>
                setInputData({ ...inputData, comentario: e.target.value })
              }
              required
            />
          </div>

          {/* Por si hay un error en el formulario */}
          <div className={` ${showErroresForm ? "" : "d-none"}`}>
            <div className="d-flex justify-content-center align-items-center">
              {showErroresForm}
            </div>
          </div>

          <div className="input-group mt-3">
            <button className="btn btn-success" type="submit">
              Crear Comentario
            </button>
          </div>
        </form>
      </div>

      <div className="container mt-4 ">
        <div>
          {comentarios.length > 0 ? (
            comentarios.map((item) => (
              <div key={item._id} className="feedback-Box m-4">
                <span className="feedback-notititle">
                  {item.usuario}
                  {new Date(item.creationDate).toLocaleDateString()}
                </span>
                <br></br>
                <span className="feedback-notibody">
                  Comentario: {item.comentario}
                </span>
                <button
                  className="btn btn-danger m-4"
                  onClick={() => deleteComentario(item._id)}
                >
                  Borrar
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

export default ViewNoneloginPrivateFeedback;
