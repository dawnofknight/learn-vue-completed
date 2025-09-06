<template>
  <div class="counter-page">
    <div class="page-header">
      <h1>🔢 Counter Component</h1>
      <p class="page-description">
        This page demonstrates reactive state management and computed properties in Vue 3.
        Watch how the counter updates in real-time and see computed values change automatically.
      </p>
    </div>

    <div class="demo-section">
      <div class="counter-demo">
        <Counter 
          :initial-count="initialValue"
          :step="stepValue"
          @count-changed="handleCountChange"
        />
      </div>

      <div class="controls-panel">
        <h3>🎮 Counter Controls</h3>
        
        <div class="control-group">
          <label for="initial-value">Initial Value:</label>
          <input 
            id="initial-value"
            v-model.number="initialValue" 
            type="number" 
            class="control-input"
          >
        </div>
        
        <div class="control-group">
          <label for="step-value">Step Value:</label>
          <input 
            id="step-value"
            v-model.number="stepValue" 
            type="number" 
            class="control-input"
          >
        </div>
        
        <div class="stats-section">
          <h4>📊 Statistics</h4>
          <div class="stat-grid">
            <div class="stat-item">
              <span class="stat-label">Current Count:</span>
              <span class="stat-value">{{ currentCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Changes:</span>
              <span class="stat-value">{{ totalChanges }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Average Value:</span>
              <span class="stat-value">{{ averageValue }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Max Reached:</span>
              <span class="stat-value">{{ maxValue }}</span>
            </div>
          </div>
        </div>
        
        <button @click="resetStats" class="reset-btn">
          🔄 Reset Statistics
        </button>
      </div>
    </div>

    <div class="multiple-counters">
      <h2>🎯 Multiple Counter Demo</h2>
      <p>See how multiple counter instances work independently:</p>
      
      <div class="counters-grid">
        <div class="counter-card" v-for="(config, index) in counterConfigs" :key="index">
          <h4>{{ config.name }}</h4>
          <Counter 
            :initial-count="config.initial"
            :step="config.step"
            @count-changed="(count) => handleMultiCounterChange(index, count)"
          />
        </div>
      </div>
      
      <div class="multi-stats">
        <h4>📈 Combined Statistics</h4>
        <p><strong>Total Sum:</strong> {{ totalSum }}</p>
        <p><strong>Active Counters:</strong> {{ counterConfigs.length }}</p>
      </div>
    </div>

    <div class="info-section">
      <h2>📚 What This Demonstrates</h2>
      <div class="info-grid">
        <div class="info-item">
          <h4>Reactive State</h4>
          <p>Using ref() to create reactive variables that automatically update the UI</p>
        </div>
        <div class="info-item">
          <h4>Computed Properties</h4>
          <p>Derived values that automatically recalculate when dependencies change</p>
        </div>
        <div class="info-item">
          <h4>Event Handling</h4>
          <p>Responding to user interactions and component events</p>
        </div>
        <div class="info-item">
          <h4>Props & Events</h4>
          <p>Passing data to components and listening for custom events</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import Counter from '../components/Counter.vue'

const initialValue = ref(0)
const stepValue = ref(1)
const currentCount = ref(0)
const totalChanges = ref(0)
const countHistory = ref([0])

const counterConfigs = reactive([
  { name: '🚀 Fast Counter', initial: 0, step: 5 },
  { name: '🐌 Slow Counter', initial: 10, step: 1 },
  { name: '⚡ Lightning Counter', initial: -5, step: 10 }
])

const multiCounterValues = ref([0, 10, -5])

const handleCountChange = (newCount) => {
  currentCount.value = newCount
  totalChanges.value++
  countHistory.value.push(newCount)
  
  // Keep history manageable
  if (countHistory.value.length > 100) {
    countHistory.value = countHistory.value.slice(-50)
  }
}

const handleMultiCounterChange = (index, newCount) => {
  multiCounterValues.value[index] = newCount
}

const averageValue = computed(() => {
  if (countHistory.value.length === 0) return 0
  const sum = countHistory.value.reduce((acc, val) => acc + val, 0)
  return Math.round((sum / countHistory.value.length) * 100) / 100
})

const maxValue = computed(() => {
  return Math.max(...countHistory.value)
})

const totalSum = computed(() => {
  return multiCounterValues.value.reduce((sum, val) => sum + val, 0)
})

const resetStats = () => {
  currentCount.value = 0
  totalChanges.value = 0
  countHistory.value = [0]
}
</script>

<style scoped>
.counter-page {
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
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.counter-demo {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-panel {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls-panel h3 {
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

.stats-section {
  margin-bottom: 1.5rem;
}

.stats-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
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

.multiple-counters {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.multiple-counters h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.multiple-counters p {
  color: #666;
  margin-bottom: 2rem;
}

.counters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.counter-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.counter-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.multi-stats {
  background: #e8f5e8;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.multi-stats h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.multi-stats p {
  margin: 0.5rem 0;
  color: #555;
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
  
  .stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>