<template>
  <div class="user-crud-page">
    <div class="page-header">
      <h1 class="page-title">
        <i class="pi pi-users mr-2"></i>
        User Management
      </h1>
      <p class="page-description">
        Manage users with full CRUD operations using MariaDB and Drizzle ORM
      </p>
    </div>
    
    <UserCrud />
  </div>
</template>

<script setup>
import UserCrud from '../components/UserCrud.vue'
</script>

<style scoped>
.user-crud-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .user-crud-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
}
</style>