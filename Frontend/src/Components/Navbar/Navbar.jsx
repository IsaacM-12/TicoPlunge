import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesion?");
    if (confirmLogout) {
      localStorage.setItem("token", "");
    }
  };
  return (
    <div>
      <div className="containe-navbar">
        <Link to="/Profile" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Ver Perfil
        </Link>

        <Link to="/LogIn" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Iniciar Sesión
        </Link>

        <Link to="/" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>

        <Link to="/Feedback" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-message-circle"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Comentarios
        </Link>

        <Link to="/CreateClass" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-clipboard"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          Crear Clase
        </Link>

        <Link to="/AppointmentForm" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-calendar"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Reservar
        </Link>
        <Link to="/Users" className="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-calendar"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Lista de Usuarios
        </Link>

        <Link to="/" className="link-navbar" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Salir
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useEffect, useState } from "react";
// import { selectUserByToken } from "../../GlobalVariables";

// const Navbar = () => {
//   // -------------------------------------------------------------
//   // Se usara para optener los datos de la persona activa
//   // -------------------------------------------------------------
//   const [usuarioActivo, setUsuarioActivo] = useState("");

//   /**
//    * Función asincrónica para obtener y establecer el usuario activo utilizando el token de autenticación.
//    */
//   const GetUserActive = async () => {
//     const user = await selectUserByToken();
//     setUsuarioActivo(user.role);
//   };

//   /**
//    * Efecto secundario que se ejecuta al montar el componente (cargar la pagina)
//    * El segundo argumento vacío asegura que se llame solo una vez al cargar la página.
//    */
//   useEffect(() => {
//     // Llamar a la función para obtener y establecer el usuario activo
//     GetUserActive();
//   }, []);

//   // Función para renderizar los enlaces basados en el rol del usuario
//   const renderNavbarLinks = () => {
//     switch (usuarioActivo) {
//       case "Staff":
//         return (
//           <>
//             <Link to="/" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-home"
//               >
//                 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                 <polyline points="9 22 9 12 15 12 15 22"></polyline>
//               </svg>
//               Home
//             </Link>
//             <Link to="/Feedback" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-message-circle"
//               >
//                 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//               </svg>
//               Comentarios
//             </Link>
//             <Link to="/CreateClass" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-clipboard"
//               >
//                 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
//                 <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
//               </svg>
//               Crear Clase
//             </Link>
//           </>
//         );
//       case "Admin":
//         return (
//           <>
//             <Link to="/" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-home"
//               >
//                 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                 <polyline points="9 22 9 12 15 12 15 22"></polyline>
//               </svg>
//               Home
//             </Link>
//             <Link to="/Feedback" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-message-circle"
//               >
//                 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//               </svg>
//               Comentarios
//             </Link>
//             <Link to="/CreateClass" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-clipboard"
//               >
//                 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
//                 <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
//               </svg>
//               Crear Clase
//             </Link>
//             <Link to="/AppointmentForm" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-calendar"
//               >
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                 <line x1="16" y1="2" x2="16" y2="6"></line>
//                 <line x1="8" y1="2" x2="8" y2="6"></line>
//                 <line x1="3" y1="10" x2="21" y2="10"></line>
//               </svg>
//               Reservar
//             </Link>
//           </>
//         );
//       case "Client":
//         return (
//           <>
//             <Link to="/" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-home"
//               >
//                 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                 <polyline points="9 22 9 12 15 12 15 22"></polyline>
//               </svg>
//               Home
//             </Link>
//             <Link to="/Feedback" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-message-circle"
//               >
//                 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//               </svg>
//               Comentarios
//             </Link>
//             <Link to="/AppointmentForm" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-calendar"
//               >
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                 <line x1="16" y1="2" x2="16" y2="6"></line>
//                 <line x1="8" y1="2" x2="8" y2="6"></line>
//                 <line x1="3" y1="10" x2="21" y2="10"></line>
//               </svg>
//               Reservar
//             </Link>
//           </>
//         );
//       default:
//         return (
//           <>
//             <Link to="/LogIn" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-user"
//               >
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//               Iniciar Sesión
//             </Link>
//             <Link to="/" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-home"
//               >
//                 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                 <polyline points="9 22 9 12 15 12 15 22"></polyline>
//               </svg>
//               Home
//             </Link>

//             <Link to="/Feedback" className="link-navbar">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-message-circle"
//               >
//                 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
//               </svg>
//               Comentarios
//             </Link>
//           </>
//         );
//     }
//   };

//   return (
//     <div>
//       <div className="containe-navbar">
//         <Link to="/LogIn" className="link-navbar">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-user"
//           >
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//           Iniciar Sesión
//         </Link>
//         {renderNavbarLinks()}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
