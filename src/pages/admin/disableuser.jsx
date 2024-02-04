import React, { useState, useEffect } from "react"
import axios from "axios"

const DisableUser = () => {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data.users || [])
      })
      .catch(() => {setErrorMsg("Unable to retrieve user list.")})
  }, [])

  const handleUserDisableSuccess = () => {
    const updatedUsers = users.map((user) => user.id === selectedUserId ? { ...user, isActive: false } : user
    )
    setUsers(updatedUsers)
    setSelectedUserId("")
    setErrorMsg("")
  }
  const disableUser = (userId) => axios.put(`http://localhost:3000/api/users/disable/${userId}`)
  const handleDisableUser = () => {
    if (!selectedUserId) {
      setErrorMsg("Please select a user to disable.")

      
return }

    disableUser(selectedUserId)
      .then(handleUserDisableSuccess)
      .catch(() => {setErrorMsg("Cannot disable the user.")
      })
  }
  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value)
  }

  return (
    <div>
      <h1>Désactiver des Utilisateurs</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div>
        <label>Sélectionnez un utilisateur à désactiver:</label>
        <select value={selectedUserId} onChange={handleSelectChange}>
          <option value="">Sélectionnez un utilisateur</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} - {user.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDisableUser}>Désactiver l'utilisateur</button>
    </div>
  )
}

export default DisableUser
