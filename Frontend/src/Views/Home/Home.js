import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


const Home = () => {
  return (
    <div className="homeStyle">
      <div className="todo">
        <div className="container">
          <div className="colorback">
            <h1 className="titulo">¡Bienvenido a TICO PLUNGE!</h1>
            <p>Explora todo lo que tenemos para ofrecerte.</p>
            <div>
              <i>• Cold Plunge</i>
              <p>• Pil ates</p>
              <p>• Zumba</p>
              <p>• Yoga</p>
              <p>• Boxeo</p>
            </div>
            <Link to="/AppointmentForm" className="btn btn-primary">
              RESERVA YA!!
            </Link>
          </div>

          <div className="row">
            <div className="cold-plunge  col">
              <h2>COLD PLUNGE</h2>
            </div>
            <div className="col bg-image">
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="quienes-somos">
                <div className="colorback">
                  <h2>¿Quiénes somos?</h2>
                  <p>Somos una empresa comprometida con nuestros clientes.</p>
                  <Link to="/nosotros" className="btn btn-secondary">
                    Conoce más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="visit-comunity">
                <div className="colorback">
                  <div>
                    <div>
                      <h2>¡Visítanos!</h2>
                      <p>Estamos ubicados en:</p>
                      <p>Tu Dirección, Ciudad, País</p>
                      <a
                        href="https://api.whatsapp.com/message/NQD6MTRNSIW5N1?autoload=1&app_absent=0"
                        className="btn btn-info"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Whatsapp
                      </a>
                      <p>Horario de atención: Lunes a Viernes, 9am - 6pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="redes">
              <h2>¡Únete a nuestra comunidad!</h2>
              <p>Síguenos en nuestras redes sociales.</p>
              <a
                href="https://www.facebook.com/profile.php?id=61553047905206"
                className="btn btn-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/ticoplunge?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="btn btn-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <footer>
            <div className="colorback">
              <p>&copy;Tico Plunge</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
