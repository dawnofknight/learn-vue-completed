<template>
  <div class="not-found">
    <div class="error-content">
      <div class="error-icon">🔍</div>
      <h1 class="error-title">404 - Page Not Found</h1>
      <p class="error-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p class="error-suggestion">
        It might have been moved, deleted, or you entered the wrong URL.
      </p>
      
      <div class="action-buttons">
        <router-link to="/" class="home-button">
          🏠 Go Home
        </router-link>
        <button @click="goBack" class="back-button">
          ← Go Back
        </button>
      </div>
      
      <div class="quick-links">
        <h3>Quick Links:</h3>
        <div class="links-grid">
          <router-link to="/hello" class="quick-link">
            👋 Hello World
          </router-link>
          <router-link to="/counter" class="quick-link">
            🔢 Counter
          </router-link>
          <router-link to="/profile" class="quick-link">
            👤 User Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // Go back in history, or go to home if no history
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.error-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
}

.error-suggestion {
  color: #888;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.home-button, .back-button {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.home-button {
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
}

.back-button {
  background: #f8f9fa;
  color: #2c3e50;
  border: 2px solid #e1e5e9;
}

.home-button:hover, .back-button:hover {
  transform: translateY(-2px);
}

.quick-links {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.quick-links h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.quick-link {
  display: block;
  background: #f8f9fa;
  color: #2c3e50;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.quick-link:hover {
  background: #42b883;
  color: white;
  transform: translateY(-2px);
  border-color: #42b883;
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .home-button, .back-button {
    width: 200px;
  }
}
</style>