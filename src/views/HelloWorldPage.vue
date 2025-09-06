<template>
  <div class="hello-world-page">
    <div class="page-header">
      <h1>👋 Hello World Component</h1>
      <p class="page-description">
        This page demonstrates basic Vue 3 component features including props, events, and slots.
        It showcases how components can communicate with their parent and accept dynamic content.
      </p>
    </div>

    <div class="demo-section">
      <div class="demo-card">
        <h2>🎯 Interactive Demo</h2>
        <HelloWorld 
          :msg="message" 
          :count="clickCount"
          @increment="handleIncrement"
          @custom-event="handleCustomEvent"
        >
          <template #header>
            <div class="custom-header">
              <span class="emoji">🌟</span>
              <span>Custom Header Slot Content</span>
            </div>
          </template>
          
          <template #default>
            <p class="slot-content">
              This content is passed through the default slot! 
              You can put any content here, including other components.
            </p>
          </template>
          
          <template #footer>
            <div class="custom-footer">
              <small>📝 Custom footer with additional info</small>
            </div>
          </template>
        </HelloWorld>
      </div>

      <div class="controls-card">
        <h3>🎮 Controls</h3>
        <div class="control-group">
          <label for="message-input">Message Prop:</label>
          <input 
            id="message-input"
            v-model="message" 
            type="text" 
            placeholder="Enter a message"
            class="control-input"
          >
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Button Clicks:</span>
            <span class="stat-value">{{ clickCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Custom Events:</span>
            <span class="stat-value">{{ customEventCount }}</span>
          </div>
        </div>
        
        <button @click="resetCounters" class="reset-btn">
          🔄 Reset Counters
        </button>
      </div>
    </div>

    <div class="info-section">
      <h2>📚 What This Demonstrates</h2>
      <div class="info-grid">
        <div class="info-item">
          <h4>Props</h4>
          <p>Data passed from parent to child component</p>
        </div>
        <div class="info-item">
          <h4>Events</h4>
          <p>Child component communicating back to parent</p>
        </div>
        <div class="info-item">
          <h4>Slots</h4>
          <p>Flexible content insertion with named slots</p>
        </div>
        <div class="info-item">
          <h4>Reactivity</h4>
          <p>Real-time updates when data changes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

const message = ref('Hello from Vue 3! 🚀')
const clickCount = ref(0)
const customEventCount = ref(0)

const handleIncrement = () => {
  clickCount.value++
}

const handleCustomEvent = (data) => {
  customEventCount.value++
  console.log('Custom event received:', data)
}

const resetCounters = () => {
  clickCount.value = 0
  customEventCount.value = 0
}
</script>

<style scoped>
.hello-world-page {
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

.demo-card, .controls-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls-card h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.control-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.control-input:focus {
  outline: none;
  border-color: #42b883;
}

.stats {
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #42b883;
}

.reset-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
}

.custom-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #42b883;
}

.emoji {
  font-size: 1.2rem;
}

.slot-content {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
  margin: 1rem 0;
}

.custom-footer {
  text-align: center;
  color: #666;
  font-style: italic;
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item h4 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .demo-section {
    grid-template-columns: 1fr;
  }
}
</style>