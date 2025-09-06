<template>
  <div class="app">
    <Sidebar />
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'

const sidebarCollapsed = ref(false)

// Listen for sidebar collapse events if needed
onMounted(() => {
  console.log('Vue 3 Demo App with Router loaded!')
})
</script>



<style scoped>
* {
  box-sizing: border-box;
}

.app {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content.sidebar-collapsed {
  margin-left: 70px;
}

.content-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  
  .content-wrapper {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0.5rem;
  }
}
</style>
