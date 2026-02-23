<template>
  <div class="flex items-start justify-center bg-base-100 min-h-screen p-4">
    <form
      class="card w-full max-w-3xl bg-base-100 shadow-xl p-6 space-y-4"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold text-center text-primary mb-4">เพิ่มเเบบประเมิน</h2>

      <!-- Row: Topic + Evaluation Type -->
      <div class="flex gap-4  w-full">
        <div class="form-control flex-1">
          <label class="label text-sm">หัวข้อการพัฒนา</label>
          <input
            v-model="username"
            type="text"
            class="input input-bordered"
            required
            placeholder="ชื่อหัวข้อ"
          />
        </div>

        <div class="form-control flex-1">
          <label class="label text-sm">รูปแบบการประเมิน</label>
          <select v-model="evaluationType" class="select select-bordered w-full">
            <option value="" disabled selected>เลือกแบบประเมิน</option>
            <option value="self">Self</option>
            <option value="peer">Peer</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      <!-- Description -->
 <div class="form-control w-full">
  <label class="label text-sm">คำอธิบาย</label>
  <textarea
    v-model="description"
    class="textarea textarea-bordered w-full"
    placeholder="รายละเอียดเกี่ยวกับหัวข้อนี้"
  ></textarea>
</div>

      <!-- Related Department -->
     <!-- Row: Topic + Evaluation Type -->
      <div div class="flex gap-4  w-full">
        <div class="form-control flex-1">
          <label class="label text-sm">หัวข้อการพัฒนา</label>
          <input
            v-model="username"
            type="text"
            class="input input-bordered"
            required
            placeholder="ชื่อหัวข้อ"
          />
        </div>
      </div>

    

      <!-- Submit Button -->
      <button class="btn btn-primary w-full mt-2">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const evaluationType = ref('')
const description = ref('')
const department = ref('')
const dateStart = ref('')
const dateEnd = ref('')
const url = ref('')
const file = ref(null)

const handleFile = (e) => {
  file.value = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', username.value)
  formData.append('evaluation_type', evaluationType.value)
  formData.append('description', description.value)
  formData.append('department', department.value)
  formData.append('start_date', dateStart.value)
  formData.append('end_date', dateEnd.value)
  formData.append('url', url.value)
  if (file.value) formData.append('file', file.value)

  try {
    await api.post('/createperiod', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    router.push('/admin/period')
  } catch (err) {
    console.error(err)
  }
}
</script>
