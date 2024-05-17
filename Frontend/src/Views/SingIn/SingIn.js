import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlSingIn,
  redirectLogin,
  SuccessAlert,
  ErrorAlert,
} from "../../GlobalVariables";
import "./Register.css";

const SignIn = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Client",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(urlSingIn, data);
      setError(<SuccessAlert message={res.message} />);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(<ErrorAlert message={error.response.data.message} />);
      }
    }
  };

  return (
    <div className="register_container">
      <div className="register_form_container">
        <div className="register-left">
          <h1>¿Ya tienes cuenta?</h1>
          <Link to={redirectLogin}>
            <button type="button" className="register-white_btn">
              Iniciar sesión
            </button>
          </Link>
        </div>

        <div className="register-right">
          <form className="register-form_container" onSubmit={handleSubmit}>
            <h1>Crear Cuenta</h1>
            <input
              type="text"
              placeholder="Nombre"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="register-input"
            />
            <input
              type="text"
              placeholder="Apellido"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="register-input"
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="register-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="register-input"
            />
            <div className="register-inputBox">
              <select
                className="register-input"
                name="role"
                value={data.role}
                onChange={handleChange}
                required
              >
                <option value="">Select role</option>
                <option value="Staff">Staff</option>
                <option value="Client">User</option>
              </select>
            </div>
            {error && <div>{error}</div>}
            <button type="submit" className="register-form_btn">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
