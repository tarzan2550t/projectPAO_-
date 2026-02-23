<template>
  <div class="min-h-screen bg-gradient-to-br  flex  justify-center p-6">
    
    <div class="card w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ">
      
      <div class="flex flex-col items-center pt-10 pb-4">
        <div class="avatar">
          <div class="w-32 h-32 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2 shadow-2xl">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" 
              alt="Profile Picture" 
            />
          </div>
        </div>
      </div>

      <div class="card-body items-center text-center pt-0 ">
        <h2 class="card-title text-3xl font-bold text-white mb-1">
          {{ profile.name || 'Loading...' }}
        </h2>
        
        <div class="badge badge-warning badge-outline mb-4">
          {{ profile.deprt_name }}
        </div>

        
                    <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Total Page Views</div>
                <div class="stat-value">89,400</div>
                <div class="stat-desc">21% more than last month</div>
              </div>
            </div>
                    <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Total Page Views</div>
                <div class="stat-value">89,400</div>
                <div class="stat-desc">21% more than last month</div>
              </div>
            </div>
                            <div class="stats shadow w-full">
            <div class="stat" >
              <div class="stat-title">Total Page Views</div>
              <div class="stat-value">89,400</div>
              <div class="stat-desc">21% more than last month</div>
            </div>
          </div>

                   
          
        
        

        <div class="card-actions w-full mt-8  ">
          <router-link to="/evaluatee/evaluateeeditprofile" class="w-full">
           <button class="btn btn-warning w-full">เเก้ไข้ข้อมูล</button>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const profile = ref({
  name: '',
  email: '',
  deprt_name: '',
  group_name: ''
})

const fetchProfile = async () => {
  try {
    const res = await api.get('/profile')
    profile.value = res.data
  } catch (err) {
    console.error('Error fetching profile:', err)
  }
}

onMounted(fetchProfile)
</script>

