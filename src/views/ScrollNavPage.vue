<template>
  <div class="scroll-demo">
    <div class="page-header">
      <h1>🧭 In-Page Navbar Scroll</h1>
      <p class="page-description">
        Click the navbar items to smoothly scroll to each section of this page.
        The active section is highlighted as you scroll.
      </p>
    </div>

    <nav
      class="local-navbar"
      role="navigation"
      aria-label="Section navigation"
    >
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
        <h2
          :id="`${item.id}-title`"
          class="section-title"
        >
          {{ item.icon }} {{ item.label }}
        </h2>
        <p class="section-text">{{ item.description }}</p>

        <!-- Lifecycle education block -->
        <div
          v-if="item.id === 'lifecycle'"
          class="lifecycle-grid"
        >
          <div class="card wide">
            <div class="card-icon">🗺️</div>
            <h3 class="card-title">Vue Lifecycle Overview Diagram</h3>
            <p class="card-desc">
              A high-level map of how a component moves from setup to mounted,
              updates, and unmount.
            </p>
            <figure class="diagram">
              <a
                href="https://vuejs.org/assets/lifecycle.MuZLBFAS.png"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open lifecycle diagram in a new tab"
              >
                <img
                  src="https://vuejs.org/assets/lifecycle.MuZLBFAS.png"
                  alt="Vue component lifecycle flowchart showing setup, mount, update, and unmount phases"
                  loading="lazy"
                />
              </a>
              <figcaption>
                Source: vuejs.org — click the image to view full size.
              </figcaption>
            </figure>
          </div>

          <div class="card">
            <div class="card-icon">⚙️</div>
            <h3 class="card-title">What is a Lifecycle Hook?</h3>
            <p class="card-desc">
              Every Vue component goes through a series of stages: it is
              created, mounted to the DOM, updated when its data changes, and
              finally unmounted.
              <strong>Lifecycle hooks</strong> let you run code at specific
              stages.
            </p>
            <div class="callout">
              Think of hooks as “events” that fire at predictable times in a
              component’s life.
            </div>
          </div>

          <div class="card">
            <div class="card-icon">🟢</div>
            <h3 class="card-title">onMounted()</h3>
            <p class="card-desc">
              Runs once after the component is added to the page and its
              template is in the DOM. Perfect for code that needs real DOM nodes
              or browser APIs.
            </p>
            <pre
              class="code-block"
              v-pre
            ><code>
            import { onMounted } from 'vue'
            onMounted(() => {
              // Safe to touch the DOM here
              const el = document.getElementById('intro')
              console.log('Mounted! Section exists?', !!el)

              // Typical uses:
              // - Add event listeners
              // - Fetch data
              // - Start timers/intervals
              // - Initialize libraries that need DOM
            })
        </code></pre>
            <div class="callout tip">
              Tip: If your code needs to read sizes/positions of elements, do it
              in <code>onMounted</code> so the DOM is ready.
            </div>
          </div>

          <div class="card">
            <div class="card-icon">🔴</div>
            <h3 class="card-title">onBeforeUnmount()</h3>
            <p class="card-desc">
              Runs right before the component is removed from the page. Use it
              to <strong>clean up</strong> anything you started in
              <code>onMounted</code>.
            </p>
            <pre
              class="code-block"
              v-pre
            ><code>import { onMounted, onBeforeUnmount } from 'vue'

let intervalId

onMounted(() => {
  intervalId = setInterval(() => console.log('tick'), 1000)
})

onBeforeUnmount(() => {
  // Clean up listeners, timers, observers, etc.
  clearInterval(intervalId)
})</code></pre>
            <div class="callout warn">
              Always pair setup and cleanup. Forgetting cleanup can cause memory
              leaks and weird bugs when components are toggled.
            </div>
          </div>

          <div class="card">
            <div class="card-icon">🔍</div>
            <h3 class="card-title">How this page uses them</h3>
            <ul class="bullet-list">
              <li>
                In <code>onMounted</code>, we create an
                <code>IntersectionObserver</code> to track which section is
                visible.
              </li>
              <li>
                In <code>onBeforeUnmount</code>, we call
                <code>observer.disconnect()</code> to remove it when leaving the
                page.
              </li>
              <li>This is a classic setup/cleanup pattern you’ll use often.</li>
            </ul>
            <pre
              class="code-block"
              v-pre
            ><code>let observer

