import React, { useState, useEffect } from "react"
import axios from "axios"

const DeleteUser = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data.users || [])
      }).catch(() => {
        setErrorMsg("Cannot retrieve list of users.")
      })
  }, [])

  const handleUserDeletionSuccess = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUserId)
    setUsers(updatedUsers)
    setSelectedUserId("")
    setErrorMsg("")
  }
  const deleteUser = (userId) => axios.delete(`http://localhost:3000/api/users/${userId}`)
  const handleDeleteUser = () => {
    if (!selectedUserId) {
      setErrorMsg("Please select a user to delete.")

      
return
    }

    deleteUser(selectedUserId)
      .then(handleUserDeletionSuccess)
      .catch(() => {
        setErrorMsg("Cannot delete user.")
      })
  }
  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value)
  }

  return (
    <div>
      <h1>Supprimer des Utilisateurs</h1>{errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div>
        <label>Sélectionnez un utilisateur à supprimer:</label>
        <select value={selectedUserId} onChange={handleSelectChange}>
          <option value="">Sélectionnez un utilisateur</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} - {user.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDeleteUser}>Delet User</button>
    </div>
  )}

export default DeleteUser
