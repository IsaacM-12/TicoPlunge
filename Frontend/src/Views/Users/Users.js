import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import UserEdit from "./UserEdit";
import UserAdd from "./UserAdd";
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

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
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setEditUser(null);
        setShowEditModal(false);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
    };

    const Removefunction = async (user) => {
        await deleteByIDToBD(urlUsers, user._id);
        fetchUsers();
    };

    return (
        <div className="container">
            <div className="card-title">
                <h2>Todos Los Usuarios</h2>
            </div>
            <div className="divbtn">
                <Button onClick={() => setShowAddModal(true)} className="btn btn-success">Agregar Nuevo Usuario</Button>
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

            <Modal show={showEditModal} onHide={handleEditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editUser && <UserEdit user={editUser} onClose={handleEditModalClose} onSave={fetchUsers} />}
                </Modal.Body>
            </Modal>

            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserAdd onClose={handleAddModalClose} onSave={fetchUsers} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Users;
