<template>
  <router-link to="/admin/adduser">
    <button class="btn btn-warning mb-4">
      เพิ่มหัวข้อการประเมิน
    </button>
  </router-link>

  <!-- FILTER -->
  <div class="flex gap-3 mb-4">
    <input
      v-model="search"
      placeholder="ค้นหาชื่อ"
      class="input input-bordered w-48"
    />

    <select v-model="selectedGroup" class="select select-bordered">
      <option value="all">ทุกตำแหน่ง</option>
      <option
        v-for="g in uniqueGroups"
        :key="g"
        :value="g"
      >
        {{ g }}
      </option>
    </select>

    <select v-model="selectedDept" class="select select-bordered">
      <option value="all">ทุกแผนก</option>
      <option
        v-for="d in uniqueDepts"
        :key="d"
        :value="d"
      >
        {{ d }}
      </option>
    </select>
  </div>

  <!-- TABLE -->
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th  class="hidden md:table-cell">email</th>
          <th>สถานะ</th>
          <th class="hidden lg:table-cell">แผนก</th>
          <th class="hidden lg:table-cell">ตำแหน่ง</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredUsers"
          :key="item.id"
          class="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        >
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    :src="getimageurl(item.image)"
                    alt="avatar"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ item.name }}</div>
                <div class="text-sm opacity-50">{{ item.role }}</div>
              </div>
            </div>
          </td>

          <td class="hidden md:table-cell">{{ item.email }}</td>

          <td>
            <button
              class="btn btn-outline"
              :class="item.status === 1 ? 'btn-success' : 'btn-error'"
            >
              {{ item.status === 1 ? 'ใช้งาน' : 'ระงับ' }}
            </button>
          </td>

          <td class="hidden lg:table-cell">{{ item.deprt_name }}</td>
          <td class="hidden lg:table-cell">{{ item.group_name }}</td>

          <td>
            <div class="dropdown dropdown-left dropdown-center">
              <div tabindex="0" role="button" class="btn m-1">จัดการ</div>
              <ul
                tabindex="-1"
                class="dropdown-content menu bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm "
              >
                <li class="hover:text-red-800 cursor-pointer">
                  <router-link :to="`/admin/edituser/${item.id}`">แก้ไขข้อมูลผู้ใช้งาน</router-link>
                </li>
                <li class="hover:text-red-800 cursor-pointer">
                  <a @click="Deleteuser(item.id)">ลบผู้ใช้งาน</a>
                </li>
                <li class="hover:text-red-800 cursor-pointer">
                  <p @click="deactivateUser(item.id)">ระงับ</p>
                </li>
                <li class="hover:text-red-800 cursor-pointer">
                  <p @click="activateUser(item.id)">ใช้งาน</p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api/axios'

const users = ref([])

// filter state
const search = ref('')
const selectedGroup = ref('all')
const selectedDept = ref('all')

// fetch users
const fetchuserlist = async () => {
  try {
    const res = await api.get('/userlist')
    users.value = res.data
  } catch (e) {
    console.log(e)
  }
}

// unique dropdown values
const uniqueGroups = computed(() => {
  return [...new Set(users.value.map(u => u.group_name).filter(Boolean))]
})

const uniqueDepts = computed(() => {
  return [...new Set(users.value.map(u => u.deprt_name).filter(Boolean))]
})

// filter logic
const filteredUsers = computed(() => {
  return users.value.filter(item => {
    const matchName =
      item.name.toLowerCase().includes(search.value.toLowerCase())
    const matchGroup =
      selectedGroup.value === 'all' || item.group_name === selectedGroup.value
    const matchDept =
      selectedDept.value === 'all' || item.deprt_name === selectedDept.value

    return matchName && matchGroup && matchDept
  })
})

async function Deleteuser(id) {
  try {
    if (confirm(`delete ${id} ?`)) {
      await api.delete(`/deleteuser/${id}`)
      fetchuserlist()
    }
  } catch (e) {
    console.log(e)
  }
}

function getimageurl(image) {
  return `http://localhost:7000/uploads/${image}`
}

async function deactivateUser(id) {
  try {

    await api.put(`/deactivateuser/${id}`)
    fetchuserlist()
  } catch (e) {
    console.log(e)
  }
}

async function activateUser(id) {
  try {
    await api.put(`/activateuser/${id}`)
    fetchuserlist()
  } catch (e) {
    console.log(e)
  }
}


onMounted(fetchuserlist)
</script>
