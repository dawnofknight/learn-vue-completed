<template>
  <div class="scroll-demo">
    <div class="page-header">
      <h1>🧭 In-Page Navbar Scroll</h1>
      <p class="page-description">
        Click the navbar items to smoothly scroll to each section of this page. 
        The active section is highlighted as you scroll.
      </p>
    </div>

    <nav class="local-navbar" role="navigation" aria-label="Section navigation">
      <button
        v-for="item in sections"
        :key="item.id"
        class="nav-chip"
        :class="{ active: activeSection === item.id }"
        @click="scrollToSection(item.id)"
      >
        <span class="chip-icon">{{ item.icon }}</span>
        <span class="chip-text">{{ item.label }}</span>
      </button>
    </nav>

    <div class="sections">
      <section
        v-for="item in sections"
        :key="item.id"
        :id="item.id"
        class="section"
        :aria-labelledby="`${item.id}-title`"
      >
        <h2 :id="`${item.id}-title`" class="section-title">{{ item.icon }} {{ item.label }}</h2>
        <p class="section-text">{{ item.description }}</p>

        <div class="card-grid">
          <div class="card" v-for="n in 3" :key="`${item.id}-${n}`">
            <div class="card-icon">✨</div>
            <h3 class="card-title">Sample content {{ n }}</h3>
            <p class="card-desc">Reusable blocks to create scrollable height and demonstrate smooth navigation to anchors.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const sections = [
  { id: 'intro',    label: 'Intro',    icon: '👋', description: 'Overview of the in-page navbar behavior with smooth scrolling.' },
  { id: 'features', label: 'Features', icon: '🧩', description: 'Sticky navbar, smooth scrolling, and active section tracking.' },
  { id: 'examples', label: 'Examples', icon: '📚', description: 'Practical examples showing how to structure anchor targets.' },
  { id: 'contact',  label: 'Contact',  icon: '✉️', description: 'A final section as another scroll target for the demo.' }
]

const activeSection = ref(sections[0].id)
let observer

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  // Observe sections to highlight active nav item
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      root: null,
      threshold: 0.6, // section becomes active when 60% visible
    }
  )

  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.scroll-demo {
  color: #fff;
}

.page-header {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
}

.page-header h1 {
  margin: 0 0 0.25rem 0;
}

.page-description {
  margin: 0;
  opacity: 0.9;
}

/* Sticky local navbar */
.local-navbar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.75rem;
  margin: 0.75rem 0 1.25rem 0;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  backdrop-filter: blur(6px);
}

.nav-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  background: rgba(0,0,0,0.25);
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-chip:hover {
  background: rgba(0,0,0,0.35);
}

.nav-chip.active {
  border-color: #42b883;
  background: rgba(66, 184, 131, 0.25);
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.15) inset;
}

.chip-icon {
  width: 1.25rem;
  text-align: center;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.25rem;
  /* Offset for sticky navbar height when using scrollIntoView */
  scroll-margin-top: 72px;
}

.section-title {
  margin: 0 0 0.5rem 0;
}

.section-text {
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1rem;
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  margin: 0.5rem 0 0.25rem 0;
}

.card-desc {
  margin: 0;
  opacity: 0.85;
}

/* Small screens */
@media (max-width: 768px) {
  .local-navbar {
    top: 0;
  }
}
</style>

