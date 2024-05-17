import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Users.css";

import {
    createToBD,
    selectFilterToBD,
    selectUserByToken,
    deleteByIDToBD,
    NotFound,
    urlUsers,
    urlSingIn,
    ErrorAlert,
    timeWaitAlert,
    SuccessAlert,
    selectToBD,
} from "../../GlobalVariables";
const Users = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [isLoading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null); //
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch user data from the server on component mount
        fetchUsers()

    }, []);

    const fetchUsers = async () => {
        const response = await selectToBD(urlUsers)
        setUsers(response)
    }


    const addUser = async (userData) => {

        const { data: res } = await createToBD(urlSingIn, userData);
        setError(<SuccessAlert message={res.message} />);
        fetchUsers();
    };

    const LoadEdit = (id) => {
        navigate("/Users/edit/");
    }

    const Removefunction = async (email) => {
       await deleteByIDToBD(urlUsers,email)
       fetchUsers()
    }
    // UI Handlers
    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };
        addUser(userData);
    };
    return (
        <div className="container">
            <div className="card-title">
                <h2>Todos Los Usuarios</h2>
            </div>
            <div className="divbtn">
                <Link to="employee/create" className="btn btn-success">Agregar Nuevo Usuario</Link>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                        <tr>
                            <td>ID</td>
                            <td>Nombre</td>
                            <td>Email</td>
                            <td>Tipo</td>
                            <td>Funciones</td>
                        </tr>
                    </thead>
                    <tbody>

                        {users &&
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <a onClick={() => { LoadEdit(user._id) }} className="btn btn-success">Editar</a>
                                        <a onClick={() => { Removefunction(user._id) 
                                            console.log(user.id)}} className="btn btn-danger">Eliminar</a>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Users