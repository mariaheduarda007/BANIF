import vine from '@vinejs/vine'

export const createSavings = vine.compile(
  vine.object({
    value: vine.number().positive(),
    account_number_fk: vine.number().positive(),
  })
)

export const updateSavings = vine.compile(
  vine.object({
    value: vine.number().positive(),
  })
)
