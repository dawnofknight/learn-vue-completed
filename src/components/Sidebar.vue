<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">🚀</span>
        <span class="logo-text" v-show="!isCollapsed">Vue 3 Demo</span>
      </div>
      <button 
        class="collapse-btn" 
        @click="toggleCollapse"
        :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <span class="collapse-icon">{{ isCollapsed ? '→' : '←' }}</span>
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li 
          v-for="route in navigationRoutes" 
          :key="route.name"
          class="nav-item"
        >
          <router-link 
            :to="route.path" 
            class="nav-link"
            :class="{ active: $route.name === route.name }"
            :title="isCollapsed ? route.meta.title : ''"
          >
            <span class="nav-icon">{{ route.meta.icon }}</span>
            <span class="nav-text" v-show="!isCollapsed">{{ route.meta.title }}</span>
            <span class="nav-badge" v-show="!isCollapsed && route.meta.badge">
              {{ route.meta.badge }}
            </span>
          </router-link>
          
          <div class="nav-description" v-show="!isCollapsed">
            {{ route.meta.description }}
          </div>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer" v-show="!isCollapsed">
      <div class="footer-content">
        <div class="current-route">
          <span class="route-icon">📍</span>
          <span class="route-name">{{ $route.meta.title || 'Unknown' }}</span>
        </div>
        <div class="footer-info">
          <small>Vue 3 + Composition API</small>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '../router'

const route = useRoute()
const isCollapsed = ref(false)

// Filter out the catch-all route and only show main navigation routes
const navigationRoutes = computed(() => {
  return routes.filter(route => 
    route.name !== 'NotFound' && 
    route.meta && 
    route.meta.title
  )
})

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// Auto-collapse on mobile
const checkMobile = () => {
  if (window.innerWidth <= 768) {
    isCollapsed.value = true
  }
}

// Check on mount and resize
if (typeof window !== 'undefined') {
  checkMobile()
  window.addEventListener('resize', checkMobile)
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
}

.collapse-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.collapse-icon {
  font-size: 1rem;
  font-weight: bold;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 0;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
  border-right: 3px solid #42b883;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #42b883;
}

.nav-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
  white-space: nowrap;
}

.nav-badge {
  background: #42b883;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  margin-left: auto;
}

.nav-description {
  padding: 0.25rem 1.5rem 0.5rem 3.25rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
}

.footer-content {
  text-align: center;
}

.current-route {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.route-icon {
  font-size: 1rem;
}

.route-name {
  font-weight: 500;
}

.footer-info {
  color: rgba(255, 255, 255, 0.6);
}

.footer-info small {
  font-size: 0.75rem;
}

/* Scrollbar styling */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease, width 0.3s ease;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    width: 280px;
    transform: translateX(-100%);
  }
}

/* Animation for text elements */
.nav-text, .nav-description, .logo-text {
  transition: opacity 0.2s ease;
}

.collapsed .nav-text,
.collapsed .nav-description,
.collapsed .logo-text {
  opacity: 0;
}
</style>