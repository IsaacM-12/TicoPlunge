import { useEffect, useState } from "react";
import "./Users.css";

import {
  createToBD,
  selectFilterToBD,
  selectUserByToken,
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

  useEffect(() => {
    // Fetch user data from the server on component mount
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await selectToBD(urlUsers);
    setUsers(response);
  };

  const addUser = async (userData) => {
    const { data: res } = await createToBD(urlSingIn, userData);
    setError(<SuccessAlert message={res.message} />);
    fetchUsers();
  };

  // UI Handlers
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
    addUser(userData);
  };

  return (
    <div>
      <h1>Registered Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => setEditUser(user)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
