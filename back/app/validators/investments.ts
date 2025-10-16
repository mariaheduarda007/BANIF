import vine from '@vinejs/vine'

export const createInvestments = vine.compile(
  vine.object({
    value: vine.number().positive(),
    account_number_fk: vine.number().positive(),
  })
)
