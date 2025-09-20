<template>
  <div class="login-form">
    <Card style="width: 400px; margin: 0 auto;">
      <template #title>
        <div class="text-center">
          <h2>Login</h2>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin" class="p-fluid">
          <div class="field">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Enter username"
              :class="{ 'p-invalid': usernameError }"
            />
            <small v-if="usernameError" class="p-error">{{ usernameError }}</small>
          </div>

          <div class="field">
            <label for="password">Password</label>
            <Password
              id="password"
              v-model="password"
              placeholder="Enter password"
              :feedback="false"
              :class="{ 'p-invalid': passwordError }"
            />
            <small v-if="passwordError" class="p-error">{{ passwordError }}</small>
          </div>

          <div class="field" v-if="loginError">
            <Message severity="error" :closable="false">{{ loginError }}</Message>
          </div>

          <div class="field">
            <Button
              type="submit"
              label="Login"
              :loading="loading"
              class="w-full"
            />
          </div>

          <div class="field text-center">
            <small class="text-muted">
              Demo credentials: admin / admin
            </small>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const username = ref('')
const password = ref('')
const loading = ref(false)

// Error states
const usernameError = ref('')
const passwordError = ref('')
const loginError = ref('')

// Validation
const validateForm = () => {
  usernameError.value = ''
  passwordError.value = ''
  loginError.value = ''

  let isValid = true

  if (!username.value.trim()) {
    usernameError.value = 'Username is required'
    isValid = false
  }

  if (!password.value.trim()) {
    passwordError.value = 'Password is required'
    isValid = false
  }

  return isValid
}

// Handle login
const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const result = await authStore.login(username.value, password.value)
    
    if (result.success) {
      // Redirect to home page or dashboard
      router.push('/')
    } else {
      loginError.value = result.message
    }
  } catch (error) {
    loginError.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.field {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.text-muted {
  color: #6c757d;
}

.w-full {
  width: 100%;
}
</style>