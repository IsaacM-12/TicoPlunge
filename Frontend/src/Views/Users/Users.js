import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import UserEdit from "./UserEdit";
import "./Users.css";

import {
    selectToBD,
    deleteByIDToBD,
    urlUsers,
    SuccessAlert
} from "../../GlobalVariables";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await selectToBD(urlUsers);
        setUsers(response);
        setLoading(false);
    };

    const LoadEdit = (user) => {
        setEditUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setEditUser(null);
        setShowModal(false);
    };

    const Removefunction = async (user) => {
        await deleteByIDToBD(urlUsers, user.id);
        fetchUsers();
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
                                        <Button onClick={() => LoadEdit(user)} className="btn btn-success">Editar</Button>
                                        <Button onClick={() => Removefunction(user)} className="btn btn-danger">Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editUser && <UserEdit user={editUser} onClose={handleModalClose} onSave={fetchUsers} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Users;
