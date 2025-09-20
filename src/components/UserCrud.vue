<template>
  <div class="user-crud">
    <Card>
      <template #title>
        <div class="flex justify-content-between align-items-center">
          <span>User Management</span>
          <Button 
            label="Add User" 
            icon="pi pi-plus" 
            @click="showAddDialog = true"
            class="p-button-success"
          />
        </div>
      </template>
      
      <template #content>
        <!-- Users Table -->
        <DataTable 
          :value="users" 
          :loading="loading"
          paginator 
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20]"
          responsiveLayout="scroll"
          class="p-datatable-sm"
        >
          <Column field="id" header="ID" sortable style="width: 80px"></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="age" header="Age" sortable style="width: 100px"></Column>
          <Column field="createdAt" header="Created" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column header="Actions" style="width: 150px">
            <template #body="slotProps">
              <Button 
                icon="pi pi-pencil" 
                class="p-button-rounded p-button-text p-button-info mr-2"
                @click="editUser(slotProps.data)"
                v-tooltip.top="'Edit'"
              />
              <Button 
                icon="pi pi-trash" 
                class="p-button-rounded p-button-text p-button-danger"
                @click="confirmDelete(slotProps.data)"
                v-tooltip.top="'Delete'"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Add/Edit User Dialog -->
    <Dialog 
      v-model:visible="showAddDialog" 
      :header="editingUser ? 'Edit User' : 'Add New User'"
      :modal="true"
      :closable="true"
      :style="{ width: '450px' }"
    >
      <form @submit.prevent="saveUser" class="p-fluid">
        <div class="field">
          <label for="name">Name *</label>
          <InputText 
            id="name"
            v-model="userForm.name" 
            :class="{ 'p-invalid': errors.name }"
            placeholder="Enter user name"
          />
          <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
        </div>
        
        <div class="field">
          <label for="email">Email *</label>
          <InputText 
            id="email"
            v-model="userForm.email" 
            :class="{ 'p-invalid': errors.email }"
            placeholder="Enter email address"
            type="email"
          />
          <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
        </div>
        
        <div class="field">
          <label for="age">Age</label>
          <InputNumber 
            id="age"
            v-model="userForm.age" 
            :min="1"
            :max="120"
            placeholder="Enter age"
          />
        </div>
        
        <div class="flex justify-content-end gap-2 mt-4">
          <Button 
            label="Cancel" 
            icon="pi pi-times" 
            class="p-button-text"
            @click="cancelEdit"
          />
          <Button 
            label="Save" 
            icon="pi pi-check" 
            type="submit"
            :loading="saving"
          />
        </div>
      </form>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog 
      v-model:visible="showDeleteDialog" 
      header="Confirm Delete"
      :modal="true"
      :closable="true"
      :style="{ width: '350px' }"
    >
      <div class="flex align-items-center">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--red-500)"></i>
        <span>Are you sure you want to delete <strong>{{ userToDelete?.name }}</strong>?</span>
      </div>
      
      <template #footer>
        <Button 
          label="Cancel" 
          icon="pi pi-times" 
          class="p-button-text"
          @click="showDeleteDialog = false"
        />
        <Button 
          label="Delete" 
          icon="pi pi-trash" 
          class="p-button-danger"
          @click="deleteUser"
          :loading="deleting"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'

// PrimeVue components
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

const toast = useToast()

// Reactive data
const users = ref([])
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const editingUser = ref(null)
const userToDelete = ref(null)

const userForm = reactive({
  name: '',
  email: '',
  age: null
})

const errors = reactive({
  name: '',
  email: ''
})

// API base URL
const API_BASE = 'http://localhost:3000/api'

// Methods
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE}/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load users',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  errors.name = ''
  errors.email = ''
  
  if (!userForm.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!userForm.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  return !errors.name && !errors.email
}

const saveUser = async () => {
  if (!validateForm()) return
  
  saving.value = true
  try {
    const method = editingUser.value ? 'PUT' : 'POST'
    const url = editingUser.value 
      ? `${API_BASE}/users/${editingUser.value.id}`
      : `${API_BASE}/users`
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userForm)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to save user')
    }
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: editingUser.value ? 'User updated successfully' : 'User created successfully',
      life: 3000
    })
    
    showAddDialog.value = false
    resetForm()
    await fetchUsers()
  } catch (error) {
    console.error('Error saving user:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    })
  } finally {
    saving.value = false
  }
}

const editUser = (user) => {
  editingUser.value = user
  userForm.name = user.name
  userForm.email = user.email
  userForm.age = user.age
  showAddDialog.value = true
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteDialog.value = true
}

const deleteUser = async () => {
  if (!userToDelete.value) return
  
  deleting.value = true
  try {
    const response = await fetch(`${API_BASE}/users/${userToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) throw new Error('Failed to delete user')
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User deleted successfully',
      life: 3000
    })
    
    showDeleteDialog.value = false
    userToDelete.value = null
    await fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete user',
      life: 3000
    })
  } finally {
    deleting.value = false
  }
}

const cancelEdit = () => {
  showAddDialog.value = false
  resetForm()
}

const resetForm = () => {
  editingUser.value = null
  userForm.name = ''
  userForm.email = ''
  userForm.age = null
  errors.name = ''
  errors.email = ''
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.user-crud {
  padding: 1rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.p-error {
  display: block;
  margin-top: 0.25rem;
}
</style>