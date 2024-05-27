import { useState } from "react";
import { updateToBD, urlFeedback, timeWaitAlert } from "../../GlobalVariables";
import React from "react";

const FeedbackEdit = ({
  feedback,
  onClose,
  onSave,
  setshowAlerts,
  selectComentariosBD,
}) => {
  const [comentario, setComentario] = useState(feedback.comentario || "");
  const [rating, setRating] = useState(feedback.rating || 5);

  const updateComentario = async (comentario) => {
    // parametors minimos segun el Modelo del backend
    const parametrosActualizar = {
      comentario: comentario.comentario,
      rating: comentario.rating,
      user: comentario.user._id,
    };
    const response = await updateToBD(
      urlFeedback,
      comentario._id,
      parametrosActualizar
    );
    selectComentariosBD();
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { ...feedback, comentario: comentario, rating: rating };
    await updateComentario(updatedUser);
    onSave();
    onClose();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="feedback-rating-stars-container">
        {[...Array(5)].map((_, i) => {
          const value = 5 - i; // Ajuste del valor para corregir el orden
          return (
            <React.Fragment key={"stars" + i}>
              <input
                value={value} // El valor del input, que va de 1 a 5
                name="rate"
                id={`stars${value}`}
                type="radio"
                onChange={(e) => setRating(e.target.value)}
                className="feedback-star-input"
              />
              <label htmlFor={`stars${value}`} className="feedback-star-label">
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

      <div className="form-group">
        <label>comentario</label>
        <input
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <button className="btn btn-primary m-3" type="submit">
          Guardar
        </button>
        <button className="btn btn-danger m-3" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FeedbackEdit;
