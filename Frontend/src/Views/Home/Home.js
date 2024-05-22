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
            <p>Somos TICO PLUNGE una nueva forma de llevar el deporte al limite.</p>

            <Link to="/AppointmentForm" className="btn btn-primary">
              RESERVA YA!!
            </Link>
          </div>

          <div className="esquina">A</div>

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
                      <div className="card">
                        <a
                          className="social-link1"
                          href="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-instagram"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                            />
                          </svg>
                        </a>
                        <a
                          className="social-link2"
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-twitter"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                            />
                          </svg>
                        </a>
                        <a
                          className="social-link3"
                          href="https://www.discord.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-discord"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
                            />
                          </svg>
                        </a>
                        <a
                          className="social-link4"
                          href="https://www.whatsapp.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-whatsapp"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="white"
                              d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                            />
                          </svg>
                        </a>
                      </div>
                      {/* <Link
                        to="https://api.whatsapp.com/message/NQD6MTRNSIW5N1?autoload=1&app_absent=0"
                        className="btn btn-info"
                        target="_blank"
                      >
                        Whatsapp
                      </Link> */}
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
