import mw from "@/api/mw"
import { UserModel } from "@/db/UserModel"

const handle = mw({
  GET: [
    async ({ req, send }) => {
      const { userId } = req.query
      
      try {
        const user = await UserModel.query().findById(userId)
        
        if (!user) {
          send({ success: false, message: "User not found" }, 404)

          
return
        }
        
        send({ success: true, email: user.email })
      } catch (error) {
        send({ success: false, message: "An error occurred" }, 500)
      }
    }
  ],
})

export default handle
