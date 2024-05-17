import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateClass.css";
import ViewStafCreateClass from "./ViewStaffCreateClass";
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

  const createClassBD = async (date, hour, usuario, service, capacity) => {
    const newClass = {
      date: date,
      hour: hour,
      usuario: usuario,
      service: service,
      capacity: capacity,
    };

    const confirmationMessage = `¿Estás seguro de que deseas crear la clase para ${date} a las ${hour}?`;
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

        const formattedDate = finalDate.toISOString().split("T")[0];
        const formattedHour = finalDate
          .toTimeString()
          .split(" ")[0]
          .substring(0, 8); // Extrae correctamente la hora

        newAppointments.push({
          date: formattedDate,
          hour: formattedHour,
        });
      }
    }

    let allCreated = true;
    for (const appointment of newAppointments) {
      // console.log("vamos");

      const success = await createClassBD(
        appointment.date,
        appointment.hour,
        usuarioActivo,
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

  return (
    <>
      {(usuarioActivo.role === "Staff no" ||
        usuarioActivo.role === "Administrator no") && (
        <ViewStafCreateClass
          inputData={inputData}
          showErroresForm={showErroresForm}
          handleSubmit={handleSubmit}
          setInputData={setInputData}
        />
      )}

      {usuarioActivo.role !== "Administrator no" &&
        usuarioActivo.role !== "Staff no" && (
          // <NotFound mensaje="Por favor, inicia sesión para continuar" />
          <ViewStafCreateClass
            inputData={inputData}
            showErroresForm={showErroresForm}
            handleSubmit={handleSubmit}
            setInputData={setInputData}
          />
        )}
    </>
  );
};

export default CreateClass;
