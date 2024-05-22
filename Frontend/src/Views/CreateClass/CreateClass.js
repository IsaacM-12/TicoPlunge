import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";
import moment from "moment-timezone";

import {
  selectUserByToken,
  selectFilterToBD,
  selectToBD,
  urlService,
  urlClass,
  NotFound,
  SuccessAlert,
  ErrorAlert,
  timeWaitAlert,
} from "../../GlobalVariables";

const CreateClass = () => {
  // -------------------------------------------------------------
  // Se usara para optener los datos de la persona activa
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("Staff");

  const [existingServices, setExistingServices] = useState([]);

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showErroresForm, setshowErroresForm] = useState("");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    service: "",
    date: "",
    hour: "",
    repeatEveryMinutes: 30,
    repeatNTimes: 1,
    repeatWeekly: 1,
    capacity: "",
  });

  /**
   * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
   */
  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
  };

  /**
   * Efecto secundario que se ejecuta al montar el componente (cargar la pagina)
   * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
   */
  useEffect(() => {
    // Llamar a la función para obtener y establecer el usuario activo
    GetUserActive();
    fetchExistingServices();
  }, []);

  /**
   * Crea una nueva clase en la base de datos.
   * @param {string} date - La fecha de la clase.
   * @param {string} hour - La hora de la clase.
   * @param {string} usuario - El usuario de la clase.
   * @param {string} service - El servicio de la clase.
   * @param {number} capacity - La capacidad de la clase.
   * @returns {boolean} - True si se crea la clase con éxito, false si hay un error o si el usuario cancela.
   */

  const createClassBD = async (date, service, capacity) => {
    // Convertir la fecha al formato ISO manteniendo la zona horaria de Costa Rica
    const dateTime = moment(date).tz("America/Costa_Rica");
    const dateFormatted = dateTime.format(); // Esto garantiza el formato ISO con la zona horaria correcta

    const newClass = {
      date: dateFormatted, // Fecha en formato ISO con zona horaria
      user: usuarioActivo._id,
      service: service,
      capacity: capacity,
    };

    // Obtener la fecha y hora en un formato legible para confirmar
    const fecha = dateTime.format("dddd, MMMM Do YYYY"); // Formato legible para la fecha
    const hora = dateTime.format("HH:mm"); // Formato de hora legible

    // Construir el mensaje de confirmación
    const confirmationMessage = `¿Estás seguro de que deseas crear la clase para el ${fecha} a las ${hora}?`;
    const confirmed = window.confirm(confirmationMessage);

    if (!confirmed) {
      return false;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(urlClass, newClass, config);
      return true;
    } catch (error) {
      console.error("Error al insertar documento en MongoDB:", error);
      return false;
    }
  };

  // -------------------------------------------------------------
  // Crea n cantidad de Appointments segun el form
  // -------------------------------------------------------------
  const createAppointments = async () => {
    const initialDate = new Date(`${inputData.date}T${inputData.hour}:00`);
    const newAppointments = [];

    // Crear citas cada 'repeatEveryMinutes' minutos, repetido 'repeatNTimes'
    for (let i = 0; i < inputData.repeatNTimes; i++) {
      // Calcula la nueva fecha con el incremento de minutos
      const newDate = new Date(
        initialDate.getTime() + i * inputData.repeatEveryMinutes * 60000
      );

      // Repetir la cita semanalmente según 'repeatWeekly'
      for (let j = 0; j < inputData.repeatWeekly; j++) {
        // Calcula el tiempo para la semana siguiente
        const finalDate = new Date(
          newDate.getTime() + j * 7 * 24 * 60 * 60 * 1000
        );

        newAppointments.push({
          date: finalDate.toISOString(), // Almacena la fecha y la hora completas en formato ISO
        });
      }
    }

    let allCreated = true;
    for (const appointment of newAppointments) {
      const success = await createClassBD(
        appointment.date,
        inputData.service,
        inputData.capacity
      );
      if (!success) {
        allCreated = false;
        alert(
          `No se pudo crear la clase programada para el ${appointment.date} a las ${appointment.hour}. Puede que ya exista una clase en ese horario o haya ocurrido un error en el proceso de creación.`
        );
      }
    }

    // Manejo de la confirmación o error en la creación de las citas
    if (allCreated) {
      setshowErroresForm(
        <SuccessAlert message="¡Todas las clases fueron creadas exitosamente!" />
      );
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
    } else {
      setshowErroresForm(
        <ErrorAlert message="No se pudieron crear algunas clases. Es posible que ya existieran o que haya ocurrido un error durante el proceso de creación." />
      );
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
    }
  };

  const fetchExistingServices = async () => {
    try {
      const ServicesData = await selectToBD(urlService);
      if (ServicesData.length > 0) {
        setExistingServices(
          ServicesData.map((service) => ({
            ...service,
            encargados: service.encargados,
          }))
        );
      } else {
        setExistingServices([]);
      }
    } catch (error) {
      console.error("Error al obtener servicios existentes:", error);
    }
  };

  /**
   * Maneja el envío del formulario para crear una nueva cita.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !inputData.capacity ||
      !inputData.date ||
      !inputData.hour ||
      !inputData.service
    ) {
      setshowErroresForm(
        <ErrorAlert message="Debe llenar al menos los que tienen un simbolo (*)" />
      );
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
      return;
    }

    const confirmacion = window.confirm(
      "¿Está seguro de iniciar la creación de las clases?"
    );

    if (confirmacion) {
      createAppointments();
    } else {
      setshowErroresForm(<ErrorAlert message="Acción cancelada." />);
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
    }
  };

  const handleChange = (e, field) => {
    setInputData({
      ...inputData,
      [field]: e.target.value,
    });
  };

  return (
    <div className="CreateClass-CreateClassStyle">
      {/* mostrar solo a los de Administrator y Staff*/}
      <span
        className={
          usuarioActivo.role === "Administrator" ||
          usuarioActivo.role === "Staff"
            ? ""
            : "d-none"
        }
      >
        <div>
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
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {existingServices.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="CreateClass-input-group">
                <label htmlFor="inputDate">*Fecha:</label>
                <input
                  type="date"
                  id="inputDate"
                  value={inputData.date}
                  onChange={(e) => handleChange(e, "date")}
                  min={moment().tz("America/Costa_Rica").format("YYYY-MM-DD")}
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
      </span>

      {/* mostrar mensaje si no ha iniciado sesion*/}
      <div className={!usuarioActivo.role ? "" : "d-none"}>
        <NotFound mensaje="Por favor, inicia sesión para continuar" />
      </div>
    </div>
  );
};

export default CreateClass;
