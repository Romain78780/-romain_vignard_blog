import { useRouter } from "next/router"

function ProfilPage() {
  const router = useRouter()
  const { userId } = router.query

  return (
    <div>
      <h1>Profil</h1>
      <p>ID de l'utilisateur: {userId}</p>
    </div>
  )
}

export default ProfilPage