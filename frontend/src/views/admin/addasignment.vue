<template>
  <div class="flex items-start justify-center bg-base-100 min-h-screen p-4">
    <form
      class="card w-full max-w-2xl bg-base-100 shadow-xl p-6 space-y-4"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold text-center text-primary">
        Add Period
      </h2>

      <!-- เลือก Period -->
      <div class="form-control">
        <label class="label text-sm">หัวข้อประเมินประจำปี</label>
        <select v-model="periodId" class="select select-bordered w-full">
          <option value="" disabled>เลือกแบบประเมิน</option>
          <option
            v-for="item in periods"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      

      <!-- เลือก Evaluator -->
      <div class="flex gap-4">
        <div class="form-control flex-1">
          <label class="label text-sm">กรรมการประเมิน</label>
          <select v-model="evaluatorId" class="select select-bordered w-full">
            <option value="" disabled>เลือกกรรมการ</option>
            <option
              v-for="item in evaluators"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="form-control flex-1">
          <label class="label text-sm">ประเภทกรรมการ</label>
          <select v-model="type" class="select select-bordered w-full">
            <option value="" disabled>เลือกประเภท</option>
            <option value="ร่วม">กรรมการร่วม</option>
            <option value="หลัก">กรรมการหลัก</option>
          </select>
        </div>
      </div>

      <button class="btn btn-primary w-full mt-4">
        Save
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// arrays
const periods = ref([])
const users = ref([])
const evaluators = ref([])

// v-model
const periodId = ref('')
const userId = ref('')
const evaluatorId = ref('')
const type = ref('')
const department = ref('')

// watch → เปลี่ยน department ตาม user


// submit
const handleSubmit = async () => {
  // ✅ validation
  if (!periodId.value) {
    alert('กรุณาเลือกหัวข้อประเมินประจำปี')
    return
  }

 

 

  if (!evaluatorId.value) {
    alert('กรุณาเลือกกรรมการประเมิน')
    return
  }

  if (!type.value) {
    alert('กรุณาเลือกประเภทกรรมการ')
    return
  }

  // ผ่าน validation แล้วค่อยส่ง
  const payload = {
    indicator_id: periodId.value,
    evaluator_id: evaluatorId.value,
    type: type.value,
  }

  try {
    // console.log(payload)
    await api.post('/createassignment', payload)
    router.push('/admin/assignment')
  } catch (err) {
    console.error(err)
    alert('บันทึกข้อมูลไม่สำเร็จ')
  }
}
// fetch data
const fetchPeriods = async () => {
  const res = await api.get('/indicatorlist')
  periods.value = res.data
}

const fetchUsers = async () => {
  const resEvaluator = await api.get('/userevaluator')
  evaluators.value = resEvaluator.data


}

onMounted(() => {
  fetchPeriods()
  fetchUsers()
})
</script>
