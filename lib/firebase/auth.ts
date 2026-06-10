export type User = {
  uid: string
  email: string
  displayName: string
}

let currentUser: User | null = null

const ADMIN_EMAIL = 'admin@accompagnement.fr'
const ADMIN_PASSWORD = 'admin123'

type AuthListener = (user: User | null) => void
const listeners: AuthListener[] = []

function notifyListeners() {
  listeners.forEach((cb) => cb(currentUser))
}

export async function signIn(email: string, password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 300))

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    currentUser = { uid: 'admin-001', email, displayName: 'Admin' }
    notifyListeners()
    return currentUser
  }

  throw new Error('Email ou mot de passe incorrect')
}

export async function signOut(): Promise<void> {
  await new Promise((r) => setTimeout(r, 100))
  currentUser = null
  notifyListeners()
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function onAuthChange(callback: AuthListener): () => void {
  listeners.push(callback)
  callback(currentUser)
  return () => {
    const idx = listeners.indexOf(callback)
    if (idx !== -1) listeners.splice(idx, 1)
  }
}
