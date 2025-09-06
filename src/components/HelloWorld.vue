<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  userName: {
    type: String,
    default: 'Anonymous'
  }
})

// v-model binding
const model = defineModel()

// Emits
const emit = defineEmits(['like'])

// Computed
const displayValue = computed(() => {
  return typeof model.value === 'number' ? model.value : 0
})

// Methods
function increment() {
  model.value = displayValue.value + 1
}

function decrement() {
  model.value = Math.max(0, displayValue.value - 1)
}

function handleLike() {
  emit('like')
}
</script>

<template>
  <div class="hello-world">
    <!-- Slot for custom header -->
    <slot name="header">
      <h3>🎉 Default Header</h3>
    </slot>
    
    <div class="content">
      <div class="greeting">
        <p>👋 Hello, <strong>{{ userName }}</strong>!</p>
      </div>
      
      <div class="model-display">
        <p>Parent bound v-model is: 
          <span class="model-value">{{ displayValue }}</span>
        </p>
      </div>
      
      <div class="controls">
        <button @click="increment" class="btn btn-increment">
          ➕ Increment
        </button>
        <button @click="decrement" class="btn btn-decrement">
          ➖ Decrement
        </button>
        <button @click="handleLike" class="btn btn-like">
          ❤️ Like (+5)
        </button>
      </div>
      
      <!-- Default slot -->
      <div class="slot-content">
        <slot>
          <p class="default-slot">💡 This is the default slot content</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
}

.content {
  text-align: center;
}

.greeting {
  margin-bottom: 16px;
  font-size: 1.1em;
}

.model-display {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
  backdrop-filter: blur(10px);
}

.model-value {
  font-weight: bold;
  font-size: 1.2em;
  color: #ffd700;
}

.controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.btn {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-increment {
  background-color: #4caf50;
  color: white;
}

.btn-increment:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.btn-decrement {
  background-color: #ff9800;
  color: white;
}

.btn-decrement:hover {
  background-color: #e68900;
  transform: translateY(-2px);
}

.btn-like {
  background-color: #e91e63;
  color: white;
}

.btn-like:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
}

.slot-content {
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.default-slot {
  margin: 0;
  font-style: italic;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>