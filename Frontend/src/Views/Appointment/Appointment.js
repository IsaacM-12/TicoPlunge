import { useEffect, useState } from "react";
import "./Appointment.css";
import ViewAdminAppointment from "./ViewAdminAppointment";
import ViewUserAppointment from "./ViewUserAppointment";
import {
  createToBD,
  selectFilterToBD,
  urlReserveClass,
  selectUserByToken,
  urlClass,
  NotFound,
  ErrorAlert,
  timeWaitAlert,
} from "../../GlobalVariables";

const Appointment = () => {
  // -------------------------------------------------------------
  // Se usara para optener los datos de la persona activa
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    search: "",
    searchDate: "",
  });

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showClasses, setshowClasses] = useState("");
  const [showErrorSearch, setshowErrorSearch] = useState("");
  const [showAlerts, setshowAlerts] = useState("");

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
    selectClassBD();
  }, []);

  /**
   * Reserva una clase como cliente.
   * @param {string} idClass - El ID de la clase que se va a reservar.
   */
  const reserveAsClient = async (idClass) => {
    const confirmacion = window.confirm("¿Está seguro que desea de reservar?");

    if (!confirmacion) {
      setshowAlerts(<ErrorAlert message={"Accion Cancelada"} />);
      setTimeout(() => {
        setshowAlerts("");
      }, timeWaitAlert);
      return;
    }

    const userId = usuarioActivo._id;
    const classId = idClass;
    const response = await createToBD(urlReserveClass, { userId, classId });
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
  };

  const reserveAsAdmin = async () => {};

  /**
   * Función para seleccionar clases de la base de datos con fecha mayor a la actual.
   * Se utiliza para obtener las clases disponibles para reserva.
   */
  const selectClassBD = async () => {
    const fechaActual = new Date(); // Obtiene la fecha actual
    let filtro = {
      date: { $gt: fechaActual }, // Filtra las clases con fecha mayor a la fecha actual
    };

    const response = await selectFilterToBD(urlClass, filtro);
    setshowClasses(response);
  };

  /**
   * Función para buscar registros en la base de datos utilizando un filtro flexible.
   * Se busca por coincidencias parciales en los campos 'usuario', 'hour', 'service' y 'capacity',
   * y se filtran las clases con fecha mayor a la actual.
   */
  const searchByAnyBD = async () => {
    const fechaActual = new Date();
    // filtro al buscar
    let filtro = {
      $and: [
        {
          $or: [
            { usuario: { $regex: inputData.search, $options: "i" } },
            { hour: { $regex: inputData.search, $options: "i" } },
            { service: { $regex: inputData.search, $options: "i" } },
            {
              $expr: {
                $cond: {
                  if: { $isNumber: "$capacity" }, // Verificar si el campo capacity es un número
                  then: { $eq: ["$capacity", parseInt(inputData.search)] },
                  else: { $eq: ["", ""] }, // Si es un string, devuelve un filtro vacío
                },
              },
            },
          ],
        },
        { date: { $gt: fechaActual } }, // Filtra las clases con fecha mayor a la fecha actual
      ],
    };

    // Verificar si se ha seleccionado una fecha
    if (inputData.searchDate) {
      filtro.$and.push({
        date: { $regex: inputData.searchDate, $options: "i" },
      });
    }
    const response = await selectFilterToBD(urlClass, filtro);
    setshowClasses(response);
  };

  /**
   * Función para manejar el evento de envío del formulario de búsqueda.
   * Realiza la búsqueda en la base de datos según los criterios especificados en los campos de búsqueda.
   * Muestra un mensaje de error si no se proporciona ningún criterio de búsqueda.
   * @param {Event} event - Objeto de evento que representa el envío del formulario.
   */
  const handleSubmitSearch = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe vacio
    if (!inputData.search && !inputData.searchDate) {
      setshowErrorSearch(
        <ErrorAlert
          message={"Bebe llenar al menos un campo para poder buscar"}
        />
      );
      setTimeout(() => {
        setshowErrorSearch("");
      }, timeWaitAlert);
      return;
    }
    setshowErrorSearch("");

    await searchByAnyBD();
  };

  return (
    <>
      {usuarioActivo.role === "Administrator" ||
        (usuarioActivo === "Staff" && (
          <ViewAdminAppointment
            showClasses={showClasses}
            reserve={reserveAsAdmin}
          />
        ))}

      {usuarioActivo.role === "Staff" && (
        <ViewUserAppointment
          showClasses={showClasses}
          setInputData={setInputData}
          inputData={inputData}
          handleSubmitSearch={handleSubmitSearch}
          showErrorSearch={showErrorSearch}
          reserveAsClient={reserveAsClient}
          showAlerts={showAlerts}
        />
      )}

      {usuarioActivo.role !== "Administrator" &&
        usuarioActivo.role !== "Client" &&
        usuarioActivo.role !== "Staff" && (
          <NotFound mensaje="Por favor, inicia sesión para continuar" />
        )}
    </>
  );
};
export default Appointment;
