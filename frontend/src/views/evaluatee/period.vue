<template>
  <div>
    <!-- ปุ่มเพิ่มหัวข้อ -->
  

    <!-- ตาราง Periods -->
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
      <table class="table">
        <thead>
          <tr>
            <!-- <th>id</th> -->
            <th>รอบการประเมิน</th>
            <th>เริ่ม</th>
            <th>สิ้นสุด</th>
            <th>Status</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in periods" :key="item.id">
            <!-- <th>{{ index + 1 }}</th> -->
            <td>{{ item.name }}</td>
            <td>
              {{ formatDate(item.start_date) }}
            </td>
            <td>{{ formatDate(item.end_date) }}</td>
            <td>
              <button
                class="btn btn-outline"
                :class="item.status === 1 ? 'btn-success' : 'btn-error'"
              >
                {{ item.status === 1 ? 'เปิดใช้งาน' : 'ไม่ใช้งาน' }}
              </button>
            </td>
            <td>
                <router-link :to="`/evaluatee/evaluateeindicator/${item.id}`">
                  <button class="btn btn-outline btn-warning mr-3">ประเมิน</button>
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const periods = ref([])

// ดึงข้อมูล Periods
async function fetchPeriods() {
  try {
    const res = await api.get('/periodopen')
    periods.value = res.data
  } catch (err) {
    console.error('Fetch periods error:', err)
  }
}


// แปลงวันที่ให้อ่านง่าย
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH') // dd/mm/yyyy
}

// เรียก fetch ตอน component mounted
onMounted(fetchPeriods)
</script>
