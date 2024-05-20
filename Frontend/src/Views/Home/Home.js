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
          
          <div className="esquina">
            A
          </div>

          <div className="row">
            <div className="cold-plunge  col">
              <h2>COLD PLUNGE</h2>
              <div className="explicacion">
                <p>
                  El "cold plunge" o inmersión en agua fría es cuando te
                  sumerges en agua muy fría, por unos pocos minutos. Piensa en
                  meterte en una piscina con agua casi helada.
                </p>{" "}
                <p>¿Por qué lo hacen las personas? </p>
                <li>
                  <strong>
                    Recuperación: Ayuda a que tus músculos se sientan mejor
                    después de hacer ejercicio.
                  </strong>
                </li>
                <li>
                  <strong>
                    Mejora la circulación: El frío hace que la sangre circule
                    mejor por tu cuerpo.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Refuerza el sistema inmunológico: Puede ayudar a que no te
                    enfermes tanto.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Mejora el ánimo: Estar en agua fría puede hacerte sentir más
                    feliz y menos estresado.
                  </strong>
                </li>
              </div>
            </div>
            <div className="col bg-image"></div>
          </div>

          <div className="row">
            <div className="col bg-image"></div>
            <div className="cold-plunge  col">
              <h2>PILATES</h2>
              <div className="explicacion">
                <p>
                  Los Pilates son una forma de ejercicio que te ayuda a
                  fortalecer los músculos, especialmente los del abdomen y la
                  espalda. También mejora tu postura, flexibilidad y equilibrio.
                </p>{" "}
                <p>¿Cómo se hacen? </p>
                <p>
                  Puedes hacer Pilates en una colchoneta en el suelo o usando
                  máquinas especiales. Los movimientos son lentos y controlados,
                  y prestas mucha atención a cómo respiras.
                </p>
                <p>¿Por qué son buenos?</p>
                <li>
                  <strong>
                    Fortalecen el cuerpo: Los Pilates se enfocan en fortalecer
                    el "core" o núcleo del cuerpo, que incluye los músculos del
                    abdomen, la espalda baja, las caderas y los glúteos.
                  </strong>
                </li>
                <li>
                  <strong>
                    Mejoran la postura: Una buena postura reduce el riesgo de
                    dolores de espalda y cuello, y mejora la eficiencia de tus
                    movimientos diarios.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Aumentan la flexibilidad: Una mayor flexibilidad puede
                    mejorar tu rango de movimiento, reducir la rigidez y hacer
                    que te sientas más ágil y menos propenso a lesiones.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Reducen el estrés: Los movimientos suaves y fluidos también
                    contribuyen a una sensación general de bienestar y
                    relajación.
                  </strong>
                </li>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="cold-plunge  col">
              <h2>ZUMBA</h2>
              <div className="explicacion">
                <p>
                  Zumba es como una fiesta de baile que también te hace hacer
                  ejercicio. Sigues los pasos de baile divertidos al ritmo de
                  música animada, como salsa, merengue y reguetón.
                </p>{" "}
                <p>¿Por qué es popular Zumba? </p>
                <li>
                  <strong>
                    Diversión y Alegría: Zumba se siente más como una fiesta que
                    como un ejercicio. La combinación de música animada y
                    movimientos de baile divertidos crea un ambiente lleno de
                    energía y alegría.
                  </strong>
                </li>
                <li>
                  <strong>
                    Accesible para Todos: Zumba es para cualquier persona, sin
                    importar su edad, forma física o habilidades de baile. Los
                    pasos son simples y fáciles de seguir, lo que hace que sea
                    atractivo para principiantes y personas con experiencia.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Quema de Calorías y Tonificación Muscular: Los movimientos
                    de baile de Zumba implican una combinación de ejercicios
                    cardiovasculares y de tonificación muscular, lo que ayuda a
                    mejorar la resistencia cardiovascular y a tonificar el
                    cuerpo.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Beneficios para la Salud Mental: Bailar y moverse al ritmo
                    de la música libera endorfinas, neurotransmisores que actúan
                    como analgésicos naturales y mejoran el estado de ánimo, lo
                    que puede reducir el estrés, la ansiedad y la depresión.
                    relajación.
                  </strong>
                </li>
              </div>
            </div>
            <div className="col bg-image"></div>
          </div>

          <div className="row">
            <div className="col bg-image"></div>
            <div className="cold-plunge  col">
              <h2>YOGA</h2>
              <div className="explicacion">
                <p>
                  El yoga es una antigua práctica que combina movimientos
                  físicos, técnicas de respiración y meditación para promover el
                  bienestar general del cuerpo, la mente y el espíritu.
                </p>{" "}
                <p>Beneficios de la Yoga </p>
                <li>
                  <strong>
                    Bienestar físico: El yoga es una excelente manera de
                    mantenerse en forma y mejorar la salud física. Las posturas
                    de yoga fortalecen los músculos, aumentan la flexibilidad y
                    mejoran la postura corporal.
                  </strong>
                </li>
                <li>
                  <strong>
                    Reducción del estrés y la ansiedad: El yoga incluye técnicas
                    de respiración profunda y meditación que ayudan a calmar la
                    mente y reducir el estrés. La práctica regular de yoga puede
                    ayudar a gestionar la ansiedad y promover la relajación.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Mejora del bienestar mental: El yoga fomenta la atención
                    plena y la conciencia del momento presente. Esto puede
                    ayudar a reducir los pensamientos negativos y aumentar la
                    autoaceptación y el amor propio.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Aumento de la energía y la vitalidad: Las prácticas de
                    respiración en el yoga, como el pranayama, aumentan el flujo
                    de oxígeno en el cuerpo, lo que puede aumentar la energía y
                    la vitalidad.
                  </strong>
                </li>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="cold-plunge  col">
              <h2>BOXEO</h2>
              <div className="explicacion">
                <p>
                  El boxeo es un deporte en el que dos personas luchan una
                  contra la otra usando solo sus puños. Se enfrentan en un
                  cuadrilátero y tratan de golpearse entre sí mientras se mueven
                  alrededor del ring.
                </p>{" "}
                <p>Beneficios</p>
                <li>
                  <strong>
                    Ejercicio y Condición Física: El boxeo es una forma intensa
                    de ejercicio que involucra movimientos rápidos y potentes.
                    Ayuda a mejorar la resistencia cardiovascular, la fuerza
                    muscular, la coordinación y la agilidad.
                  </strong>
                </li>
                <li>
                  <strong>
                    Superación Personal y Desafío: El boxeo es un deporte
                    desafiante que requiere disciplina, determinación y
                    perseverancia. Superar los desafíos físicos y mentales que
                    presenta el boxeo puede ser muy gratificante y promover un
                    sentido de logro personal.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Autodefensa y Seguridad Personal: Aprender técnicas de boxeo
                    puede proporcionar a las personas habilidades prácticas de
                    autodefensa y aumentar su confianza en situaciones
                    potencialmente peligrosas.
                  </strong>
                </li>{" "}
                <li>
                  <strong>
                    Alivio del Estrés y Canalización de Emociones: Golpear el
                    saco de boxeo o participar en un combate puede ser una forma
                    efectiva de liberar tensiones, aliviar el estrés y canalizar
                    emociones negativas. Muchas personas encuentran que el boxeo
                    les proporciona un escape saludable y una forma de
                    desahogarse después de un día estresante.
                  </strong>
                </li>
              </div>
            </div>
            <div className="col bg-image"></div>
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
