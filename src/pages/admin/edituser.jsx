import React, { useState, useEffect } from "react"
import axios from "axios"

const EditUser = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [editedUser, setEditedUser] = useState({})
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data.users || [])
      })
      .catch(() => {
        setErrorMsg("Unable to retrieve user list.")
      })
  }, [])

  const handleUserUpdateSuccess = () => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    )
    setUsers(updatedUsers)
    setEditedUser({})
    setErrorMsg("")
  }
  const updateUser = (user) => axios.put(`http://localhost:3000/api/users/${user.id}`, user)
  const handleEditUser = () => {
    if (!selectedUserId) {
      setErrorMsg("Please select a user to edit.")

      
return
    }

    if (!editedUser.id) {
      setErrorMsg("Please fill in the user details.")

      
return
    }

    updateUser(editedUser)
      .then(handleUserUpdateSuccess)
      .catch(() => {
        setErrorMsg("Cannot update user.")
      })
  }
  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value)
    const selectedUser = users.find((user) => user.id === e.target.value)
    setEditedUser(selectedUser || {})
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  return (
    <div>
      <h1>Edit a user</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div>
        <label>Select a user to edit:</label>
        <select value={selectedUserId} onChange={handleSelectChange}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} - {user.username}
            </option>
          ))}
        </select>
      </div>
      {selectedUserId && (
        <div>
          <h2>Modifier l'utilisateur</h2>
          <input
            type="text"
            name="email"
            placeholder="Nouvelle adresse e-mail"
            value={editedUser.email || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Nouveau nom d'utilisateur"
            value={editedUser.username || ""}
            onChange={handleInputChange}
          />
          <button onClick={handleEditUser}>Éditer l'utilisateur</button>
        </div>
      )}
    </div>
  )
}

export default EditUser
