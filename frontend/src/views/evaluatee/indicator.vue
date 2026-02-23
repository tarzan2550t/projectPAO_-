<template>
    <router-link to="/evaluatee/evaluateeperiod">
      <button class="btn btn-primary mb-4">กลับ</button>
    </router-link>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg ">
        
  <table class="table  ">
    <!-- head -->
    <thead>
      <tr >
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(items, index) in indicator">
        <th>{{ index + 1 }}</th>
        <td>{{ items.topic_name }}</td>
        <td>{{ items.description }}</td>
        <td>{{ items.type }}</td> 
        <td>{{ items.weight }}</td> 
        <td>
          <router-link :to='`/evaluatee/evaluateeestimate/${items.id}`'>
            <button class="btn btn-outline btn-warning mr-3">ประเมิน</button>
          </router-link>
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script setup>
  import { ref , onMounted } from 'vue'
  import api from '../api/axios'
  import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const params = route.params.id

  const indicator = ref([])
  const periodId = params; // ตัวอย่างการใช้ periodId ค่าคงที่
  async function  fetchperiod () {
    await api.get(`/getindicator/${periodId}`)
      .then((result)=>{
        // console.log(result.data)
        indicator.value = result.data
      }).catch((e)=>{
        console.log(e)
      })
  }


   
 

  onMounted(fetchperiod)
</script>