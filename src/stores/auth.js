import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Getters
  const getUser = computed(() => user.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)

  // Actions
  const login = async (username, password) => {
    try {
      // Simple authentication check
      if (username === 'admin' && password === 'admin') {
        user.value = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'administrator'
        }
        isAuthenticated.value = true
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('isAuthenticated', 'true')
        
        return { success: true, message: 'Login successful' }
      } else {
        return { success: false, message: 'Invalid username or password' }
      }
    } catch (err) {
      return { success: false, message: 'Login failed: ' + err.message }
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }

  const initializeAuth = () => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user')
    const storedAuth = localStorage.getItem('isAuthenticated')
    
    if (storedUser && storedAuth === 'true') {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    // Getters
    getUser,
    getIsAuthenticated,
    // Actions
    login,
    logout,
    initializeAuth
  }
})