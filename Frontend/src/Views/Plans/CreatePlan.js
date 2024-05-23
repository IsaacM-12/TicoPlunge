import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./CreatePlan.css";
import EditPlan from "./EditPlan";
import {
  ErrorAlert,
  timeWaitAlert,
  urlService,
  urlPlan,
  createToBD,
  selectToBD,
  selectUserByToken,
  NotFound,
} from "../../GlobalVariables";

const CreatePlan = () => {
  const [inputData, setInputData] = useState({
    name: "",
    services: [],
    price: 0,
  });
  const [existingPlans, setExistingPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [showErroresForm, setshowErroresForm] = useState("");
  const [existingServices, setExistingServices] = useState([]);

  const fetchExistingPlans = async () => {
    try {
      const plansData = await selectToBD(urlPlan);
      setExistingPlans(plansData);
    } catch (error) {
      console.error("Error al obtener planes existentes:", error);
    }
  };

  const fetchExistingServices = async () => {
    try {
      const servicesData = await selectToBD(urlService);
      setExistingServices(servicesData);
    } catch (error) {
      console.error("Error al obtener servicios existentes:", error);
    }
  };

  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
  };

  useEffect(() => {
    GetUserActive();
    fetchExistingPlans();
    fetchExistingServices();
  }, []);

  const handleCardClick = (plan) => {
    setCurrentPlan(plan);
    setShowModal(true);
  };

  const handleChange = (e, field) => {
    setInputData({
      ...inputData,
      [field]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setCurrentPlan(false);
    setShowModal(false);
  };

  const handleSelectService = (serviceId) => {
    setInputData((prevState) => {
      const isAlreadySelected = prevState.services.some(
        (s) => s.service === serviceId
      );
      if (isAlreadySelected) {
        return {
          ...prevState,
          services: prevState.services.filter((s) => s.service !== serviceId),
        };
      } else {
        return {
          ...prevState,
          services: [
            ...prevState.services,
            { service: serviceId, credits: 1 }, // default credits
          ],
        };
      }
    });
  };

  const handleChangeCredits = (serviceId, credits) => {
    setInputData((prevState) => ({
      ...prevState,
      services: prevState.services.map((s) =>
        s.service === serviceId ? { ...s, credits: parseInt(credits) || 0 } : s
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.name.trim()) {
      setshowErroresForm(
        <ErrorAlert message="Debe llenar el nombre del plan." />
      );
      return;
    }
    // Check for name uniqueness
    const isNameTaken = existingPlans.some(
      (plan) => plan.name.toLowerCase() === inputData.name.toLowerCase()
    );
    if (isNameTaken) {
      alert("Ya existe un plan con ese nombre.");
      return;
    }

    const confirmacion = window.confirm(
      "¿Está seguro de iniciar la creación del servicio?"
    );
    
    if (confirmacion) {
      const response = await createToBD(urlPlan, inputData);
      fetchExistingPlans();
      setshowErroresForm(response);
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
      if (response.type === "success") {
        window.alert("¡Servicio creado exitosamente!");
      }
      setInputData({
        name: "",
        services: [],
        price: 0,
      });
    } else {
      setshowErroresForm(<ErrorAlert message="Acción cancelada." />);
    }
  };

  if (usuarioActivo.role !== "Administrator") {
    return <NotFound mensaje="Lo sentimos, no tienes acceso a esta página" />;
  }

  return (
    <div className="createPlanStyle-plan">
      <div className="form-container-plan">
        <h2 className="title-plan">Crear Plan</h2>
        <div className="social-message-service">
          <div className="line-service"></div>
          <div className="message-plan">
            Crear servicio o añadir encargado
          </div>
          <div className="line-service"></div>
          <br />
        </div>
        <form onSubmit={handleSubmit} className="form-createPlan-plan">
          <div className="input-group-createPlan-plan">
            <label
              style={{ color: "rgba(156, 163, 175, 1)" }}
              htmlFor="inputName"
            >
              Nombre del Plan:
            </label>
            <input
              type="text"
              id="inputName"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
              className="input"
              required
            />
          </div>
          <div className="input-group-createPlan-plan">
            <label
              style={{ color: "rgba(156, 163, 175, 1)" }}
              htmlFor="inputName"
            >
              Servicios incluidos:
            </label>
            {existingServices.map((service) => (
              <div key={service._id} className="input-group-createPlan-plan">
                <label className="container-plan-checkbox">
                  {service.name}
                  <input
                    type="checkbox"
                    id={`service-${service._id}`}
                    checked={inputData.services.some(
                      (s) => s.service === service._id
                    )}
                    onChange={() => handleSelectService(service._id)}
                  />
                  <span className="checkmark-plan"></span>
                </label>
                {inputData.services.some((s) => s.service === service._id) && (
                  <>
                    <label htmlFor={`credits-${service._id}`} style={ {fontSize: '14px'} }>Créditos:</label>
                    <input
                      type="number"
                      value={
                        inputData.services.find(
                          (s) => s.service === service._id
                        ).credits
                      }
                      onChange={(e) =>
                        handleChangeCredits(service._id, e.target.value)
                      }
                      min="1"
                      className="input"
                    />
                  </>
                )}
              </div>
            ))}
            <div className="input-group-createPlan-plan">
            <label
              style={{ color: "rgba(156, 163, 175, 1)" }}
              htmlFor="inputPrice"
            >
              Precio del Plan (₡):
            </label>
            <input
              type="number"
              id="inputPrice"
              value={inputData.price}
              onChange={(e) => setInputData({ ...inputData, price: parseFloat(e.target.value) || 0 })}
              className="input"
              required
              min="0"
            />
          </div>
          </div>
          <button type="submit" className="buttomCreate-plan mt-4">
            Crear Plan
          </button>
        </form>
      </div>
      <div className="social-message-plan">
        <div className="line-plan"></div>
        <div className="message-plan">Servicios existentes</div>
        <div className="line-plan"></div>
      </div>
      <br />
      <div className="card-container-plan">
        {existingPlans.length > 0 ? (
          existingPlans.map((item, index) => (
            <div
              className="card-plan"
              key={item._id}
              onClick={() => handleCardClick(item)}
            >
              <span className="card-title-plan" id={index}>
                {item.name}
              </span>
              <div className="card-divider-plan"></div>
              <span className="card-subtitle-plan">Servicios incluidos:</span>
              <span className="card-list-plan">
                {item.services.map((contractedService, index) => (
                  <li key={index} className="custom-li-plan">
                    {contractedService.service.name} - {contractedService.credits} créditos
                  </li>
                ))}
              </span>
              <div className="card-divider-service"></div>
              <span className="card-subtitle-plan" id={index}>
                Precio ₡ {item.price}
              </span>
            </div>
          ))
        ) : (
          <div className="no-data">
            <h2>No hay planes creados</h2>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPlan && (
            <EditPlan
              plan={currentPlan}
              fetchExistingPlans={fetchExistingPlans}
              fetchExistingServices={fetchExistingServices}
              onClose={handleModalClose}
              onSave={fetchExistingPlans}
              setshowErroresForm={setshowErroresForm}
              selectServicesBD={fetchExistingPlans}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreatePlan;
