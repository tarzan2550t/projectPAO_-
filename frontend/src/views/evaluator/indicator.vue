<template>
  <router-link to="/evaluator/evaluatorperiod">
    <button class="btn btn-primary mb-4">กลับ</button>
  </router-link>

  <div class="overflow-x-auto rounded-box border bg-base-100 shadow-lg">
    <table class="table">
      <thead>
        <tr>
          <th>ลำดับ</th>
          <th>ชื่อผู้ถูกประเมิน</th>
          <th>หัวข้อการประเมิน</th>
          <th>จัดการ</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in attachments" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.evaluatee_name }}</td>
          <td>{{ item.indicator_name }}</td>

          <td>
            <button
              class="btn btn-outline btn-warning"
              @click="goToEvaluate(item.evaluatee_id)"
            >
              ประเมินคนนี้
            </button>
          </td>
        </tr>

        <tr v-if="attachments.length === 0">
          <td colspan="5" class="text-center text-gray-400">
            ไม่มีข้อมูล
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'

const route = useRoute()
const router = useRouter()

const indicatorId = route.params.id
const attachments = ref([])

const fetchData = async () => {
  try {
    const res = await api.get(`/getattachments/${indicatorId}`)
    attachments.value = res.data
    console.log(res.data)
  } catch (err) {
    console.error(err)
  }
}

const goToEvaluate = (evaluateeId) => {
  router.push(`/evaluator/evaluatorestimate/${evaluateeId}/${indicatorId}`)
}

onMounted(fetchData)
</script>
