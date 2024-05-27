import { useState } from "react";
import axios from "axios";
import {
  ErrorAlert,
  SuccessAlert,
  urlUsers,
  timeWaitAlert,
} from "../../GlobalVariables";

const UserPasswordEdit = ({ user, onClose, onSave, setshowAlerts }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(user);
    const updatedUser = { ...user, password };
    await updateUserPassword(updatedUser);
    onSave();
    onClose();
  };

  const updateToDB = async (serviceUrl, infoToSave) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(infoToSave);

      // Send a PUT request to the service URL with the provided data
      const response = await axios.put(serviceUrl, infoToSave, config);

      //----------------------------------------------------------------------------------------------
      // borrar al terminar el desarrollo
      console.log("log del updatetoDB cuando se hizo con exito ", response);
      //----------------------------------------------------------------------------------------------

      const message = (
        <SuccessAlert
          message={response.data.message || "Se ha actualizado correctamente"}
        />
      );

      // Show success message
      return message;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Si el error proviene del servidor y contiene un mensaje de error
        console.error("Error al insertar documento en MongoDB:", error);
        const errorMessage = error.response.data.error;
        // Aquí puedes usar el mensaje de error para mostrarlo en tu aplicación
        console.error("Mensaje de error:", errorMessage);
        const message = <ErrorAlert message={errorMessage} />;
        return message;
      } else {
        // Para errores no relacionados con el servidor, usa el mensaje de error predeterminado
        const errorMessage = error.message || "Error desconocido";
        console.error("Error desconocido:", errorMessage);
        console.error("Mensaje de error:", errorMessage);
        const message = <ErrorAlert message={errorMessage} />;
        return message;
      }
    }
  };

  const updateUserPassword = async (user) => {
    const response = await updateToDB(urlUsers, user);
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nuevo Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onMouseDown={() => setValidation(true)}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        {password.length === 0 && validation && (
          <span className="text-danger">Enter the new password</span>
        )}
      </div>
      <div className="form-group">
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onMouseDown={() => setValidation(true)}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
        />
        {confirmPassword.length === 0 && validation && (
          <span className="text-danger">Confirm the new password</span>
        )}
        {error && <span className="text-danger">{error}</span>}
      </div>

      <div className="form-group">
        <button className="btn btn-success m-3" type="submit">
          Actualizar Contraseña
        </button>
        <button className="btn btn-danger m-3" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UserPasswordEdit;
