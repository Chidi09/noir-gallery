export interface User {
  id: string
  email: string
  role: 'AUTHOR' | 'ADMIN'
  authorProfile?: {
    id: string
    penName: string
    slug: string
    status: string
  }
}

export function useAuth() {
  const user = useState<User | null>('user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const isAuthor = computed(() => user.value?.role === 'AUTHOR')

  async function login(email: string, password: string) {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (error.value) {
      throw new Error(error.value.message || 'Login failed')
    }

    user.value = data.value?.user ?? null
    return data.value
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/')
  }

  async function fetchUser() {
    const { data } = await useFetch('/api/auth/me')
    user.value = data.value?.user ?? null
  }

  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isAuthor,
    login,
    logout,
    fetchUser,
  }
}
