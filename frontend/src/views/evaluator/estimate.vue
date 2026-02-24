<template>
  <div class="min-h-screen bg-gray-100 p-4 font-sans">
    <router-link :to="`/evaluator/evaluatorindicator/${indicatorId}`">
      <button class="btn btn-sm btn-outline mb-4">⬅ กลับ</button>
    </router-link>

    <div class="max-w-4xl mx-auto bg-white shadow-lg border border-gray-300 p-8 text-black">
      
      <div class="mb-6">
        <h2 class="text-xl font-bold text-center mb-6">แบบฟอร์มการประเมินผลการปฏิบัติงาน</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div class="flex items-end">
            <span class="font-bold whitespace-nowrap w-24">ชื่อ-นามสกุล:</span>
            <div class="border-b border-dotted border-gray-400 w-full px-2 text-blue-700">
              {{ data?.evaluatee_name || '-' }}
            </div>
          </div>
          <div class="flex items-end">
            <span class="font-bold whitespace-nowrap w-24">รหัสประจำตัว:</span>
            <div class="border-b border-dotted border-gray-400 w-full px-2">
              {{ data?.employee_id || '-' }} </div>
          </div>
          <div class="flex items-end">
            <span class="font-bold whitespace-nowrap w-24">แผนก/ฝ่าย:</span>
            <div class="border-b border-dotted border-gray-400 w-full px-2">
              {{ data?.department || '-' }} </div>
          </div>
          <div class="flex items-end">
            <span class="font-bold whitespace-nowrap w-24">วันที่ประเมิน:</span>
            <div class="border-b border-dotted border-gray-400 w-full px-2">
              {{ new Date().toLocaleDateString('th-TH') }}
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto border border-black mb-6">
        <table class="w-full text-sm text-left border-collapse">
          <thead class="bg-gray-100 text-center font-bold">
            <tr>
              <th rowspan="2" class="border border-black p-2 w-1/3">หัวข้อที่พิจารณา / ตัวชี้วัด</th>
              <th colspan="4" class="border border-black p-2">ระดับคะแนน (กรรมการ)</th>
            </tr>
            <tr>
              <th class="border border-black p-1 w-24 bg-green-50">4<br><span class="text-xs font-normal">สูงกว่าคาดหวัง</span></th>
              <th class="border border-black p-1 w-24">3<br><span class="text-xs font-normal">ตามคาดหวัง</span></th>
              <th class="border border-black p-1 w-24">2<br><span class="text-xs font-normal">ต่ำกว่าคาดหวัง</span></th>
              <th class="border border-black p-1 w-24 bg-red-50">1<br><span class="text-xs font-normal">ต่ำมาก</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-black p-4 align-top">
                <div class="font-bold text-base mb-2">{{ data?.name }}</div>
                
                <div class="text-xs text-gray-600 space-y-2 mt-4 p-2 bg-gray-50 rounded border border-dashed border-gray-300">
                  <p><strong>ผลประเมินตนเอง:</strong> <span class="text-blue-600">{{ selfScoreText }}</span></p>
                  
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span class="font-bold">หลักฐาน:</span>
                    <a v-if="data?.url_name" :href="data.url_name" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1">
                      🔗 ลิงก์แนบ
                    </a>
                    <a v-if="data?.file_name" :href="fileUrl" target="_blank" class="text-green-600 hover:underline flex items-center gap-1">
                      📁 ไฟล์แนบ
                    </a>
                    <span v-if="!data?.url_name && !data?.file_name" class="text-gray-400">- ไม่มี -</span>
                  </div>
                </div>
              </td>

              <td class="border border-black text-center bg-green-50 align-middle hover:bg-green-100 cursor-pointer" @click="committeeScore = 4">
                <input type="radio" :value="4" v-model="committeeScore" class="radio radio-sm radio-success" />
              </td>
              <td class="border border-black text-center align-middle hover:bg-gray-100 cursor-pointer" @click="committeeScore = 3">
                <input type="radio" :value="3" v-model="committeeScore" class="radio radio-sm radio-primary" />
              </td>
              <td class="border border-black text-center align-middle hover:bg-gray-100 cursor-pointer" @click="committeeScore = 2">
                <input type="radio" :value="2" v-model="committeeScore" class="radio radio-sm radio-warning" />
              </td>
              <td class="border border-black text-center bg-red-50 align-middle hover:bg-red-100 cursor-pointer" @click="committeeScore = 1">
                <input type="radio" :value="1" v-model="committeeScore" class="radio radio-sm radio-error" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="border border-black p-4 relative pt-6">
          <span class="absolute top-0 left-2 -mt-3 bg-white px-2 font-bold text-sm">ความคิดเห็นเพิ่มเติม</span>
          <textarea
            v-model="committeeComment"
            class="w-full h-32 p-2 outline-none resize-none text-sm bg-transparent"
            placeholder="ระบุความคิดเห็นหรือข้อเสนอแนะ..."
          ></textarea>
        </div>

        <div class="border border-black p-4 relative pt-6 flex flex-col items-center justify-between">
          <span class="absolute top-0 left-2 -mt-3 bg-white px-2 font-bold text-sm">ลงชื่อกรรมการ</span>
          
          <div class="w-full flex justify-center py-2 min-h-[100px] items-center bg-gray-50 border border-dashed border-gray-300 cursor-pointer relative overflow-hidden group">
            <input
              type="file"
              class="absolute inset-0 opacity-0 cursor-pointer z-10"
              accept="image/*"
              @change="onFileChange"
            />
            
            <img v-if="previewUrl" :src="previewUrl" class="h-24 object-contain" />
            <div v-else class="text-center text-gray-400 text-xs group-hover:text-gray-600">
              <p>คลิกเพื่ออัปโหลดลายเซ็น</p>
              <p>(รองรับไฟล์รูปภาพ)</p>
            </div>
          </div>

          <div class="mt-2 text-center w-full">
            <div class="border-b border-black w-3/4 mx-auto mb-1"></div>
            <p class="text-xs">({{ committeeName || 'กรรมการผู้ประเมิน' }})</p>
          </div>
        </div>

      </div>

      <div class="mt-8 flex justify-end">
        <button class="btn btn-success px-8 text-white" @click="submitScore">
          <span class="mr-2">💾</span> บันทึกผลการประเมิน
        </button>
      </div>

    </div>
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
const committeeName = ref('') // ถ้ามีชื่อกรรมการในระบบ

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  signatureFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

