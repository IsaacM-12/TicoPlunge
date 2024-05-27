// Import React and other necessary libraries
import { useEffect, useState } from "react";
import {
  selectUserByToken,
  NotFound,
  selectFilterToBD,
  urlMetadata,
  urlPlanRequest,
  updateToBD,
  selectToBD,
  createToBD,
} from "../../GlobalVariables";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  // -------------------------------------------------------------
  // Se usara para optener los datos de la persona activa
  // -------------------------------------------------------------
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [activeTab, setActiveTab] = useState("about"); // Estado para manejar la pestaña activa
  const [editMode, setEditMode] = useState(false);
  const [metadata, setMetadata] = useState({});
  const [existMetadata, setExistMetadata] = useState(false);

  // -------------------------------------------------------------
  // Seran input
  // -------------------------------------------------------------

  /**
   * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
   */
  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
    return user; // Devuelve el usuario obtenido
  };

  const GetMetadata = async (user) => {
    try {
      const updatedUrl = urlMetadata + "/" + user._id;
      const metadata = await axios.get(updatedUrl);
      setMetadata(metadata.data);
      setExistMetadata(true);
    } catch (error) {
      setExistMetadata(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    metadata.user = usuarioActivo._id;
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const handleEditMode = () => setEditMode(!editMode);

  const handleSave = async () => {
    let response = null;
    if (!existMetadata) {
      response = await createToBD(urlMetadata, metadata);
    } else {
      response = await updateToBD(urlMetadata, usuarioActivo._id, metadata);
    }
    if (response) {
      setEditMode(false);
    } else {
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  /**
   * Efecto secundario que se ejecuta al montar el componente (cargar la pagina)
   * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
   */
  useEffect(() => {
    // Llamar a la función para obtener y establecer el usuario activo
    GetUserActive().then((user) => {
      if (user && user._id) GetMetadata(user);
    });
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Suma un día a la fecha
    return date.toLocaleDateString("en-GB"); // Devuelve la fecha en formato dd-mm-aaaa
  };

  if (!usuarioActivo) {
    return <NotFound mensaje="Por favor, inicia sesión o crea tu cuenta." />;
  }

  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Image.png"
                alt="Foto de perfil no definida"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5 style={{ marginBottom: "30px" }}>
                {usuarioActivo.firstName} {usuarioActivo.lastName}
              </h5>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "about" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("about")}
                  >
                    Acerca de ti
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "plans" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("plans")}
                  >
                    Planes
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            {editMode ? (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={handleSave}
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={handleEditMode}
              >
                Editar Perfil
              </button>
            )}
            {editMode ? (
              <div>
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleEditMode}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {usuarioActivo.role === "Client" ? (
              <div className="profile-work">
                <p>Algunas funciones</p>
                <a href="HirePlan">Contratar un plan</a>
                <br />
                <a href="Feedback">Dejanos tu comentario</a>
                <br />
              </div>
            ) : usuarioActivo.role === "Administrator" ? (
              <div className="profile-work">
                <p>Algunas funciones</p>
                <a href="CreateService">Asignarte un servicio</a>
                <br />
                <a href="CreateClass">Crear una clase</a>
                <br />
                <a href="Feedback">Revisar comentarios</a>
                <br />
              </div>
            ) : (
              <div className="profile-work">
                <p>Algunas funciones</p>
                <a href="Requests">Revisar solicitudes</a>
                <br />
                <a href="Feedback">Revisar comentarios</a>
                <br />
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              {activeTab === "about" && (
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Id de Usuario</label>
                    </div>
                    <div className="col-md-6">
                      <p>{usuarioActivo._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Nombre Completo</label>
                    </div>
                    <div className="col-md-6">
                      <p>
                        {usuarioActivo.firstName} {usuarioActivo.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Correo Electrónico</label>
                    </div>
                    <div className="col-md-6">
                      <p>{usuarioActivo.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Número Telefónico</label>
                    </div>
                    <div className="col-md-6">
                      {editMode ? (
                        <input
                          className="profile-input"
                          type="text"
                          value={metadata.phone}
                          onChange={handleChange}
                          name="phone"
                        />
                      ) : (
                        <p>{metadata.phone || "Teléfono no definido"}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Altura (cm)</label>
                    </div>
                    <div className="col-md-6">
                      {editMode ? (
                        <input
                          className="profile-input"
                          type="text"
                          value={metadata.height}
                          onChange={handleChange}
                          name="height"
                        />
                      ) : (
                        <p>{metadata.height || "Altura no definida"}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Peso (kg)</label>
                    </div>
                    <div className="col-md-6">
                      {editMode ? (
                        <input
                          className="profile-input"
                          type="text"
                          value={metadata.weight}
                          onChange={handleChange}
                          name="weight"
                        />
                      ) : (
                        <p>{metadata.weight || "Peso no definido"}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Fecha de Nacimiento</label>
                    </div>
                    <div className="col-md-6">
                      {editMode ? (
                        <input
                          className="profile-input"
                          type="date"
                          value={metadata.birthday}
                          onChange={handleChange}
                          name="birthday"
                        />
                      ) : (
                        <p>
                          {metadata.birthday
                            ? formatDate(metadata.birthday)
                            : "Fecha no definida"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "plans" && (
                <div className="tab-pane fade show active">
                  {usuarioActivo.plans && usuarioActivo.plans.length > 0 ? (
                    usuarioActivo.plans.map((plan, index) => (
                      <div className="plan-card" key={index}>
                        {" "}
                        {/* Aplicar la clase plan-card aquí */}
                        <h3>{plan.plan.name}</h3>
                        <p>Expira el: {formatDate(plan.expiration)}</p>
                        <ul>
                          {plan.plan.services.map((service) => (
                            <li className="custom-li-profile" key={service._id}>
                              <label>
                                {" "}
                                {service.service.name} - {service.credits}{" "}
                                créditos
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>No tienes planes asignados.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
