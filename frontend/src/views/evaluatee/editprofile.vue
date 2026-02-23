<template>
  <div class="flex items-start justify-center bg-base-100">
    <form
      class="card w-80 bg-base-100 shadow-xl p-6"
      @submit.prevent="handleUpdate"
    >
      <h2 class="text-xl font-bold text-center mb-2 text-primary">Edit User</h2>

      <input 
        type="text" 
        class="input validator" 
        v-model="name" 
        required 
        placeholder="Username" 
        pattern="[A-Za-z][A-Za-z0-9\-]*" 
        minlength="3" 
        maxlength="30" 
        title="Only letters, numbers or dash" 
      />
      <p class="validator-hint hidden">
        Must be 3 to 30 characters
        <br/>containing only letters, numbers or dash
      </p>

      <input 
        v-model="email" 
        class="input validator mt-4" 
        type="email" 
        required 
        placeholder="mail@site.com" 
      />
      <div class="validator-hint">Enter valid email address</div>

      <input 
        v-model="password" 
        type="password" 
        class="input validator" 
        placeholder="Password (leave blank if not change)" 
        minlength="8" 
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
      />
      <p class="validator-hint hidden mb-4">
        Must be more than 8 characters, including
        <br/>At least one number
        <br/>At least one lowercase letter
        <br/>At least one uppercase letter
      </p>

      <!-- Select แก้ไข -->
      <select class="select validator mt-4" v-model="selectedDept" required>
        <option disabled value=""> Department</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
      </select>

      <select class="select validator mt-4" v-model="selectedGroup" required>
        <option disabled value=""> Group</option>
        <option v-for="grp in groups" :key="grp.id" :value="grp.id">{{ grp.name }}</option>
      </select>

    

      <button class="btn btn-primary w-full mt-4">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userId = route.params.id

// Inputs
const name = ref('')
const email = ref('')
const password = ref('')
const selectedDept = ref('')
const selectedGroup = ref('')


// Select data
const departments = ref([])
const groups = ref([])

// Fetch Departments and Groups
const fetchData = async () => {
  try {
    const resDept = await api.get('/departmentlist')
    departments.value = resDept.data

    const resGroup = await api.get('/grouplist')
    groups.value = resGroup.data
  } catch (e) {
    console.log(e)
  }
}

// Fetch user data by id
const fetchUser = async () => {
  try {
    const res = await api.get(`/getuserid/${userId}`)
    const user = res.data
    name.value = user.name
    email.value = user.email
    selectedDept.value = user.department_id
    selectedGroup.value = user.group_id
    
    // password ปล่อยว่างไว้ ถ้าไม่แก้ไข
  } catch (e) {
    console.log(e)
  }
}

// Update user
const handleUpdate = async () => {
  try {
    const payload = {
      name: name.value,
      email: email.value,
      department_id: selectedDept.value,
      group_id: selectedGroup.value,
      role: role.value  ,
      status:active.value
    }
    if (password.value) {
      payload.password = password.value // อัพเดทถ้ามีการกรอก password ใหม่
    }

    const res = await api.put(`/edituser/${userId}`, payload)
    if (res.data.success) {
      router.push('/admin/userlist')
    } else {
      console.log('Update error', res.data.message)
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchData()
  fetchUser()
})
</script>
