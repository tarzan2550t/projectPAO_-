<template>
  <!-- SUMMARY -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-blue-500">
      <p class="text-sm font-bold">จำนวนการประเมินทั้งหมด</p>
      <p class="text-3xl font-bold">{{ totalResults }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-green-500">
      <p class="text-sm font-bold">คะแนนเฉลี่ย</p>
      <p class="text-3xl font-bold">{{ avgScore }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-purple-500">
      <p class="text-sm font-bold">ผู้ถูกประเมิน</p>
      <p class="text-3xl font-bold">{{ totalUsers }}</p>
    </div>
  </div>

  <!-- LAST RESULTS -->
  <div class="bg-base-100 rounded-xl shadow">
    <div class="p-4 font-bold text-lg">🕒 ผลการประเมินล่าสุด</div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อ</th>
            <th>หัวข้อ</th>
            <th>คะแนน</th>
            <th>วันที่</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recentResults" :key="item.result_id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.indicator_name }}</td>
            <td>{{ item.score }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api/axios'

const results = ref([])

const fetchResults = async () => {
  const res = await api.get('/getevaluationresultslist')
  results.value = res.data
}

const totalResults = computed(() => results.value.length)

const avgScore = computed(() => {
  if (!results.value.length) return 0
  const sum = results.value.reduce((acc, r) => acc + r.score, 0)
  return (sum / results.value.length).toFixed(2)
})

const totalUsers = computed(() => {
  const ids = new Set(results.value.map(r => r.user_id))
  return ids.size
})

const recentResults = computed(() => results.value.slice(0, 5))

function formatDate(datetime) {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(fetchResults)
</script>