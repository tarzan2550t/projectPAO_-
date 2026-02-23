<template>
  <div class="h-screen drawer lg:drawer-open">

    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

    <!-- Sidebar -->
<div class="drawer-side shadow-xl shadow-black/20">
  <label for="my-drawer-3" class="drawer-overlay"></label>

  <div class="bg-base-200 w-60 min-h-screen">

    <!-- Sidebar Header -->
    <div class="px-4 py-4 border-b border-base-300">
      <span class="text-xl font-bold text-[#7b1c1c]">My Application</span>
    </div>

    <!-- Menu -->
    <ul class="menu p-4 text-lg">
      <li>
        <router-link to="/admin/dashboard" class="relative pl-4 group hover:text-orange-600 transition-all hover:translate-x-1">
          <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          เเสดงผลรายงาน
        </router-link>
      </li>

      <li>
        <router-link to="/admin/userlist" class="relative pl-4 group hover:text-orange-600 transition-all hover:translate-x-1">
          <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          ผู้ใช้งาน
        </router-link>
      </li>

      <li>
        <details>
          <summary class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
            <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            รายงาน
          </summary>
          <ul>
            <li>
              <router-link to="/admin/period" class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
                <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                รอบการประเมิน
              </router-link>
            </li>
            <li>
              <router-link to="/admin/indicator" class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
                <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                หัวข้อการประเมิน
              </router-link>
            </li>
            <li>
              <router-link to="/admin/assignment" class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
                <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all "></span>
                กำหนดผู้ประเมิน
              </router-link>
            </li>
          </ul>
        </details>
      </li>
    </ul>

  </div>
</div>

    

    <!-- Main -->
    <div class="drawer-content flex flex-col">

      <!-- Navbar -->
      <div class="navbar bg-[#7b1c1c] shadow-lg shadow-black/20">
        <div class="flex-1">
          <label for="my-drawer-3" class="btn drawer-button lg:hidden">☰</label>
                <div class="flex items-center gap-2 text-white font-bold">
                <!-- จอใหญ่ -->
                <span class="hidden md:inline text-2xl">
                    Pakchong Technical College
                

                <!-- จอเล็ก -->
                <span class="inline md:hidden text-2xl">
                    PIC
                </span>

                <span class="text-rotate">
                    <span>
                    <span class="bg-teal-400 text-teal-800  px-2">Designers</span>
                    <span class="bg-red-400 text-red-800  px-2">Developers</span>
                    <span class="bg-blue-400 text-blue-800  px-2">Managers</span>
                    </span>
                </span>
            </span>
                </div>

        
        </div>

        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow text-xl">
              <li><a class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
                  <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                Profile</a></li>
              <li><a class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1">
                  <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                Settings</a></li>
              <li><p class="relative pl-4 group transition-all duration-200 hover:text-orange-600 hover:translate-x-1" @click="handleLogout">
                  <span class="absolute left-0 top-0 h-full w-[3px] bg-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                Logout</p></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Logout Alert Overlay -->
<div
  v-if="showLogoutAlert"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
>
  <div role="alert" class="alert shadow-xl bg-base-100 flex flex-col gap-4 text-center">

    <svg xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-warning h-6 w-6 shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    <span>คุณต้องการออกจากระบบใช่หรือไม่?</span>

    <div class="flex gap-3 justify-center">
  <button @click="cancelLogout" class="btn btn-sm">
    ยกเลิก
  </button>
  <button @click="confirmLogout" class="btn btn-sm btn-error">
    ออกจากระบบ
  </button>
</div>

  </div>
</div>

      <!-- Page Content -->
      <div class="flex-1 p-4 overflow-auto">
        <!-- ใส่ content ตรงนี้ -->
         <router-view></router-view>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// คุมการแสดง alert
const showLogoutAlert = ref(false)

const handleLogout = () => {
  showLogoutAlert.value = true
}

const confirmLogout = () => {
  console.log('Logging out...')
  showLogoutAlert.value = false
  localStorage.removeItem('token')
  router.push('/')
}

const cancelLogout = () => {
  showLogoutAlert.value = false
}
</script>
