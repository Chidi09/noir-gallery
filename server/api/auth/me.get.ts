import { getUserFromSession } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event)

  if (!user) {
    return { user: null }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      authorProfile: user.authorProfile,
    },
  }
})
