<template>
  <router-link :to="`/evaluator/evaluatorindicator/${indicatorId}`">
    <button class="btn btn-outline mb-4">⬅ กลับ</button>
  </router-link>

  <div class="card bg-base-100 shadow-xl p-6 space-y-6">
    <h2 class="text-xl font-bold text-center">แบบฟอร์มการประเมิน (กรรมการ)</h2>

    <!-- ข้อมูลผู้ถูกประเมิน -->
    <div class="grid grid-cols-2 gap-4">
      <div><b>ผู้ถูกประเมิน:</b> {{ data?.evaluatee_name }}</div>
      <div><b>หัวข้อประเมิน:</b> {{ data?.name }}</div>
    </div>

    <!-- ผลประเมินตนเอง -->
    <div class="bg-base-200 p-4 rounded">
      <b>ผลการประเมินตนเอง:</b>
      <p class="mt-1">{{ selfScoreText }}</p>
    </div>

    <!-- หลักฐาน -->
    <div>
      <b>หลักฐาน</b>
      <div class="mt-2 space-y-1">
        <a
          v-if="data?.url_name"
          :href="data.url_name"
          target="_blank"
          class="link link-primary"
        >
          🔗 เปิดลิงก์
        </a>

        <div v-if="data?.file_name">
          <a :href="fileUrl" target="_blank" class="link link-success">
            📁 ดูไฟล์แนบ
          </a>
        </div>
      </div>
    </div>

    <!-- คะแนนกรรมการ -->
    <div>
      <b>คะแนนกรรมการ</b>
      <div class="mt-2 space-y-2">
        <label class="flex items-start gap-2">
          <input type="radio" :value="1" v-model="committeeScore" />
          <span>ระดับ 1 : ต่ำกว่าที่คาดหวังมาก</span>
        </label>

        <label class="flex items-start gap-2">
          <input type="radio" :value="2" v-model="committeeScore" />
          <span>ระดับ 2 : ต่ำกว่าที่คาดหวัง</span>
        </label>

        <label class="flex items-start gap-2">
          <input type="radio" :value="3" v-model="committeeScore" />
          <span>ระดับ 3 : ตามที่คาดหวัง</span>
        </label>

        <label class="flex items-start gap-2">
          <input type="radio" :value="4" v-model="committeeScore" />
          <span>ระดับ 4 : สูงกว่าที่คาดหวัง</span>
        </label>
      </div>
    </div>

    <!-- ความคิดเห็น -->
    <div>
      <b>ความคิดเห็นกรรมการ</b>
      <textarea
        v-model="committeeComment"
        class="textarea textarea-bordered w-full mt-1"
        rows="3"
        placeholder="พิมพ์ความคิดเห็น..."
      ></textarea>
    </div>

    <!-- อัปโหลดลายเซ็น -->
    <div>
      <b>อัปโหลดลายเซ็นกรรมการ</b>
      <input
        type="file"
        class="file-input file-input-bordered w-full mt-1"
        accept="image/*"
        @change="onFileChange"
      />
      <div v-if="previewUrl" class="mt-2">
        <img :src="previewUrl" class="w-40 border rounded" />
      </div>
    </div>

    <button class="btn btn-success w-full" @click="submitScore">
      บันทึกผลการประเมิน
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'

const route = useRoute()
const router = useRouter()

const indicatorId = route.params.indicatorId
const evaluateeId = route.params.evaluateeId

const data = ref(null)
const committeeScore = ref(null)
const committeeComment = ref('')
const signatureFile = ref(null)
const previewUrl = ref(null)

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  signatureFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const fetchData = async () => {
  const res = await api.get(`/getattachment/${indicatorId}/${evaluateeId}`)
  data.value = res.data[0]

  if (data.value?.committee_comment) {
    committeeComment.value = data.value.committee_comment
  }
}

const selfScoreText = computed(() => {
  switch (Number(data.value?.self_assessment_score)) {
    case 1: return 'ระดับ 1 : ต่ำกว่าที่คาดหวังมาก'
    case 2: return 'ระดับ 2 : ต่ำกว่าที่คาดหวัง'
    case 3: return 'ระดับ 3 : ตามที่คาดหวัง'
    case 4: return 'ระดับ 4 : สูงกว่าที่คาดหวัง'
    default: return 'ยังไม่ประเมิน'
  }
})

const fileUrl = computed(() => {
  if (!data.value?.storage_path) return ''
  const filename = data.value.storage_path.split('\\').pop()
  return `${api.defaults.baseURL.replace('/api','')}/uploads/misc/${filename}`
})

const submitScore = async () => {
  if (!committeeScore.value) {
    alert('กรุณาเลือกคะแนน')
    return
  }

  const formData = new FormData()
  formData.append('period_id', data.value.period_id)
  formData.append('indicator_id', indicatorId)
  formData.append('evaluatee_id', evaluateeId)
  formData.append('score', committeeScore.value)
  formData.append('comment', committeeComment.value || '')

  if (signatureFile.value) {
    formData.append('file', signatureFile.value)
  }

  await api.post('/createevaluationresults', formData)

  alert('บันทึกผลการประเมินเรียบร้อย')
  router.push('/evaluator/evaluatorperiod')
}

onMounted(fetchData)
</script>
