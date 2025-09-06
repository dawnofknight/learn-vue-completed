<template>
  <div class="user-profile-page">
    <div class="page-header">
      <h1>👤 User Profile Component</h1>
      <p class="page-description">
        This page demonstrates advanced Vue 3 features including watchers, lifecycle hooks, 
        and complex state management. See how the profile updates in real-time as you interact with it.
      </p>
    </div>

    <div class="demo-section">
      <div class="profile-demo">
        <UserProfile />
      </div>

      <div class="insights-panel">
        <h3>🔍 Profile Insights</h3>
        
        <div class="insight-card">
          <h4>📊 Profile Completeness</h4>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: profileCompleteness + '%' }"
            ></div>
          </div>
          <p class="progress-text">{{ profileCompleteness }}% Complete</p>
        </div>
        
        <div class="insight-card">
          <h4>⏰ Activity Status</h4>
          <div class="status-indicator">
            <span 
              class="status-dot" 
              :class="{ online: isOnline, offline: !isOnline }"
            ></span>
            <span class="status-text">
              {{ isOnline ? 'Online' : 'Offline' }}
            </span>
          </div>
          <p class="last-seen">Last seen: {{ formatLastSeen }}</p>
        </div>
        
        <div class="insight-card">
          <h4>🎯 Skills Overview</h4>
          <div class="skills-stats">
            <div class="stat-item">
              <span class="stat-label">Total Skills:</span>
              <span class="stat-value">{{ totalSkills }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Skill Categories:</span>
              <span class="stat-value">{{ skillCategories }}</span>
            </div>
          </div>
        </div>
        
        <div class="insight-card">
          <h4>📈 Profile Tips</h4>
          <ul class="tips-list">
            <li v-if="profileCompleteness < 50" class="tip-item">
              💡 Add more personal information to improve your profile
            </li>
            <li v-if="totalSkills < 3" class="tip-item">
              🎯 Add more skills to showcase your expertise
            </li>
            <li v-if="!isOnline" class="tip-item">
              🟢 Go online to show you're available
            </li>
            <li v-if="profileCompleteness >= 80" class="tip-item">
              ⭐ Great job! Your profile looks complete
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="features-showcase">
      <h2>🛠️ Technical Features Demonstrated</h2>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">👀</div>
          <h4>Watchers</h4>
          <p>Reactive monitoring of data changes with immediate response to user input modifications.</p>
          <div class="code-snippet">
            <code>watch(user.firstName, (newVal) => { ... })</code>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h4>Lifecycle Hooks</h4>
          <p>Component lifecycle management with onMounted, onUpdated, and onBeforeUnmount hooks.</p>
          <div class="code-snippet">
            <code>onMounted(() => { ... })</code>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h4>Computed Properties</h4>
          <p>Automatically calculated values that update when their dependencies change.</p>
          <div class="code-snippet">
            <code>const fullName = computed(() => ...)</code>
          </div>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h4>Reactive State</h4>
          <p>Complex state management with reactive objects and arrays for dynamic data.</p>
          <div class="code-snippet">
            <code>const user = reactive({ ... })</code>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h2>📚 Learning Objectives</h2>
      <div class="objectives-grid">
        <div class="objective-item">
          <h4>🎯 Watchers</h4>
          <p>Learn how to watch for changes in reactive data and respond accordingly</p>
        </div>
        <div class="objective-item">
          <h4>🔄 Lifecycle</h4>
          <p>Understand component lifecycle and when to use different lifecycle hooks</p>
        </div>
        <div class="objective-item">
          <h4>📊 Complex State</h4>
          <p>Manage complex state with nested objects and arrays</p>
        </div>
        <div class="objective-item">
          <h4>🎨 Real-time UI</h4>
          <p>Create responsive interfaces that update immediately with data changes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import UserProfile from '../components/UserProfile.vue'

// Mock data for insights (in a real app, this would come from the UserProfile component)
const profileCompleteness = ref(65)
const isOnline = ref(true)
const lastSeen = ref(new Date())
const totalSkills = ref(4)

// Computed properties for insights
const skillCategories = computed(() => {
  // This would normally be calculated from actual skills data
  return Math.ceil(totalSkills.value / 2)
})

const formatLastSeen = computed(() => {
  const now = new Date()
  const diff = now - lastSeen.value
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} minutes ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`
  
  const days = Math.floor(hours / 24)
  return `${days} days ago`
})

// Simulate real-time updates
onMounted(() => {
  // Update last seen periodically
  setInterval(() => {
    if (isOnline.value) {
      lastSeen.value = new Date()
    }
  }, 30000) // Update every 30 seconds
  
  // Simulate profile completeness changes
  setInterval(() => {
    // Random small changes to simulate user interaction
    const change = Math.random() > 0.5 ? 1 : -1
    const newValue = profileCompleteness.value + change
    if (newValue >= 0 && newValue <= 100) {
      profileCompleteness.value = newValue
    }
  }, 10000) // Update every 10 seconds
})
</script>

<style scoped>
.user-profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.demo-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.profile-demo {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.insights-panel {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.insights-panel h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.insight-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.insight-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #42b883, #35495e);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.status-dot.online {
  background-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
}

.status-dot.offline {
  background-color: #f44336;
}

.status-text {
  font-weight: 500;
  color: #2c3e50;
}

.last-seen {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.skills-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: bold;
  color: #42b883;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
  border-bottom: 1px solid #eee;
}

.tip-item:last-child {
  border-bottom: none;
}

.features-showcase {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.features-showcase h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.code-snippet {
  background: #2c3e50;
  color: #42b883;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.info-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
}

.info-section h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.objective-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.objective-item h4 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.objective-item p {
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .demo-section {
    grid-template-columns: 1fr;
  }
}
</style>