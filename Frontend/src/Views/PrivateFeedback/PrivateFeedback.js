import { useEffect, useState } from "react";
import "./PrivateFeedback.css";
import ViewAdminPrivateFeedback from "./ViewAdminPrivateFeedback";
import ViewUserPrivateFeedback from "./ViewUserPrivateFeedback";
import ViewNoneloginPrivateFeedback from "./ViewNoneloginPrivateFeedback";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlPrivateFeedback,
  selectUserByToken,
  ErrorAlert,
  timeWaitAlert,
} from "../../GlobalVariables";

const PrivateFeedback = () => {
  // -------------------------------------------------------------
  // Se usara para optener los datos de la persona activa
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState("");

  // -------------------------------------------------------------
  // Estas se mostraran en el HTML
  // -------------------------------------------------------------
  const [showComentarios, setshowComentarios] = useState("");
  const [showErroresForm, setshowErroresForm] = useState("");
  const [showAlerts, setshowAlerts] = useState("");

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------
  const [inputData, setInputData] = useState({
    comentario: "",
  });

  /**
   * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
   */
  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
  };

  /**
   * Efecto secundario que se ejecuta al montar el componente para obtener el usuario activo y seleccionar los comentarios de la base de datos.
   * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
   */
  useEffect(() => {
    // Llamar a la función para obtener y establecer el usuario activo
    GetUserActive();

    // Llamar a la función para seleccionar los comentarios de la base de datos
    selectComentariosBD();
  }, []);

  /**
   * Función asincrónica para crear un nuevo comentario en la base de datos.
   */
  const createComentariosBD = async () => {
    const newComentario = {
      comentario: inputData.comentario,
      usuario: usuarioActivo.firstName,
    };

    // Manda a crear el comentario a la base de datos
    const response = await createToBD(urlPrivateFeedback, newComentario);

    await selectComentariosBD();

    // Deja un mensaje de exito o error al crear
    setshowErroresForm(response);
    setTimeout(() => {
      setshowErroresForm("");
    }, timeWaitAlert);
  };

  /**
   * Función asincrónica para seleccionar comentarios de la base de datos.
   */
  const selectComentariosBD = async () => {
    const response = await selectToBD(urlPrivateFeedback);
    setshowComentarios(response);
  };

  /**
   * Función asincrónica para eliminar un comentario de la base de datos.
   * @param {string} id - El ID del comentario que se va a eliminar.
   */
  const deleteComentariosBD = async (id) => {
    // Eliminar el comentario de la base de datos por su ID
    const response = await deleteByIDToBD(urlPrivateFeedback, id);
    setshowAlerts(response);
    setTimeout(() => {
      setshowAlerts("");
    }, timeWaitAlert);
    // Si la eliminación tiene éxito, seleccionar los comentarios actualizados
    await selectComentariosBD();
  };

  /**
   * Función para manejar la presentación de datos del formulario y llamar a la función para crear un nuevo comentario.
   * @param {Event} event - El evento del formulario.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si se proporcionaron datos para la calificación y el comentario
    if (!inputData.comentario) {
      // Mostrar un mensaje de error si no se proporcionaron los datos requeridos
      setshowErroresForm(<ErrorAlert message="Debe llenar el comentario" />);
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
      return;
    }

    // Limpiar el mensaje de error
    setshowErroresForm("");
    // Llamar a la función para crear un nuevo comentario
    createComentariosBD();
  };

  return (
    <>
      {usuarioActivo.role === "Client no" && <ViewUserPrivateFeedback />}

      {usuarioActivo.role === "Administrator no" ||
        (usuarioActivo.role === "Staff no" && <ViewAdminPrivateFeedback />)}

      {usuarioActivo.role !== "Administrator no" &&
        usuarioActivo.role !== "Client no" &&
        usuarioActivo.role !== "Staff no" && (
          <ViewNoneloginPrivateFeedback
            handleSubmit={handleSubmit}
            setInputData={setInputData}
            inputData={inputData}
            showErroresForm={showErroresForm}
            comentarios={showComentarios}
            deleteComentario={deleteComentariosBD}
            showAlerts={showAlerts}
          />
        )}
    </>
  );
};
export default PrivateFeedback;
