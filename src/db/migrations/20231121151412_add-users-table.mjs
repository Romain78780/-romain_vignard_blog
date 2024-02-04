export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("username").notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.boolean("isAdmin").notNullable().defaultTo(false)
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}


