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
            แก้ไขรอบการประเมิน
          </h2>
          <p class="text-sm text-red-200 text-center">
            Edit Period
          </p>
        </div>

        <!-- FORM -->
        <form class="p-6 space-y-4" @submit.prevent="handleUpdate">

          <div>
            <label class="label text-[#7b1c1c] font-semibold">หัวข้อการพัฒนา</label>
            <input
              v-model="name"
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
          <div class="flex justify-between mt-6">
            <button
              type="button"
              class="btn btn-outline border-[#7b1c1c] text-[#7b1c1c] hover:bg-[#7b1c1c] hover:text-white"
              @click="router.back()"
            >
              ยกเลิก
            </button>

            <button
              class="btn bg-[#7b1c1c] hover:bg-[#5f1414] text-white border-none"
            >
              บันทึกการแก้ไข
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
const periodId = route.params.id

const name = ref('')
const year = ref('')
const dateStart = ref('')
const dateEnd = ref('')

const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 50)
  fetchPeriod()
})

const fetchPeriod = async () => {
  try {
    const res = await api.get(`/periodid/${periodId}`)
    const p = res.data
    name.value = p.name
    year.value = p.year
    dateStart.value = p.start_date
    dateEnd.value = p.end_date
  } catch (err) {
    console.log(err)
  }
}

const handleUpdate = async () => {
  const payload = {
    name: name.value,
    year: year.value,
    start_date: dateStart.value,
    end_date: dateEnd.value
  }

  try {
    await api.put(`/editperiod/${periodId}`, payload)
    router.push('/admin/period')
  } catch (err) {
    console.log(err)
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