const fetchData = async () => {
  try {
    const res = await api.get(`/getattachment/${indicatorId}/${evaluateeId}`)
    data.value = res.data[0]

    if (data.value?.committee_comment) {
      committeeComment.value = data.value.committee_comment
    }
    // หากต้องการดึงคะแนนเก่ามาแสดงด้วย (ถ้ามี)
    if (data.value?.score) { 
        committeeScore.value = Number(data.value.score)
    }
  } catch (error) {
    console.error("Error fetching data", error)
  }
}

const selfScoreText = computed(() => {
  switch (Number(data.value?.self_assessment_score)) {
    case 1: return 'ระดับ 1 (ต่ำกว่าที่คาดหวังมาก)'
    case 2: return 'ระดับ 2 (ต่ำกว่าที่คาดหวัง)'
    case 3: return 'ระดับ 3 (ตามที่คาดหวัง)'
    case 4: return 'ระดับ 4 (สูงกว่าที่คาดหวัง)'
    default: return 'ยังไม่ประเมิน'
  }
})

const fileUrl = computed(() => {
  if (!data.value?.storage_path) return ''
  // ปรับ path ตาม environment จริงของคุณ
  const filename = data.value.storage_path.split('\\').pop().split('/').pop()
  return `${api.defaults.baseURL.replace('/api','')}/uploads/misc/${filename}`
})

const submitScore = async () => {
  if (!committeeScore.value) {
    alert('กรุณาเลือกคะแนนก่อนบันทึก')
    return
  }

  try {
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
  } catch (error) {
    console.error(error)
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}

onMounted(fetchData)
</script>

<style scoped>
/* เพิ่ม CSS เฉพาะจุดเพื่อให้เส้นขอบตารางคมชัดเหมือนเอกสาร */
table, th, td {
  border-color: #000; /* สีเส้นขอบดำชัดเจน */
}
input[type="radio"] {
    cursor: pointer;
}
</style>