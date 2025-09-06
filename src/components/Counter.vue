<script setup>
import { ref, computed, reactive } from 'vue'

// Props
const props = defineProps({
  initialValue: {
    type: Number,
    default: 0
  },
  step: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  }
})

// Reactive state
const count = ref(props.initialValue)
const history = reactive([])

// Computed properties
const isAtMax = computed(() => count.value >= props.max)
const isAtMin = computed(() => count.value <= props.min)
const percentage = computed(() => {
  const range = props.max - props.min
  const current = count.value - props.min
  return Math.round((current / range) * 100)
})
const status = computed(() => {
  if (percentage.value < 25) return { text: 'Low', color: '#f44336' }
  if (percentage.value < 50) return { text: 'Medium', color: '#ff9800' }
  if (percentage.value < 75) return { text: 'Good', color: '#2196f3' }
  return { text: 'Excellent', color: '#4caf50' }
})

// Methods
function increment() {
  if (!isAtMax.value) {
    const oldValue = count.value
    count.value += props.step
    addToHistory('increment', oldValue, count.value)
  }
}

function decrement() {
  if (!isAtMin.value) {
    const oldValue = count.value
    count.value -= props.step
    addToHistory('decrement', oldValue, count.value)
  }
}

function reset() {
  const oldValue = count.value
  count.value = props.initialValue
  addToHistory('reset', oldValue, count.value)
}

function addToHistory(action, from, to) {
  history.unshift({
    id: Date.now(),
    action,
    from,
    to,
    timestamp: new Date().toLocaleTimeString()
  })
  
  // Keep only last 5 entries
  if (history.length > 5) {
    history.splice(5)
  }
}

function clearHistory() {
  history.splice(0)
}
</script>

<template>
  <div class="counter-component">
    <div class="counter-header">
      <h3>🔢 Advanced Counter</h3>
      <p class="counter-description">
        Range: {{ min }} - {{ max }} | Step: {{ step }}
      </p>
    </div>
    
    <div class="counter-display">
      <div class="count-circle" :style="{ borderColor: status.color }">
        <span class="count-number">{{ count }}</span>
        <span class="count-percentage">{{ percentage }}%</span>
      </div>
      
      <div class="status-indicator">
        <span class="status-text" :style="{ color: status.color }">
          {{ status.text }}
        </span>
      </div>
    </div>
    
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ 
          width: percentage + '%', 
          backgroundColor: status.color 
        }"
      ></div>
    </div>
    
    <div class="counter-controls">
      <button 
        @click="decrement" 
        :disabled="isAtMin"
        class="btn btn-decrement"
        :class="{ disabled: isAtMin }"
      >
        ➖ -{{ step }}
      </button>
      
      <button @click="reset" class="btn btn-reset">
        🔄 Reset
      </button>
      
      <button 
        @click="increment" 
        :disabled="isAtMax"
        class="btn btn-increment"
        :class="{ disabled: isAtMax }"
      >
        ➕ +{{ step }}
      </button>
    </div>
    
    <div v-if="history.length > 0" class="history-section">
      <div class="history-header">
        <h4>📜 History</h4>
        <button @click="clearHistory" class="btn-clear">Clear</button>
      </div>
      
      <div class="history-list">
        <div 
          v-for="entry in history" 
          :key="entry.id"
          class="history-item"
        >
          <span class="history-action">{{ entry.action }}</span>
          <span class="history-change">{{ entry.from }} → {{ entry.to }}</span>
          <span class="history-time">{{ entry.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.counter-component {
  background: linear-gradient(145deg, #f0f2f5, #ffffff);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  border: 1px solid #e1e5e9;
}

.counter-header {
  text-align: center;
  margin-bottom: 24px;
}

.counter-header h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1.4em;
}

.counter-description {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9em;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.count-circle {
  width: 120px;
  height: 120px;
  border: 4px solid #3498db;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: border-color 0.3s ease;
}

.count-number {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1;
}

.count-percentage {
  font-size: 0.8em;
  color: #7f8c8d;
  margin-top: 4px;
}

.status-indicator {
  text-align: center;
}

.status-text {
  font-weight: 600;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 4px;
}

.counter-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.btn-increment {
  background-color: #27ae60;
  color: white;
}

.btn-increment:hover:not(.disabled) {
  background-color: #229954;
  transform: translateY(-2px);
}

.btn-decrement {
  background-color: #e74c3c;
  color: white;
}

.btn-decrement:hover:not(.disabled) {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.btn-reset {
  background-color: #95a5a6;
  color: white;
}

.btn-reset:hover {
  background-color: #7f8c8d;
  transform: translateY(-2px);
}

.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.history-section {
  border-top: 1px solid #e1e5e9;
  padding-top: 20px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1em;
}

.btn-clear {
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
  transition: all 0.3s ease;
}

.btn-clear:hover {
  background-color: #e74c3c;
  color: white;
}

.history-list {
  max-height: 150px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 0.85em;
}

.history-action {
  font-weight: 600;
  color: #3498db;
  text-transform: capitalize;
  min-width: 80px;
}

.history-change {
  color: #2c3e50;
  font-family: monospace;
}

.history-time {
  color: #7f8c8d;
  font-size: 0.8em;
}

@media (max-width: 768px) {
  .counter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
  
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>