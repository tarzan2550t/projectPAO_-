<template>
  <div class="flex items-start justify-center bg-base-100 min-h-screen p-1">
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
          <label class="label text-sm">รอบการประเมิน</label>
          <select v-model="period" class="select select-bordered w-full">
            <option value="" disabled selected>เลือกรอบการประเมิน</option>
            <option :value="items.id" v-for="items in source" :key="items.id">{{items.name}}</option>
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
      <div class="form-control w-full">
  <label class="label text-sm">รูปแบบการประเมิน</label>
   <select v-model="evaluationType" class="select select-bordered w-full">
            <option value="" disabled selected>เลือกแบบประเมิน</option>
            <option value="yes/no">ไม่มี/มี</option>
            <option value="score_1_4">คะเเนน 1-4 </option>

          </select>
</div>

      <!-- Row: Start Date + End Date -->
      <div class="form-control flex-1 ">
          <label class="label text-sm w-full">คะเเนนน้ำหนัก</label>
          <input
            v-model="weight"
            type="text"
            class="input input-bordered w-full"
            required
            placeholder="คะเเนนน้ำหนัก"
          />
        </div>
        
 แนบภาพวิดีโอประกอบการประเมิน

 <div class="flex gap-4  w-full">
  
      <!-- URL attachment -->
    <div class="form-control w-full flex-1">
    <label class="label text-sm">แนบ URL</label>
    <input
      v-model="url"
      type="url"
      class="input input-bordered w-full"
      placeholder="https://example.com"
    />
  </div>

      <!-- File attachment -->
      <div class="form-control flex-1">
        <label class="label text-sm">แนบไฟล์</label>
        <input
          type="file"
          @change="handleFile"
          class="file-input file-input-bordered w-full"
        />
      </div>
       
</div>
<div>
  เเผนกผู้รับการประเมิน
  <div class="form-control flex-1">
          <label class="label text-sm">เเผนก</label>
          <select v-model="department" class="select select-bordered w-full">
            <option value="" disabled selected>เลือกเเผนก</option>
            <option :value="items.id" v-for="items in deprt" :key="items.id">{{items.name}}</option>
          </select>
        </div>
</div>
      <!-- Submit Button -->
      <button class="btn btn-primary w-full mt-2">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref  , onMounted} from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'


const router = useRouter()

const username = ref('')
const period = ref('')
const evaluationType = ref('')
const description = ref('')
const weight = ref('')
const department = ref('');
const source = ref([])
const deprt = ref([])


const url = ref('')
const file = ref(null)

const handleFile = (e) => {
  file.value = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', username.value)
  formData.append('period_id', period.value)
  formData.append('department_id', department.value)
  formData.append('evaluation_type', evaluationType.value)
  formData.append('weight', weight.value)
  formData.append('url', url.value)
  formData.append('description', description.value)
  if (file.value) formData.append('file', file.value)
// for (const [key, value] of formData.entries()) {
//     console.log(key, value)
//   }
  try {
   
    await api.post('/createindicator', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    router.push('/admin/indicator')
  } catch (err) {
    console.error(err)
  }
}


function fetchperiods() {
  api.get('/periodlist')
    .then((response) => {
      
      source.value = response.data
    })
    .catch((error) => {
      console.error('Error fetching periods:', error)
    })
}
function fetchdepartment() {
  api.get('/departmentlist')
  .then((response)=>{
    console.log(response)
    deprt.value = response.data
  })
}
onMounted(async ()=>{
 await fetchperiods(); 
  await fetchdepartment() ;
})
</script>
