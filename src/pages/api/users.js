import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import hashPassword from "@/db/hashPassword"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/pages/api/constants"
import sleep from "@/utils/sleep"
import { emailValidator, passwordValidator, usernameValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
        username: usernameValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { email, password, username },
      },
      models: { UserModel },
    }) => {
      const userByEmail = await UserModel.query().findOne({ email })
      const userByUsername = await UserModel.query().findOne({ username })
    
      if (userByEmail || userByUsername) {
        await sleep(AVERAGE_PASSWORD_HASHING_DURATION)
    
        send({ success: false, message: "Email or Username already in use" })
    
        return
      }
    
      const [passwordHash, passwordSalt] = await hashPassword(password)
    
      await UserModel.query().insert({
        email,
        username,
        passwordHash,
        passwordSalt,
      })
    
      send({ success: true })
    },
    
  ],
})

export default handle
