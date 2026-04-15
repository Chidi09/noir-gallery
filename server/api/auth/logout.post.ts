import { logout } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await logout(event)
  return { success: true }
})
