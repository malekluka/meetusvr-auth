import { create } from 'zustand'
type User = { id: string; name: string } | null
export const useAuth = create<{ user: User; setUser: (u: User) => void; clear: () => void }>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null }),
}))

