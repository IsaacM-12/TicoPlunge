import React, { useEffect, useState } from "react";
import {
  urlPlanRequest,
  selectToBD,
  deleteByIDToBD,
  updateToBD,
  urlSingIn,
  NotFound,
  selectUserByToken,
} from "../../GlobalVariables"; // Asegúrate de que esta URL sea correcta
import axios from "axios";
import "./Requests.css";

const Requests = () => {
  const [planRequests, setPlanRequests] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState({});

  const fetchPlanRequests = async () => {
    try {
      const response = await selectToBD(urlPlanRequest);
      setPlanRequests(response);
    } catch (error) {
      console.error("Error al obtener las solicitudes de contratación:", error);
    }
  };

  const GetUserActive = async () => {
    const user = await selectUserByToken();
    setUsuarioActivo(user);
  };

  useEffect(() => {
    fetchPlanRequests();
    GetUserActive();
  }, []);

  const handleAccept = async (request) => {
    if (window.confirm("¿Estás seguro de que deseas aceptar esta solicitud?")) {
      try {

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        const updateData = {
          planId: request.plan._id,
          expirationDate: expirationDate.toISOString(),
        };

        const response = await updateToBD(
          `${urlSingIn}/addPlan`,
          request.user._id,
          updateData
        );
        if (response.type.name === "SuccessAlert") {
          window.alert("Solicitud aceptada");
        }
        await axios.delete(`${urlPlanRequest}/${request._id}`);
        fetchPlanRequests();
      } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
      }
    }
  };

  const handleReject = async (requestId) => {
    if (
      window.confirm("¿Estás seguro de que deseas rechazar esta solicitud?")
    ) {
      try {
        await axios.delete(`${urlPlanRequest}/${requestId}`);
        window.alert("Solicitud rechazada");
        fetchPlanRequests(); // Actualiza la lista tras eliminar una solicitud
      } catch (error) {
        window.alert("Error al rechazar la solicitud:", error);
      }
    }
  };

  if (usuarioActivo.role !== "Administrator") {
    return <NotFound mensaje="Lo sentimos, no tienes acceso a esta página" />;
  }

  return (
    <div className="request-style">
      <div className="request">
      <h1 className="m-3">Solicitudes de Planes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre del Cliente</th>
            <th>Correo del Cliente</th>
            <th>Nombre del Plan</th>
            <th>Fecha de Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {planRequests.length > 0 ? (
            planRequests.map((request) => (
              <tr key={request._id}>
                <td>
                  {request.user.firstName} {request.user.lastName}
                </td>
                <td>{request.user.email}</td>
                <td>{request.plan.name}</td>
                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary m-3"
                    onClick={() => handleAccept(request)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn btn-danger m-3"
                    onClick={() => handleReject(request._id)}
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay solicitudes pendientes.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Requests;
