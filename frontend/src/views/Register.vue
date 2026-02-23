<template>
  <div class="min-h-screen flex items-center justify-center bg-base-300">
    <form
      class="card w-96 bg-base-100 shadow-xl p-6 flex items-center justify-center"
      @submit.prevent="handleRegister"
    >
    <img src="../assets/cropped-piclogo.png" alt="Logo" class="w-32 mb-6" />
      <h2 class="text-xl font-bold text-center mb-2">สมัครสมาชิก</h2>

     <div role="alert" class="alert alert-error mb-4 hidden">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{{ errorMessage }}</span>
</div>


      <input type="text" class="input validator " v-model="name" required placeholder="ชื่อ" 
            pattern="[A-Za-zก-๙][A-Za-z0-9ก-๙\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
        <p class="validator-hint hidden">
        Must be 3 to 30 characters
        <br/>containing only letters, numbers or dash
        </p>

     <input v-model="email" class="input validator mt-4" type="email" required placeholder="อีเมล" />
        <div class="validator-hint">Enter valid email address</div>

        <input v-model="password" type="password" class="input validator " required placeholder="รหัสผ่าน" minlength="8" 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
            <p class="validator-hint hidden  mb-4">
            Must be more than 8 characters, including
            <br/>At least one number
            <br/>At least one lowercase letter
            <br/>At least one uppercase letter
            </p>

      <!-- Select แก้ไข -->
      <select class="select validator mt-4" v-model="selectedDept" required>
        <option disabled value="">เเผนก</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
      </select>

      <select class="select validator mt-4" v-model="selectedGroup" required>
        <option disabled value="">กลุ่ม</option>
        <option v-for="grp in groups" :key="grp.id" :value="grp.id">{{ grp.name }}</option>
      </select>

      <button class="btn w-full mt-4 bg-red-800 hover:bg-red-900 text-white border-none">Register</button>

      <p class="text-xs text-center text-base-content/60 mt-3">
        มีบัญชีอยู่แล้ว? <router-link to="/"><span class="link link-secondary">เข้าสู่ระบบ</span></router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from './api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// Inputs
const name = ref('')
const email = ref('')
const password = ref('')
const selectedDept = ref('')
const selectedGroup = ref('')
const errorMessage = ref('')

// Select data
const departments = ref([]) // array จาก API
const groups = ref([])      // array จาก API



// Fetch data
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

// Submit
const handleRegister = async () => {
  console.log({
    name: name.value,
    email: email.value,
    password: password.value,
    department: selectedDept.value,
    group: selectedGroup.value
  })
 const payload ={
    name: name.value , 
    email: email.value,
    password: password.value,
    department_id: selectedDept.value,
    group_id: selectedGroup.value
  }
try{
  const res = await api.post('/register',payload)
    if(res.data.success){
      router.push('/')


}
}catch(e){
  if (e.response && e.response.data) {
      errorMessage.value = e.response.data.message
      const alertBox = document.querySelector('.alert')
      alertBox.classList.remove('hidden')
    } else {
      
      errorMessage.value = 'เกิดข้อผิดพลาด กรุณาลองใหม่'
    }
  }
}

onMounted(fetchData)
</script>
