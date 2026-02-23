<template>
  
  
    <router-link to="/admin/adminaddindicator">
<button  class="btn btn-warning mb-4">เพิ่มหัวข้อการปรเมิน</button>
</router-link>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg ">
        
  <table class="table  ">
    <!-- head -->
    <thead>
      <tr >
        <th>ลำดับ</th>
        <th>รอบการประเมิน</th>
        <th>อธิบายเเบบประเมิน</th>
        <th>รูปเเบบประเมิน</th>
        <th>คะเเนน</th>
        <th>เเผนกที่ประเมิน</th>
        <th>จัดการ คณะกรรมการ</th>
        <th>จัดการเเบบประเมิน</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(items, index) in indicator"  class="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <th>{{ index + 1 }}</th>
        <td>{{ items.topic_name }}</td>
        <td>{{ items.description }}</td>
        <td>{{ items.type === "score_1_4" ? 'คะเเนน 1-4 ' : 'มี/ไม่มี' }}</td> 
        
        <td>{{ items.weight }}</td> 
        <td>{{ items.dprt_name }}</td> 
        <td><router-link to="/admin/assignment"><button class="btn btn-warning">คณะกรรมการ</button></router-link></td> 
        <td><button class="btn btn-warning mr-3">เเก้ไขเเบบประเมิน</button>
            <button class="btn btn-error" @click="deleteindicator(items.id)">ลบเเบบประเมิน</button>
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script setup>
  import { ref , onMounted } from 'vue'
  import api from '../api/axios'
  const indicator = ref([])
  async function  fetchperiod () {
    await api.get('/indicatorlist')
      .then((result)=>{
        // console.log(result.data)
        indicator.value = result.data
      }).catch((e)=>{
        console.log(e)
      })
  }

  async function deleteindicator(id) {
    if(confirm('delete ' + id + '?')){
       await api.delete(`/deleteindicator/${id}`)
    .then((res)=>{
      
        fetchperiod()
      
        
    }).catch((e)=>{
      console.log(e)
    })
  }
    }
  const  goBack = ()=> {
      window.history.back(); // กลับหน้าเดิม
    }
 

  onMounted(fetchperiod)
</script>