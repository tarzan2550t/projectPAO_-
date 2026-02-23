<template>
  <div class="min-h-screen flex  justify-center bg-base-200 p-2">

    <transition name="fade-up">
      <div
        v-if="show"
        class="w-full max-w-2xl bg-base-100 rounded-xl shadow-xl overflow-hidden"
      >

        <!-- HEADER -->
        <div class="bg-[#7b1c1c] p-4">
          <h2 class="text-xl font-bold text-white text-center">
            แก้ไขข้อมูลผู้ใช้งาน
          </h2>
          <p class="text-sm text-red-200 text-center">
            Edit User Information
          </p>
        </div>

        <!-- FORM -->
        <form class="p-6 space-y-4" @submit.prevent="handleUpdate">

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Username</label>
            <input type="text" class="input input-bordered w-full" v-model="name" required />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">Email</label>
            <input type="email" class="input input-bordered w-full" v-model="email" required />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">New Password</label>
            <input type="password" class="input input-bordered w-full" v-model="password"
              placeholder="Leave blank if not change" />
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
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>

        </form>
      </div>
    </transition>

  </div>
</template>




<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api/axios'

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
const role = ref('')


// Select data
const departments = ref([])
const groups = ref([])
const show = ref(false)

onMounted(() => {
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

// Fetch user data by id
const fetchUser = async () => {
  try {
    const res = await api.get(`/getuserid/${userId}`)
    const user = res.data
    name.value = user.name
    email.value = user.email
    selectedDept.value = user.department_id
    selectedGroup.value = user.group_id
    role.value = user.role
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
