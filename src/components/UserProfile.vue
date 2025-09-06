<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Reactive state
const user = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 25,
  avatar: '👤',
  bio: 'Vue.js enthusiast and developer',
  skills: ['JavaScript', 'Vue.js', 'CSS'],
  isOnline: true,
  lastSeen: new Date()
})

const newSkill = ref('')
const searchTerm = ref('')
const logs = ref([])
const mountTime = ref(null)

// Computed properties
const fullName = computed(() => `${user.firstName} ${user.lastName}`)
const initials = computed(() => `${user.firstName[0]}${user.lastName[0]}`)
const isAdult = computed(() => user.age >= 18)
const filteredSkills = computed(() => {
  if (!searchTerm.value) return user.skills
  return user.skills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
const profileCompleteness = computed(() => {
  let score = 0
  if (user.firstName) score += 20
  if (user.lastName) score += 20
  if (user.email) score += 20
  if (user.bio) score += 20
  if (user.skills.length > 0) score += 20
  return score
})

// Lifecycle hooks
onMounted(() => {
  mountTime.value = new Date()
  addLog('🚀 UserProfile component mounted')
  addLog(`Mount time: ${mountTime.value.toLocaleTimeString()}`)
})

// Methods
function addLog(message) {
  logs.value.unshift({
    id: Date.now(),
    message,
    timestamp: new Date().toLocaleTimeString()
  })
  
  // Keep only last 10 logs
  if (logs.value.length > 10) {
    logs.value.splice(10)
  }
}

function addSkill() {
  if (newSkill.value.trim() && !user.skills.includes(newSkill.value.trim())) {
    user.skills.push(newSkill.value.trim())
    user.lastSeen = new Date()
    newSkill.value = ''
  }
}

function removeSkill(skill) {
  const index = user.skills.indexOf(skill)
  if (index > -1) {
    user.skills.splice(index, 1)
    user.lastSeen = new Date()
  }
}

function toggleOnlineStatus() {
  user.isOnline = !user.isOnline
  user.lastSeen = new Date()
  addLog(`Status changed to: ${user.isOnline ? '🟢 Online' : '🔴 Offline'}`)
}

function clearLogs() {
  logs.value = []
}

function randomizeAvatar() {
  const avatars = ['👤', '👨', '👩', '🧑', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎨', '👩‍🎨', '🧑‍🎨']
  user.avatar = avatars[Math.floor(Math.random() * avatars.length)]
}
</script>

<template>
  <div class="user-profile">
    <div class="profile-header">
      <h3>👤 User Profile with Watchers & Lifecycle</h3>
      <div class="profile-stats">
        <span class="stat">
          <strong>Completeness:</strong> {{ profileCompleteness }}%
        </span>
        <span class="stat">
          <strong>Updates:</strong> {{ updateCount }}
        </span>
        <span class="stat" v-if="mountTime">
          <strong>Mounted:</strong> {{ mountTime.toLocaleTimeString() }}
        </span>
      </div>
    </div>

    <div class="profile-content">
      <!-- Avatar and Basic Info -->
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar" @click="randomizeAvatar">
            {{ user.avatar }}
          </div>
          <div class="online-status" :class="{ online: user.isOnline, offline: !user.isOnline }">
            {{ user.isOnline ? '🟢 Online' : '🔴 Offline' }}
          </div>
          <button @click="toggleOnlineStatus" class="btn btn-sm">
            Toggle Status
          </button>
        </div>
        
        <div class="profile-info">
          <div class="form-group">
            <label>First Name:</label>
            <input v-model="user.firstName" class="input" />
          </div>
          
          <div class="form-group">
            <label>Last Name:</label>
            <input v-model="user.lastName" class="input" />
          </div>
          
          <div class="form-group">
            <label>Email:</label>
            <input v-model="user.email" type="email" class="input" />
          </div>
          
          <div class="form-group">
            <label>Age:</label>
            <input v-model.number="user.age" type="number" min="0" max="120" class="input" />
          </div>
          
          <div class="form-group">
            <label>Bio:</label>
            <textarea v-model="user.bio" class="textarea" rows="3"></textarea>
          </div>
        </div>
      </div>

      <!-- Computed Properties Display -->
      <div class="computed-section">
        <h4>🧮 Computed Properties</h4>
        <div class="computed-grid">
          <div class="computed-item">
            <strong>Full Name:</strong> {{ fullName }}
          </div>
          <div class="computed-item">
            <strong>Initials:</strong> {{ initials }}
          </div>
          <div class="computed-item">
            <strong>Age Status:</strong> 
            <span :class="{ adult: isAdult, minor: !isAdult }">
              {{ isAdult ? '🔞 Adult' : '👶 Minor' }}
            </span>
          </div>
          <div class="computed-item">
            <strong>Last Seen:</strong> {{ user.lastSeen.toLocaleTimeString() }}
          </div>
        </div>
      </div>

      <!-- Skills Management -->
      <div class="skills-section">
        <h4>🛠️ Skills Management</h4>
        <div class="skills-controls">
          <input 
            v-model="newSkill" 
            @keyup.enter="addSkill"
            placeholder="Add a new skill"
            class="input"
          />
          <button @click="addSkill" class="btn btn-primary">Add Skill</button>
        </div>
        
        <div class="skills-filter">
          <input 
            v-model="searchTerm" 
            placeholder="Filter skills..."
            class="input"
          />
        </div>
        
        <div class="skills-list">
          <div 
            v-for="skill in filteredSkills" 
            :key="skill"
            class="skill-tag"
          >
            {{ skill }}
            <button @click="removeSkill(skill)" class="skill-remove">×</button>
          </div>
          <div v-if="filteredSkills.length === 0" class="no-skills">
            {{ searchTerm ? 'No matching skills found' : 'No skills added yet' }}
          </div>
        </div>
      </div>

      <!-- Watcher Logs -->
      <div class="logs-section">
        <div class="logs-header">
          <h4>📝 Watcher Logs</h4>
          <button @click="clearLogs" class="btn btn-sm btn-secondary">Clear Logs</button>
        </div>
        
        <div class="logs-container">
          <div 
            v-for="log in logs" 
            :key="log.id"
            class="log-entry"
          >
            <span class="log-time">{{ log.timestamp }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
          <div v-if="logs.length === 0" class="no-logs">
            No activity logs yet. Try changing some values above!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin: 20px 0;
}

.profile-header {
  text-align: center;
  margin-bottom: 24px;
}

.profile-header h3 {
  margin: 0 0 12px 0;
  font-size: 1.4em;
}

.profile-stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  backdrop-filter: blur(10px);
}

.profile-content {
  display: grid;
  gap: 20px;
}

.profile-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.online-status {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.online-status.online {
  background: rgba(76, 175, 80, 0.3);
}

.online-status.offline {
  background: rgba(244, 67, 54, 0.3);
}

.profile-info {
  display: grid;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9em;
  opacity: 0.9;
}

.input, .textarea {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
}

.input::placeholder, .textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.computed-section, .skills-section, .logs-section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.computed-section h4, .skills-section h4, .logs-section h4 {
  margin: 0 0 16px 0;
  font-size: 1.1em;
}

.computed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.computed-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9em;
}

.adult {
  color: #4caf50;
  font-weight: 600;
}

.minor {
  color: #ff9800;
  font-weight: 600;
}

.skills-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.skills-filter {
  margin-bottom: 16px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-remove {
  background: rgba(244, 67, 54, 0.7);
  border: none;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-skills, .no-logs {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.logs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logs-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
}

.log-entry {
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85em;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
  min-width: 80px;
}

.log-message {
  flex: 1;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.8em;
}

@media (max-width: 768px) {
  .profile-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .computed-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-controls {
    flex-direction: column;
  }
  
  .profile-stats {
    flex-direction: column;
    align-items: center;
  }
}
</style>