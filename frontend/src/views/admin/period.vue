<template>
  <div>
    <!-- ปุ่มเพิ่มหัวข้อ -->
    <router-link to="/admin/addperiod">
      <button class="btn btn-warning mb-4">เพิ่มหัวข้อการประเมิน</button>
    </router-link>

    <!-- ตาราง Periods -->
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg">
      <table class="table">
        <thead>
          <tr>
            
            <th>รอบการประเมิน</th>
            
            <th>วันที่เริ่ม</th>
            <th>วันที่สิ้นสุด</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in periods" :key="item.id"  class="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <td>{{ item.name }}</td>
            <td>{{ formatDate(item.start_date) }}</td>
            <td>{{ formatDate(item.end_date) }}</td>
            <td>
              <button
                class="btn btn-outline shadow-lg "
                :class="item.status === 1 ? 'btn-success' : 'btn-error'"
              >
                {{ item.status === 1 ? 'เปิดรอบการประเมิน' : 'ปิดรอบการประเมิน' }}
              </button>
            </td>
            <td>
              <router-link :to="`/admin/editperiod/${item.id}`">
                <button class="btn  btn-warning mr-3">เเก้ไขรอบ</button>
              </router-link>
              <button class="btn  btn-primary m-2 mr-3" @click="deletePeriod(item.id)">เปิดรอบการเมิน</button>
              <button class="btn  btn-error" @click="deletePeriod(item.id)">ปิดรอบการประเมิน</button>
              

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
    const res = await api.get('/periodlist')
    periods.value = res.data
  } catch (err) {
    console.error('Fetch periods error:', err)
  }
}

// ลบ Period และ refresh ตาราง
async function deletePeriod(id) {
  if (!confirm(`Delete ${id}?`)) return
  try {
    await api.delete(`/deleteperiod/${id}`)
    await fetchPeriods() // refresh หลัง delete
  } catch (err) {
    console.error('Delete period error:', err)
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
