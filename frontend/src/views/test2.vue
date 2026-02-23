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
            แบบประเมินตัวชี้วัด
          </h2>
          <p class="text-sm text-red-200 text-center">
            Indicator Evaluation
          </p>
        </div>

        <!-- FORM -->
        <form class="p-6 space-y-4" @submit.prevent="handleSubmit">

          <!-- INFO -->
          <div class="bg-base-200 p-4 rounded-lg space-y-2">
            <p><b>หัวข้อ :</b> {{ source.name }}</p>
            <p><b>รอบประเมิน :</b> {{ source.topic_name }}</p>
            <p><b>รายละเอียด :</b> {{ source.description }}</p>
            <p>
              <b>ลิงก์ :</b>
              <a :href="source.assemble_url" target="_blank" class="link link-primary">
                {{ source.assemble_url }}
              </a>
            </p>
          </div>

          <!-- IMAGE -->
          <div v-if="imageUrl" class="flex justify-center">
            <img :src="imageUrl" class="max-h-48 rounded-lg border" />
          </div>

          <!-- TYPE -->
          <div>
            <label class="label text-[#7b1c1c] font-semibold">รูปแบบการประเมิน</label>
            <select v-model="evaluationType" class="select select-bordered w-full">
              <option disabled value="">เลือกแบบประเมิน</option>
              <option value="yes/no">Yes / No</option>
              <option value="score_1_4">Score 1 - 4</option>
            </select>
          </div>

          <!-- VALUE -->
          <div v-if="evaluationType">
            <label class="label text-[#7b1c1c] font-semibold">ผลการประเมิน</label>

            <div v-if="evaluationType === 'yes/no'" class="flex gap-6">
              <label class="flex items-center gap-2">
                <input type="radio" class="radio radio-primary" value="yes" v-model="evaluationValue" />
                มี
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" class="radio radio-primary" value="no" v-model="evaluationValue" />
                ไม่มี
              </label>
            </div>

            <div v-if="evaluationType === 'score_1_4'" class="flex flex-col gap-2">
              <label v-for="score in 4" :key="score" class="flex items-center gap-2">
                <input type="radio" class="radio radio-primary" :value="score" v-model="evaluationValue" />
                คะแนน {{ score }}
              </label>
            </div>
          </div>

          <!-- URL -->
          <div>
            <label class="label text-[#7b1c1c] font-semibold">แนบ URL</label>
            <input v-model="url" type="url" class="input input-bordered w-full" />
          </div>

          <!-- FILE -->
          <div>
            <label class="label text-[#7b1c1c] font-semibold">แนบไฟล์</label>
            <input type="file" @change="handleFile" class="file-input file-input-bordered w-full" />
          </div>

          <!-- BUTTON -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              class="btn btn-outline border-[#7b1c1c] text-[#7b1c1c]"
              @click="router.back()"
            >
              ยกเลิก
            </button>

            <button class="btn bg-[#7b1c1c] hover:bg-[#5f1414] text-white border-none">
              บันทึกผลประเมิน
            </button>
          </div>

        </form>
      </div>
    </transition>

  </div>
</template>
<!-- <script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api/axios'

const router = useRouter()
const route = useRoute()
const params = route.params.id

const source = ref({})
const evaluationType = ref('')
const evaluationValue = ref(null)
const url = ref('')
const file = ref(null)
const show = ref(false)

onMounted(() => {
  setTimeout(() => show.value = true, 50)
})

const handleFile = (e) => {
  file.value = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('indicator_id', params)
  formData.append('evaluation_type', evaluationType.value)
  formData.append('evaluation_value', evaluationValue.value)
  formData.append('url', url.value)
  if (file.value) formData.append('file', file.value)

  await api.post('/createattachments', formData)
  router.push('/evaluatee/evaluateedashboard')
}

const imageUrl = computed(() => {
  if (!source.value.assemble_file) return ''
  return `http://localhost:7000/uploads/${source.value.assemble_file}`
})

const fetchData = async () => {
  const res = await api.get(`/getindicatorbyid/${params}`)
  source.value = res.data[0]
}

onMounted(fetchData)
</script> -->

