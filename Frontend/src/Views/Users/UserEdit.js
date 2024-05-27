import { useState } from "react";
import axios from "axios";
import {
  ErrorAlert,
  SuccessAlert,
  urlUsers,
  timeWaitAlert,
} from "../../GlobalVariables";

const UserEdit = ({ user, onClose, onSave, setshowAlerts }) => {
  const [name, setName] = useState(user.firstName || "");
  const [lastname, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "");
  const [validation, setValidation] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      firstName: name,
      lastName: lastname,
      email,
      role,
    };
    await updateUser(updatedUser);
    onSave();
    onClose();
  };

  const updateUser = async (user) => {
    console.log(user);
    const response = await updateToDB(urlUsers, user);
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          required
          value={name}
          onMouseDown={(e) => setValidation(true)}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
        {name.length === 0 && validation && (
          <span className="text-danger">Enter the name</span>
        )}
      </div>
      <div className="form-group">
        <label>Apellido</label>
        <input
          required
          value={lastname}
          onMouseDown={(e) => setValidation(true)}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
        />
        {name.length === 0 && validation && (
          <span className="text-danger">Enter the Lastname</span>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
          required
        >
          <option value="" disabled selected hidden>
            Selecciona un rol
          </option>
          <option value="Administrator">Administrator</option>
          <option value="Staff">Staff</option>
          <option value="Client">Client</option>
        </select>
      </div>

      <div className="form-group">
        <button className="btn btn-success m-3" type="submit">
          Guardar
        </button>
        <button className="btn btn-danger m-3" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UserEdit;
