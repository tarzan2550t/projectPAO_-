<template>
    <router-link to="/admin/adminaddtopic">
<button class="btn btn-warning mb-4">เพิ่มหัวข้อการปรเมิน</button>
</router-link>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg ">
        
  <table class="table  ">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="items in topics">
        <th>{{ items.id }}</th>
        <th>{{ items.period_name }}</th>
        <td>{{ items.name }}</td>
        <td>{{ items.description }}</td>
        <td>{{items.weight}}</td>
        <td><button class="btn btn-outline btn-warning mr-3">Edit</button>
            <button class="btn btn-outline btn-error" @click="deleteperiod(items.id)">Delete</button>
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
    await api.get('/topiclist')
      .then((result)=>{
        topics.value = result.data
      }).catch((e)=>{
        console.log(e)
      })
  }

  async function deleteperiod(id) {
    if(confirm('delete ' + id + '?')){
       await api.delete(`/deletetopic/${id}`)
    .then((res)=>{
      
        fetchperiod()
      
        
    }).catch((e)=>{
      console.log(e)
    })
  }
    }

  
   


  onMounted(fetchperiod)
</script>