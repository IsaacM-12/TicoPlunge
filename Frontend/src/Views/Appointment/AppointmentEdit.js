import { useState } from "react";
import { updateToBD, urlClass, timeWaitAlert } from "../../GlobalVariables";
import React from "react";

const AppointmentEdit = ({
  Appointment,
  onClose,
  onSave,
  setshowAlerts,
  selectClassBD,
}) => {
  const [capacity, setCapacity] = useState(Appointment.capacity || "");

  const updateAppointment = async (Appointment) => {
    // parametors minimos segun el Modelo del backend
    const parametrosActualizar = {
      capacity: Appointment.capacity,
      date: Appointment.date,
      user: Appointment.user._id,
      service: Appointment.service._id,
    };
    const response = await updateToBD(
      urlClass,
      Appointment._id,
      parametrosActualizar
    );
    selectClassBD();
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAppointment = {
      ...Appointment,
      capacity: capacity,
    };
    await updateAppointment(updatedAppointment);
    onSave();
    onClose();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Capacidad</label>
        <input
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
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

export default AppointmentEdit;
