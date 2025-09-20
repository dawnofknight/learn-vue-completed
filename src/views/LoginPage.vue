<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Redirect if already logged in
onMounted(() => {
  if (authStore.getIsAuthenticated) {
    router.push('/')
  }
})
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
}
</style>