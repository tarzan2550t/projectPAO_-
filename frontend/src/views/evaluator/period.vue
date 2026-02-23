<template>

    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg ">
        
  <table class="table  ">
    <!-- head -->
    <thead>
      <tr>
        <th>ลำดับ</th>
        <th>รอบการประเมิน</th>
        <th>หัวข้อ</th>
        <th>ลายละเอียดคะเเนนะ</th>
        <th>คะเเนน</th>
        <th>จัดการ</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(items, index) in topics" :key="items.id">
        <th>{{ index + 1 }}</th>
        <th>{{ items.topic_name }}</th>
        <td>{{ items.name }}</td>
        <td>{{ items.description }}</td>
        <td>{{items.weight}}</td>
        <td>
          
          <button class="btn btn-outline btn-warning mr-3" @click="() => $router.push(`/evaluator/evaluatorindicator/${items.id}`)">ประเมิน</button>
          
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script setup>
  import { ref , onMounted } from 'vue'
  import api from '../api/axios'
  const topics = ref([])
  async function  fetchperiod () {
    await api.get('/indicatorbyevaluator')
      .then((result)=>{
        console.log(result.data)
        topics.value = result.data
      }).catch((e)=>{
        console.log(e)
      })
  }

  async function deleteperiod(id) {
    if(confirm('delete ' + id + '?')){
       await api.delete(`/deleteperiod/${id}`)
    .then((res)=>{
      
        fetchperiod()
      
        
    }).catch((e)=>{
      console.log(e)
    })
  }
    }
   


  onMounted(fetchperiod)
</script>