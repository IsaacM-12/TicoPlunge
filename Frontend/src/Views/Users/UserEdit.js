import { useEffect, useState } from "react";
import { updateToDB, SuccessAlert, urlUsers } from "../../GlobalVariables";

const UserEdit = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.firstName || "");
    const [lastname, setLastName] = useState(user.lastName || "");
    const [email, setEmail] = useState(user.email || "");
    const [role, setRole] = useState(user.role || "");
    const [validation, setValidation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, firstName: name,lastName: lastname , email, role};
        await updateUser(updatedUser);
        onSave();
        onClose();
    };

    const updateUser = async (user) => {
        console.log(user)
        const response = await updateToDB(urlUsers, user);
        alert(SuccessAlert.message);
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    required
                    value={name}
                    onMouseDown={e => setValidation(true)}
                    onChange={e => setName(e.target.value)}
                    className="form-control"
                />
                {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
            </div>
            <div className="form-group">
                <label>Apellido</label>
                <input
                    required
                    value={lastname}
                    onMouseDown={e => setValidation(true)}
                    onChange={e => setLastName(e.target.value)}
                    className="form-control"
                />
                {name.length === 0 && validation && <span className="text-danger">Enter the Lastname</span>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Rol</label>
                <input
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="form-control"
                />
            </div>
            
            <div className="form-group">
                <button className="btn btn-success" type="submit">Guardar</button>
                <button className="btn btn-warning" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default UserEdit;