<template>
  <div class="min-h-screen flex items-center justify-center bg-base-300">

    <transition name="fade-slide">
      <form
        v-if="show"
        class="card w-96 bg-base-100 shadow-xl p-6 flex flex-col items-center"
        @submit.prevent
      >

        <img src="../assets/cropped-piclogo.png" alt="Logo" class="w-32 mb-5" />
        <h2 class="text-xl font-bold text-center mb-2">เข้าสู่ระบบ</h2>

        <div role="alert" class="alert alert-error mb-4 hidden">
          <span>{{ errorMessage }}</span>
        </div>

        <input class="input validator" type="email" v-model="email" required placeholder="อีเมล" />
        <input class="input validator mt-3" type="password" v-model="password" required placeholder="รหัสผ่าน" />

        <button class="btn w-full mt-4 bg-red-800 hover:bg-red-900 text-white border-none" @click="handleLogin">
          ยืนยัน
        </button>

        <p class="text-xs text-center text-base-content/60 mt-3">
          ยังไม่มีบัญชี? <router-link to="/Register" class="link link-secondary">สมัครสมาชิก</router-link>
        </p>

      </form>
    </transition>

  </div>
</template>



<script setup>
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from './api/axios'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {

  if(email.value === '' || password.value === ''){
    errorMessage.value = 'กรุณากรอกข้อมูลให้ครบถ้วน'
    const alertBox = document.querySelector('.alert')
    alertBox.classList.remove('hidden')
    return

  }
  try {
    const res = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    console.log(res.data)
    const user = jwtDecode(res.data.token)
    const status = user.status
    const role = user.role
    // console.log('hello')
    // console.log('Status:', status, 'Role:', role)
    

    // login สำเร็จ
    if (res.data.success) {

      if (status === 1) {
      localStorage.setItem('token', res.data.token)
      
      
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'evaluator') {
        router.push('/evaluator')
      } else {
        router.push('/evaluatee')
      }
    }else {
      errorMessage.value = 'รอการยืนยันจากผู้ดูแลระบบ'
    }
  }

  } catch (err) {
   
    // console.log(err.response) 
    if (err.response && err.response.data) {
      errorMessage.value = err.response.data.message
      const alertBox = document.querySelector('.alert')
      alertBox.classList.remove('hidden')
    } else {
      
      errorMessage.value = 'เกิดข้อผิดพลาด กรุณาลองใหม่'
      
    }
  }
}
const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 100) // ดีเลย์นิดนึงให้ดู smooth
})
</script>
<style scoped>
.fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>

