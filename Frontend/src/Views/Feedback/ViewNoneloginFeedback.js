import React from "react";

const ViewNoneloginFeedback = ({
  handleSubmit,
  setInputData,
  inputData,
  showErroresForm,
  comentarios,
  deleteComentario,
  renderStars,
  showAlerts,
  usuarioActivo,
  editComentario,
}) => {
  return (
    <div className="FeedbackStyle">
      {/* para mostrar mensajes */}
      <div className={` ${showAlerts ? "" : "d-none"}`}>
        <div className="mostrar-alert">{showAlerts}</div>
      </div>

      {/* para editar */}
      {/* <div className={` ${showAlerts ? "" : "d-none"}`}>
        <div>{showAlerts}</div>
      </div> */}

      <div className="feedback-rating-card">
        <form onSubmit={handleSubmit}>
          <div className="feedback-text-wrapper">
            <h1 className="feedback-text-title">Deja tu comentario</h1>
            <p className="feedback-text-subtitle">
              Nos gustaría saber tu opinión
            </p>
          </div>

          <div className="feedback-rating-stars-container">
            {[...Array(5)].map((_, i) => {
              const value = 5 - i; // Ajuste del valor para corregir el orden
              return (
                <React.Fragment key={i}>
                  <input
                    value={value} // El valor del input, que va de 1 a 5
                    name="rate"
                    id={`star${value}`}
                    type="radio"
                    onChange={() =>
                      setInputData({ ...inputData, rating: `${value}` })
                    }
                  />
                  <label
                    htmlFor={`star${value}`}
                    className="feedback-star-label"
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        pathLength="360"
                      ></path>
                    </svg>
                  </label>
                </React.Fragment>
              );
            })}
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

          {/* por si hay un error en el form se muestre*/}
          <div className={` ${showErroresForm ? "" : "d-none"}`}>
            <div className="d-flex justify-content-center align-items-center">
              {showErroresForm}
            </div>
          </div>

          <div className="input-group mt-3">
            <button className="btn btn-primary" type="submit">
              Crear Comentario
            </button>
          </div>
        </form>
        <div className="m-4">
          <a href="/PrivateFeedback">Dejar retroalimentación privada</a>
        </div>
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
                <span>{renderStars(parseInt(item.rating))}</span>
                <br></br>
                <span className="feedback-notibody">
                  Comentario: {item.comentario}
                </span>

                {/* si fue el que lo creo  */}
                {item.usuario === usuarioActivo.firstName && (
                  <button
                    className="btn btn-primary m-4"
                    onClick={() => editComentario(item._id)}
                  >
                    Editar
                  </button>
                )}

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

export default ViewNoneloginFeedback;
