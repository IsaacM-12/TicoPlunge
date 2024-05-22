import { useEffect, useState } from "react";
import "./Appointment.css";
import { Modal } from "react-bootstrap";
import AppointmentEdit from "./AppointmentEdit";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import moment from "moment-timezone";
import axios from "axios";

import {
  createToBD,
  selectFilterToBD,
  urlReserveClassAsClient,
  urlReserveClassAsAdmin,
  deleteByIDToBD,
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
    const response = await createToBD(urlReserveClassAsClient, {
      userId,
      classId,
    });

    await selectClassBD();

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
    // Fecha y hora actual en zona horaria de Costa Rica
    const fechaActual = moment().tz("America/Costa_Rica").toDate(); // Obtener la fecha actual en la zona horaria de Costa Rica
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
    const fechaActual = moment().tz("America/Costa_Rica").toDate(); // Obtener la fecha actual en la zona horaria de Costa Rica

    let filtro = {
      $and: [{ date: { $gt: fechaActual } }],
    };

    // Verificar si se ha seleccionado una fecha específica de búsqueda
    if (inputData.searchDate) {
      const fechaInicio = moment
        .tz(inputData.searchDate, "YYYY-MM-DD", "America/Costa_Rica")
        .startOf("day")
        .toDate(); // Fecha de inicio del día seleccionado
      const fechaFin = moment
        .tz(inputData.searchDate, "YYYY-MM-DD", "America/Costa_Rica")
        .endOf("day")
        .toDate(); // Fecha de fin del día seleccionado

      console.log(fechaInicio);
      console.log(fechaFin);
      console.log(fechaActual);
      filtro.$and.push({
        date: {
          $gte: fechaInicio,
          $lte: fechaFin,
        },
      });
    }

    try {
      const response = await axios.get(urlClass, {
        params: { filtro: JSON.stringify(filtro) },
      });
      setshowClasses(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  /**
   * Función asincrónica para eliminar una clase de la base de datos.
   * @param {string} id - El ID de la clase que se va a eliminar.
   */
  const deleteClassBD = async (id) => {
    // Eliminar el comentario de la base de datos por su ID
    const response = await deleteByIDToBD(urlClass, id);
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
    // Si la eliminación tiene éxito, seleccionar los comentarios actualizados
    await selectClassBD();
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
      selectClassBD();
      return;
    }
    setshowErrorSearch("");

    await searchByAnyBD();
  };

  // -------------------------------------------------------------
  // parametros para el edit
  // -------------------------------------------------------------

  const [appointmentActual, setAppointmentActual] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mostrarEditAppointment, setMostrarEditAppointment] = useState(false);

  /**
   * Función para manejar el cierre del modal de edición de Appointment.
   * Limpia los estados relacionados con la edición y oculta el modal.
   */
  const handleModalClose = () => {
    setMostrarEditAppointment(false);
    setAppointmentActual(false);
    setShowModal(false);
  };

  /**
   * Función para manejar el clic en el botón de editar un Appointment.
   * Establece el estado para mostrar el modal de edición y guarda el Appointment actual a editar.
   * @param {Object} item - El Appointment a editar.
   */
  const OnClickEdit = async (item) => {
    setMostrarEditAppointment(true);
    setAppointmentActual(item);
    setShowModal(true);
  };

  return (
    <div>
      {/* mostrar solo a los registrados*/}
      <span className={usuarioActivo.role ? "" : "d-none"}>
        <div className="AppointmentStyle">
          <h1>Reserva tu clase </h1>
          {/* para mostrar mensajes */}
          <div className={`m-4 ${showAlerts ? "" : "d-none"}`}>
            <div className="mostrar-alert">{showAlerts}</div>
          </div>

          <div className="container mt-5">
            <div className="search">
              <form className="form-inline" onSubmit={handleSubmitSearch}>
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="searchInputReserveClass"
                    placeholder="Ingrese su búsqueda"
                    value={inputData.search}
                    onChange={(e) =>
                      setInputData({ ...inputData, search: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="date"
                    id="inputDate"
                    className="Appointment-input-date"
                    value={inputData.searchDate}
                    onChange={(e) =>
                      setInputData({ ...inputData, searchDate: e.target.value })
                    }
                    min={moment().tz("America/Costa_Rica").format("YYYY-MM-DD")}
                  />
                </div>

                {/* por si hay un error en el form se muetre */}
                <div className={`m-4 ${showErrorSearch ? "" : "d-none"}`}>
                  <div className="d-flex justify-content-center align-items-center">
                    {showErrorSearch}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary m-4">
                  Buscar
                </button>
              </form>
            </div>
            <div className="Appointment-card-container">
              {showClasses.length > 0 ? (
                showClasses.map((item, index) => (
                  <div key={index} className="Appointment-card">
                    <p>Profesor: {item.user.firstName}</p>
                    <p>
                      Hora:{" "}
                      {moment(item.date)
                        .tz("America/Costa_Rica")
                        .format("HH:mm")}
                    </p>

                    <p>Fecha: {moment(item.date).format("DD/MM/YYYY")}</p>

                    <p>FechaENBD: {item.date}</p>

                    <p>Cupos disponibles: {item.capacity}</p>
                    <p>Actividad: {item.service.name}</p>
                    <button
                      className="btn btn-primary m-2"
                      onClick={() => reserveAsClient(item._id)}
                    >
                      INSCRIBIRSE
                    </button>

                    <span
                      className={
                        usuarioActivo.role === "Administrator" ||
                        (usuarioActivo.role === "Staff" &&
                          usuarioActivo._id === item.user._id)
                          ? ""
                          : "d-none"
                      }
                    >
                      <button
                        className="btn btn-success m-2"
                        onClick={() => OnClickEdit(item)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => deleteClassBD(item._id)}
                      >
                        Borrar
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div className="Appointment-no-data">
                  <h2>No hay datos disponibles</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </span>

      {/* mostrar mensaje si no ha iniciado sesion*/}
      <div className={!usuarioActivo.role ? "" : "d-none"}>
        <NotFound mensaje="Por favor, inicia sesión para continuar" />
      </div>

      {/* Ventana para editar  */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mostrarEditAppointment && (
            <AppointmentEdit
              Appointment={appointmentActual}
              onClose={handleModalClose}
              onSave={OnClickEdit}
              setshowAlerts={setshowAlerts}
              selectClassBD={selectClassBD}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Appointment;
