import BaseModel from "@/db/models/BaseModel"

class UserModel extends BaseModel {
  static get tableName() {
    return "users"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username", "passwordHash", "passwordSalt"], 
      properties: {
        id: { type: "integer" },
        email: { type: "string", minLength: 1, maxLength: 255 },
        username: { type: "string", minLength: 1, maxLength: 255 },
        passwordHash: { type: "string", minLength: 1, maxLength: 255 },
        passwordSalt: { type: "string", minLength: 1, maxLength: 255 },
        isAdmin: { type: "boolean", default: false },
      }
    }
  }
}

export default UserModel
