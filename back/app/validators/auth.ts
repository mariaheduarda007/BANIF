import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32),
    cpf: vine
      .string()
      .minLength(11)
      .maxLength(11)
      .unique(async (db, value) => {
        const user = await db.from('users').where('cpf', value).first()
        return !user
      }),
      address: vine.object({
      street: vine.string(),
      neighborhood: vine.string(),
      house_number: vine.number(),
      city: vine.string(),
      state: vine.string(),
    }),
    account: vine.object({
      account_number: vine.string().minLength(7).maxLength(7),
      agency_number: vine.string().minLength(6).maxLength(6),
    }),
  })
)
/**
 * Validator para login de usuário
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)
