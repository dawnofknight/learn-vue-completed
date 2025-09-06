<template>
  <div class="home">
    <div class="hero">
      <h1>🚀 Vue 3 Composition API Demo</h1>
      <p class="hero-subtitle">Explore modern Vue.js features with interactive examples</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">👋</div>
        <h3>Hello World</h3>
        <p>Basic component with props, events, and slots demonstration</p>
        <router-link to="/hello" class="feature-link">Explore →</router-link>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔢</div>
        <h3>Counter</h3>
        <p>Reactive state management and computed properties showcase</p>
        <router-link to="/counter" class="feature-link">Explore →</router-link>
      </div>

      <div class="feature-card">
        <div class="feature-icon">👤</div>
        <h3>User Profile</h3>
        <p>Watchers, lifecycle hooks, and complex state management</p>
        <router-link to="/profile" class="feature-link">Explore →</router-link>
      </div>
    </div>

    <div class="info-section">
      <h2>🎯 What You'll Learn</h2>
      <ul class="learning-list">
        <li>Vue 3 Composition API fundamentals</li>
        <li>Reactive state management with ref() and reactive()</li>
        <li>Computed properties and watchers</li>
        <li>Component communication (props, events, slots)</li>
        <li>Lifecycle hooks in Composition API</li>
        <li>Modern Vue.js best practices</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Home page - no complex logic needed
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #42b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-link {
  display: inline-block;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.feature-link:hover {
  transform: scale(1.05);
}

.info-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.info-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.learning-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  text-align: left;
}

.learning-list li {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.learning-list li::before {
  content: '✅';
  margin-right: 0.5rem;
}
</style>