import React from "react"
import ProfilStyle from "@/web/components/ui/profilstyle"

function ProfilPage({ email }) {
  return (
    <ProfilStyle>
      <h1 className="text-3xl font-bold mb-4">Profil</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-700">{email}</p>
      </div>
    </ProfilStyle>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { userId } = query

  if (!userId) {
    return {
      props: {
        email: "User unidentified",
      },
    }
  }

  const res = await fetch(`http://localhost:3000/api/user/${userId}`)
  const data = await res.json()

  if (!data.success) {
    return {
      props: {
        email: "Email non disponible",
      },
    }
  }

  return {
    props: {
      email: data.email,
    },
  }
}

export default ProfilPage
