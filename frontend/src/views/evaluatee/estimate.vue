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
          <div class="bg-base-200 p-3 rounded">
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
            <img :src="imageUrl" class="max-h-52 rounded-lg border" />
          </div>

          <!-- SCORE 1-4 -->
          <div>
            <label class="label text-[#7b1c1c] font-semibold">
              ให้คะแนนการประเมิน (1 – 4)
            </label>

            <div class="flex flex-col gap-3">

              <label class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
                <input type="radio" class="radio radio-primary mt-1" value="1" v-model="evaluationValue" />
                <div>
                  <p class="font-semibold">ระดับ 1</p>
                  <p class="text-sm text-gray-600">
                    ปฏิบัติได้ต่ำกว่าระดับการปฏิบัติที่คาดหวังมาก
                  </p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
                <input type="radio" class="radio radio-primary mt-1" value="2" v-model="evaluationValue" />
                <div>
                  <p class="font-semibold">ระดับ 2</p>
                  <p class="text-sm text-gray-600">
                    ปฏิบัติได้ต่ำกว่าระดับการปฏิบัติที่คาดหวัง
                  </p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
                <input type="radio" class="radio radio-primary mt-1" value="3" v-model="evaluationValue" />
                <div>
                  <p class="font-semibold">ระดับ 3</p>
                  <p class="text-sm text-gray-600">
                    ปฏิบัติได้ตามระดับการปฏิบัติที่คาดหวัง
                  </p>
                </div>
              </label>

              <label class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
                <input type="radio" class="radio radio-primary mt-1" value="4" v-model="evaluationValue" />
                <div>
                  <p class="font-semibold">ระดับ 4</p>
                  <p class="text-sm text-gray-600">
                    ปฏิบัติได้สูงกว่าระดับการปฏิบัติที่คาดหวัง
                  </p>
                </div>
              </label>

            </div>
          </div>

          <!-- ATTACH -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="label text-[#7b1c1c] font-semibold">แนบ URL</label>
              <input v-model="url" type="url" class="input input-bordered w-full" />
            </div>

            <div class="flex-1">
              <label class="label text-[#7b1c1c] font-semibold">แนบไฟล์</label>
              <input type="file" @change="handleFile" class="file-input file-input-bordered w-full" />
            </div>
          </div>

          <!-- BUTTON -->
          <div class="flex justify-between mt-6">
            <button type="button"
              class="btn btn-outline border-[#7b1c1c] text-[#7b1c1c]"
              @click="router.back()">
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
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api/axios'

const router = useRouter()
const route = useRoute()
const params = route.params.id

const source = ref({})
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
  formData.append('evaluation_type', 'score_1_4')
  formData.append('evaluation_value', evaluationValue.value)
  formData.append('url', url.value)
  formData.append('period_id', source.value.period_id)
  if (file.value) formData.append('file', file.value)

  await api.post('/createattachments', formData)
  router.push('/evaluatee/evaluateedashboard')
}

const imageUrl = computed(() => {
  if (!source.value.assemble_file) return ''
  return `http://localhost:7000/uploads/${source.value.assemble_file}`
})

const fetchperiods = async () => {
  const res = await api.get(`/getindicatorbyid/${params}`)
  // console.log(res.data)
  source.value = res.data[0]
}

onMounted(fetchperiods)

</script>
