import { useState } from "react";
import { createToBD, SuccessAlert, urlUsers } from "../../GlobalVariables";

const UserAdd = ({ onClose, onSave }) => {
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [validation, setValidation] = useState(false)
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { firstName: name, lastName: lastname, email, role , password};
        await addUser(newUser);
        onSave();
        onClose();
    };

    const addUser = async (user) => {
        const response = await createToBD(urlUsers, user)
        alert(SuccessAlert.message)
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
                {name.length === 0 && validation && <span className="text-danger">Ingrese el nombre</span>}
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
                {lastname.length === 0 && validation && <span className="text-danger">Ingrese el apellido</span>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
                {email.length === 0 && validation && <span className="text-danger">Ingrese el correo electrónico</span>}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                />
                {email.length === 0 && validation && <span className="text-danger">Ingrese el correo electrónico</span>}
            </div>
            <div className="form-group">
                <label>Rol</label>
                <input
                    required
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="form-control"
                />
                {role.length === 0 && validation && <span className="text-danger">Ingrese el rol</span>}
            </div>

            <div className="form-group">
                <button className="btn btn-success" type="submit">Guardar</button>
                <button className="btn btn-warning" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default UserAdd;
