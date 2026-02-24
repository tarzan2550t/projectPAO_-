<template>
  <!-- SUMMARY -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-yellow-500">
      <p class="text-sm font-bold">รอการประเมิน</p>
      <p class="text-3xl font-bold">{{ pendingCount }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-green-500">
      <p class="text-sm font-bold">ประเมินสำเร็จ</p>
      <p class="text-3xl font-bold">{{ completedCount }}</p>
    </div>

    <div class="bg-white p-6 rounded-xl shadow border-b-4 border-purple-500">
      <p class="text-sm font-bold">จำนวนหัวข้อ</p>
      <p class="text-3xl font-bold">{{ indicatorCount }}</p>
    </div>
  </div>

  <!-- HISTORY TABLE -->
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>หัวข้อ</th>
          <th>ผู้ประเมิน</th>
          <th>คะแนน</th>
          <th>สถานะ</th>
          <th>วันที่</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in results" :key="item.result_id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.indicator_name }}</td>
          <td>{{ item.evaluator_name }}</td>
          <td>{{ item.score ?? '-' }}</td>
          <td>
            <span
              class="badge"
              :class="item.score ? 'badge-success' : 'badge-warning'"
            >
              {{ item.score ? 'ประเมินแล้ว' : 'รอการประเมิน' }}
            </span>
          </td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api/axios'

const results = ref([])

const fetchMyResults = async () => {
  const res = await api.get('/getresultebyid')
  results.value = res.data
}

const pendingCount = computed(() =>
  results.value.filter(r => !r.score).length
)

const completedCount = computed(() =>
  results.value.filter(r => r.score).length
)

const indicatorCount = computed(() => {
  const set = new Set(results.value.map(r => r.indicator_id))
  return set.size
})

function formatDate(datetime) {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(fetchMyResults)
</script>