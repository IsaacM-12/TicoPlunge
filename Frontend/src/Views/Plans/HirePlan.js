import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./HirePlan.css"; // Asegúrate de tener estilos adecuados para esta vista
import {
  urlPlan,
  selectToBD,
  selectUserByToken,
  createToBD,
  urlPlanRequest,
  timeWaitAlert,
  SuccessAlert,
  ErrorAlert,
  NotFound,
} from "../../GlobalVariables";
import { set } from "mongoose";

const HirePlan = () => {
  const [showErroresForm, setshowErroresForm] = useState("");
  const [existingPlans, setExistingPlans] = useState([]);
  const [existingRequests, setExistingRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState({});

  const fetchExistingPlans = async () => {
    try {
      const plansData = await selectToBD(urlPlan);
      setExistingPlans(plansData);
    } catch (error) {
      console.error("Error al obtener planes existentes:", error);
    }
  };

  const fetchPlanRequests = async () => {
    if (usuarioActivo) {
      try {
        const requestData = await selectToBD(urlPlanRequest);
        setExistingRequests(requestData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes de plan existentes:",
          error
        );
      }
    }
  };

  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
  };

  // Cargar todos los planes disponibles
  useEffect(() => {
    fetchExistingPlans();
    GetUserActive();
    fetchPlanRequests();
  }, []);

  // Función para manejar la contratación de un plan
  const handleHire = async (planId) => {
    console.log("requestData", existingRequests);
    try {
      if (!usuarioActivo || !usuarioActivo._id) {
        alert("Usuario no identificado, no es posible enviar la solicitud");
        return;
      }
      let alreadyRequested = false;
      // Verificar si ya existe una solicitud para este plan
      if (existingRequests.length > 0) {
        alreadyRequested = existingRequests.some(
          (request) =>
            request.plan._id === planId &&
            request.user._id === usuarioActivo._id
        );
      }

      // Verificar si ya tiene contratado el plan
      let alreadyHired = false;
      if (usuarioActivo.plans.length > 0) {
        alreadyHired = usuarioActivo.plans.some((plan) => plan._id === planId);
      }

      if (alreadyRequested || alreadyHired) {
        const message = alreadyRequested ? (
          <ErrorAlert
            message={"Ya has solicitado este plan. Espera la confirmación."}
          />
        ) : (
          <ErrorAlert
            message={"Ya has contratado este plan. Escoge uno nuevo."}
          />
        );
        setshowErroresForm(message);
        setTimeout(() => {
          setshowErroresForm("");
        }, timeWaitAlert);
        fetchPlanRequests();
        return;
      }

      const inputData = {
        user: usuarioActivo._id,
        plan: planId,
      };

      const response = await createToBD(urlPlanRequest, inputData);

      if (response.type.name === "SuccessAlert") {
        const message = (
          <SuccessAlert message={"Se ha solicitado el plan exitosamente."} />
        );
        setshowErroresForm(message);
      } else {
        setshowErroresForm(response);
      }
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
    } catch (error) {
      console.error("Error al enviar la solicitud de contratación:", error);
      alert("No se pudo enviar la solicitud de contratación debido a un error");
    }
    fetchPlanRequests();
  };

  // Función para abrir el modal de contratación
  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  if (
    usuarioActivo.role !== "Client" &&
    usuarioActivo.role !== "Administrator"
  ) {
    return <NotFound mensaje="Lo sentimos, no tienes acceso a esta página" />;
  }

  return (
    <div className="hirePlanStyle">
      <div className={`m-3 ${showErroresForm ? "" : "d-none"}`}>
        {showErroresForm}
      </div>
      <div className="card-container-general">
        {existingPlans.length > 0 ? (
          existingPlans.map((item, index) => (
            <div className="card-general" key={item._id}>
              <span className="card-title-general" id={index}>
                {item.name}
              </span>
              <div className="card-divider-general"></div>
              <span className="card-subtitle-general">Servicios incluidos:</span>
              <span className="card-list-general">
                {item.services.map((contractedService, index) => (
                  <li key={index} className="custom-li-plan">
                    {contractedService.service.name} -{" "}
                    {contractedService.credits} créditos
                  </li>
                ))}
              </span>
              <div className="card-divider-service"></div>
              <span className="card-subtitle-general" id={index}>
                Precio ₡ {item.price}
              </span>
              <div className="card-divider-service"></div>
              <button
                className="btn btn-primary"
                onClick={() => openModal(item)}
              >
                Contratar
              </button>
            </div>
          ))
        ) : (
          <div className="no-data">
            <h2>No hay planes creados</h2>
          </div>
        )}

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Contratar Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "bold", color: "#333" }}>
              ¿Estás seguro que deseas contratar el plan "{selectedPlan?.name}"?
            </p>
            <p style={{ color: "#666" }}>
              Para confirmar la contratación, deberás realizar el pago
              correspondiente.<br></br>
              Cuando el pago sea confirmado, el plan será activado en tu cuenta.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await handleHire(selectedPlan._id);
                closeModal();
              }}
            >
              Contratar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default HirePlan;
