import { useState, useEffect } from "react";
import { updateToBD, urlService, timeWaitAlert } from "../../GlobalVariables";
import React from "react";
import "./EditService.css";
import { deleteByIDToBD } from "../../GlobalVariables";

const EditService = ({
  service,
  onClose,
  onSave,
  setshowErroresForm,
  selectServicesBD,
}) => {
  const [name, setName] = useState(service.name || "");
  const [encargados] = useState(service.encargados || []);
  const [encargadosTemporales, setEncargadosTemporales] = useState(
    service.encargados || []
  );

  useEffect(() => {
    setEncargadosTemporales(encargados);
  }, [encargados]);

  const handleRemoveEncargado = (encargadoId) => {
    setEncargadosTemporales((prevEncargados) =>
      prevEncargados.filter((encargado) => encargado._id !== encargadoId)
    );
  };

  const handleDeleteService = async () => {
    try {
      const response = await deleteByIDToBD(urlService, service._id);
      selectServicesBD();
      onClose();
      setshowErroresForm(response);
      setTimeout(() => {
        setshowErroresForm("");
      }, timeWaitAlert);
    } catch (error) {
      window.alert("Error al eliminar el servicio.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmacion = window.confirm(
      "¿Está seguro de que desea guardar los cambios?"
    );

    if (confirmacion) {
      const updatedService = {
        ...service,
        name: name,
        encargados: encargadosTemporales.map((encargado) => encargado._id),
      };
      await updateService(updatedService);
      onSave();
      onClose();
    }
  };

  const updateService = async (service) => {
    const parametrosActualizar = {
      name: service.name,
      encargados: service.encargados,
    };
    const response = await updateToBD(
      urlService,
      service._id,
      parametrosActualizar
    );
    selectServicesBD();
    setshowErroresForm(response);
    setTimeout(() => {
      setshowErroresForm("");
    }, timeWaitAlert);
  };

  return (
    <form className="container-edit-service" onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{ fontWeight: "bold", marginRight: "8px" }}>Nombre del servicio:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control-edit-service"
        />
      </div>
      <br></br>
      <div className="form-group-edit-service">
        <label style={{ marginBottom: "4px", fontWeight: "bold" }}>Encargados:</label>
        {encargadosTemporales.map((encargado, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="flex-item-edit-service">
              {encargado.firstName} {encargado.lastName}
            </span>
            <button
              type="button"
              className="custom-button-edit-service"
              onClick={() => handleRemoveEncargado(encargado._id)}
            >
              <svg viewBox="0 0 448 512" className="svgIcon-edit-service">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="modal-footer-edit-service">
        <button className="btn btn-primary button-margin-edit-service" type="submit">
          Guardar cambios
        </button>
        <button
          className="btn btn-danger button-margin-edit-service"
          type="button"
          onClick={handleDeleteService}
        >
          Eliminar Servicio
        </button>
      </div>
    </form>
  );
};

export default EditService;