onMounted(() => {
  observer = new IntersectionObserver(/* ... */)
  document.querySelectorAll('section').forEach(el => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})</code></pre>
          </div>

          <div class="card">
            <div class="card-icon">🧠</div>
            <h3 class="card-title">Mental model</h3>
            <ul class="bullet-list">
              <li><strong>Mount</strong>: component appears → start things.</li>
              <li>
                <strong>Update</strong>: data changes → DOM updates (no special
                hook needed most of the time).
              </li>
              <li>
                <strong>Before unmount</strong>: component about to disappear →
                stop things.
              </li>
            </ul>
          </div>
        </div>

        <!-- PrimeVue showcase section -->
        <div
          v-else-if="item.id === 'primevue'"
          class="primevue-demo"
        >
          <div class="prime-demo-panel">
            <div class="prime-demo-header">
              <h3>PrimeVue UI Components</h3>
              <p>
                PrimeVue ships with an extensive set of accessible, themeable
                components. Here's a tiny preview you can interact with.
              </p>
            </div>

            <div class="prime-tag-row">
              <Tag
                v-for="highlight in primeHighlights"
                :key="highlight.label"
                :value="highlight.label"
                :severity="highlight.severity"
                rounded
              />
            </div>

            <div class="prime-control-bar">
              <span class="control-label">Live preview</span>
              <InputSwitch
                v-model="primeFeatureEnabled"
                aria-label="Toggle PrimeVue preview"
              />
              <span class="control-value">{{ primeStatusLabel }}</span>
            </div>

            <div class="prime-select">
              <span class="control-label">Button style</span>
              <SelectButton
                v-model="selectedPrimeStyle"
                :options="primeStyleOptions"
                optionLabel="label"
                optionValue="value"
                aria-label="Choose button style"
                :disabled="!primeFeatureEnabled"
              />
            </div>

            <div
              class="prime-button-row"
              :class="{ disabled: !primeFeatureEnabled }"
            >
              <Button
                label="Success"
                severity="success"
                :disabled="!primeFeatureEnabled"
              />
              <Button
                label="Text"
                text
                :disabled="!primeFeatureEnabled"
              />
              <Button
                :label="primeDynamicButtonLabel"
                :severity="primeDynamicButtonSeverity"
                :disabled="!primeFeatureEnabled"
              />
            </div>

            <Button
              class="prime-action-btn"
              label="Increment counter"
              severity="secondary"
              :disabled="!primeFeatureEnabled"
              @click="handlePrimeDemoClick"
            />

            <p class="prime-clicks">
              You've clicked the PrimeVue button
              <strong>{{ primeDemoClicks }}</strong>
              {{ primeDemoClicks === 1 ? "time" : "times" }}.
            </p>
          </div>
        </div>

        <!-- Default content for other sections -->
        <div
          v-else
          class="card-grid"
        >
          <div
            class="card"
            v-for="n in 3"
            :key="`${item.id}-${n}`"
          >
            <div class="card-icon">✨</div>
            <h3 class="card-title">Sample content {{ n }}</h3>
            <p class="card-desc">
              Reusable blocks to create scrollable height and demonstrate smooth
              navigation to anchors.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Button from "primevue/button";
import InputSwitch from "primevue/inputswitch";
import SelectButton from "primevue/selectbutton";
import Tag from "primevue/tag";

const sections = [
  {
    id: "intro",
    label: "Intro",
    icon: "👋",
    description:
      "Overview of the in-page navbar behavior with smooth scrolling.",
  },
  {
    id: "features",
    label: "Features",
    icon: "🧩",
    description:
      "Sticky navbar, smooth scrolling, and active section tracking.",
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    icon: "⏱️",
    description:
      "Beginner-friendly explanation of onMounted and onBeforeUnmount.",
  },
  {
    id: "primevue",
    label: "PrimeVue",
    icon: "💎",
    description:
      "See a few ready-to-use components from the PrimeVue library in action.",
  },
  {
    id: "examples",
    label: "Examples",
    icon: "📚",
    description: "Practical examples showing how to structure anchor targets.",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "✉️",
    description: "A final section as another scroll target for the demo.",
  },
];

const activeSection = ref(sections[0].id);
let observer;

const primeDemoClicks = ref(0);
const primeFeatureEnabled = ref(true);
const primeHighlights = [
  { label: "70+ Components", severity: "success" },
  { label: "Accessible", severity: "info" },
  { label: "Themeable", severity: "warn" },
];
const primeStyleOptions = [
  { label: "Primary", value: "primary" },
  { label: "Success", value: "success" },
  { label: "Info", value: "info" },
];
const selectedPrimeStyle = ref(primeStyleOptions[0].value);

const primeStatusLabel = computed(() =>
  primeFeatureEnabled.value ? "Enabled" : "Disabled"
);

const primeDynamicButtonSeverity = computed(() =>
  selectedPrimeStyle.value === "primary" ? null : selectedPrimeStyle.value
);

const primeDynamicButtonLabel = computed(
  () =>
    primeStyleOptions.find(
      (option) => option.value === selectedPrimeStyle.value
    )?.label ?? "Primary"
);

const handlePrimeDemoClick = () => {
  if (!primeFeatureEnabled.value) return;
  primeDemoClicks.value += 1;
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "instant", block: "start" });
};

onMounted(() => {
  // Observe sections to highlight active nav item
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    {
      root: null,
      threshold: 0.6, // section becomes active when 60% visible
    }
  );

  sections.forEach((s) => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
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
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-chip:hover {
  background: rgba(0, 0, 0, 0.35);
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

.primevue-demo {
  display: flex;
}

.prime-demo-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  padding: 1.25rem;
}

.prime-demo-header h3 {
  margin: 0 0 0.25rem 0;
}

.prime-demo-header p {
  margin: 0;
  opacity: 0.85;
}

.prime-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prime-control-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.control-label {
  font-weight: 600;
}

.control-value {
  font-weight: 600;
}

.prime-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prime-select :deep(.p-selectbutton) {
  display: inline-flex;
}

.prime-button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prime-button-row.disabled {
  opacity: 0.5;
}

.prime-action-btn {
  align-self: flex-start;
}

.prime-clicks {
  margin: 0;
  font-weight: 500;
}

/* Lifecycle education styles */
.lifecycle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.lifecycle-grid .card.wide {
  grid-column: 1 / -1;
}

.code-block {
  margin-top: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 0.75rem;
  overflow-x: auto;
  line-height: 1.4;
  font-size: 0.9rem;
}

.callout {
  margin-top: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.callout.tip {
  border-color: rgba(66, 184, 131, 0.6);
}

.callout.warn {
  border-color: rgba(255, 196, 0, 0.8);
}

.bullet-list {
  margin: 0.25rem 0 0.5rem 1rem;
}
.bullet-list li {
  margin: 0.2rem 0;
}

.diagram {
  margin: 0.5rem 0 0 0;
}
.diagram img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.diagram figcaption {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.85;
}

/* Small screens */
@media (max-width: 768px) {
  .local-navbar {
    top: 0;
  }
}
</style>
