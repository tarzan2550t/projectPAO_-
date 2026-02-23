<template>
  <div class="min-h-screen flex justify-center bg-base-200 p-2">

    <transition name="fade-up">
      <div
        v-if="show"
        class="w-full max-w-xl bg-base-100 rounded-xl shadow-xl overflow-hidden"
      >

        <!-- HEADER -->
        <div class="bg-[#7b1c1c] p-4">
          <h2 class="text-xl font-bold text-white text-center">
            เพิ่มผู้ใช้งาน
          </h2>
          <p class="text-sm text-red-200 text-center">
            Register User
          </p>
        </div>

        <!-- FORM -->
        <form class="p-6 space-y-4" @submit.prevent="handleRegister">

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Username</label>
            <input
              type="text"
              class="input input-bordered w-full"
              v-model="name"
              required
            />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Email</label>
            <input
              type="email"
              class="input input-bordered w-full"
              v-model="email"
              required
            />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Password</label>
            <input
              type="password"
              class="input input-bordered w-full"
              v-model="password"
              required
            />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Department</label>
            <select class="select select-bordered w-full" v-model="selectedDept" required>
              <option disabled value="">เลือกแผนก</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Group</label>
            <select class="select select-bordered w-full" v-model="selectedGroup" required>
              <option disabled value="">เลือกกลุ่ม</option>
              <option v-for="grp in groups" :key="grp.id" :value="grp.id">
                {{ grp.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Role</label>
            <select class="select select-bordered w-full" v-model="role" required>
              <option disabled value="">เลือกสิทธิ์</option>
              <option value="admin">admin</option>
              <option value="evaluatee">evaluatee</option>
              <option value="evaluator">evaluator</option>
            </select>
          </div>

          <!-- BUTTON -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              class="btn btn-outline border-[#7b1c1c] text-[#7b1c1c] hover:bg-[#7b1c1c] hover:text-white"
              @click="router.back()"
            >
              ยกเลิก
            </button>

            <button class="btn bg-[#7b1c1c] hover:bg-[#5f1414] text-white border-none">
              บันทึก
            </button>
          </div>

        </form>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// Inputs
const name = ref('')
const email = ref('')
const password = ref('')
const selectedDept = ref('')
const selectedGroup = ref('')
const role = ref('')

// Select data
const departments = ref([])
const groups = ref([])

const show = ref(false)

onMounted(() => {
  fetchData()
  setTimeout(() => {
    show.value = true
  }, 50)
})

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

// Submit
const handleRegister = async () => {
  try {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      department_id: selectedDept.value,
      group_id: selectedGroup.value,
      role: role.value
    }

    const res = await api.post('/createuser', payload)
    if (res.data.success) {
      router.push('/admin/userlist')
    } else {
      console.log('Register error')
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
.fade-up-enter-active {
  transition: all 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
