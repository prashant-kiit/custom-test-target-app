import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'pw_practice_auth'
const DEMO_USERNAME = 'demo'
const DEMO_PASSWORD = 'password123'
const SESSION_TTL_MS = 60 * 60 * 1000

function readSession() {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      const raw = storage.getItem(STORAGE_KEY)
      if (!raw) continue
      const parsed = JSON.parse(raw)
      if (parsed.expiresAt > Date.now()) return parsed
      storage.removeItem(STORAGE_KEY)
    } catch {
      storage.removeItem(STORAGE_KEY)
    }
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  function login(username, password, remember) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
          const session = {
            username,
            token: `mock-token-${Date.now()}`,
            expiresAt: Date.now() + SESSION_TTL_MS,
          }
          const storage = remember ? localStorage : sessionStorage
          storage.setItem(STORAGE_KEY, JSON.stringify(session))
          setUser(session)
          resolve(session)
        } else {
          reject(new Error('Invalid username or password.'))
        }
      }, 600)
    })
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
