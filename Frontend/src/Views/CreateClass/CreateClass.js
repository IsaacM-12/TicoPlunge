import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";
import {
  selectUserByToken,
  selectFilterToBD,
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
    const newClass = {
      date: date,
      usuario: usuarioActivo.firstName,
      service: service,
      capacity: capacity,
    };

    const dateObject = new Date(date);

    // Obtener la fecha en formato de cadena
    const fecha = dateObject.toDateString();

    // Obtener la hora en formato de cadena
    const hora = dateObject.toTimeString().split(" ")[0]; // Se usa split para eliminar la parte de la zona horaria

    // Construir el mensaje de confirmación
    const confirmationMessage = `¿Estás seguro de que deseas crear la clase para ${fecha} a las ${hora}?`;
    const confirmed = window.confirm(confirmationMessage);

    if (!confirmed) {
      // Si el usuario cancela, no hacemos nada y retornamos false
      return false;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(urlClass, newClass, config);
      return true; // Retorna true si se crea con éxito
    } catch (error) {
      console.error("Error al insertar documento en MongoDB:", error);
      return false; // Retorna false si hay un error
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
      <div
        // className={
        //   usuarioActivo.role === "Administrator" ||
        //   usuarioActivo.role === "Staff"
        //     ? ""
        //     : "d-none"
        // }
      >
        <div >
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
      </div>

      {/* mostrar mensaje si no ha iniciado sesion*/}
      <div
        className={
          !usuarioActivo.role 
            ? ""
            : "d-none"
        }
      >
        <NotFound mensaje="Por favor, inicia sesión para continuar" />
      </div>
    </div>
  );
};

export default CreateClass;
