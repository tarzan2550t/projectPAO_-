<template>
  <div class="min-h-screen flex justify-center bg-base-200 p-2">

    <transition name="fade-up">
      <div
        v-if="show"
        class="w-full  bg-base-100 rounded-xl shadow-xl overflow-hidden"
      >

        <!-- HEADER -->
        <div class="bg-[#7b1c1c] p-4">
          <h2 class="text-xl font-bold text-white text-center">
            เพิ่มรอบการประเมิน
          </h2>
          <p class="text-sm text-red-200 text-center">
            Add Period
          </p>
        </div>

        <!-- FORM -->
        <form class="p-6 space-y-4" @submit.prevent="handleSubmit">

          <div>
            <label class="label text-[#7b1c1c] font-semibold">หัวข้อการพัฒนา</label>
            <input
              v-model="username"
              type="text"
              class="input input-bordered w-full"
              required
              placeholder="ชื่อหัวข้อ"
            />
          </div>

          <div>
            <label class="label text-[#7b1c1c] font-semibold">ปีที่การประเมิน</label>
            <input
              v-model="year"
              type="number"
              class="input input-bordered w-full"
              placeholder="ปีที่การประเมิน"
            />
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="label text-[#7b1c1c] font-semibold">วันเริ่ม</label>
              <input
                type="date"
                v-model="dateStart"
                class="input input-bordered w-full"
              />
            </div>

            <div class="flex-1">
              <label class="label text-[#7b1c1c] font-semibold">วันปิด</label>
              <input
                type="date"
                v-model="dateEnd"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <!-- BUTTON -->
          <div class="flex justify-end mt-6">
            <button
              class="btn bg-[#7b1c1c] hover:bg-[#5f1414] text-white border-none w-full"
            >
              บันทึกข้อมูล
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

const username = ref('')
const year = ref('')
const dateStart = ref('')
const dateEnd = ref('')

const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 50)
})

const handleSubmit = async () => {
  const payload = {
    name: username.value,
    year: year.value,
    start_date: dateStart.value,
    end_date: dateEnd.value
  }

  try {
    await api.post('/createperiod', payload)
    router.push('/admin/period')
  } catch (err) {
    console.error(err)
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

</style>

