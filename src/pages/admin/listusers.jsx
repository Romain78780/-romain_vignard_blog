import React, { useState, useEffect } from "react"
import axios from "axios"

const ListUsers = () => {
  const [users, setUsers] = useState([])
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

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListUsers
