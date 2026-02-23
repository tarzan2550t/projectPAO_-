<template>
    <router-link to="/admin/adminaddassignment">
<button class="btn btn-warning mb-4">เพิ่มหัวข้อการปรเมิน</button>
</router-link>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-lg ">
        
  <table class="table  ">
    <!-- head -->
    <thead>
      <tr>
        <th>ลำดับ</th>
        <th>ผู้รับการประเมิน</th>
        <th>กรรมการประเมิน</th>
        <th>ประเภทกรรมการประเมิน</th>
        <th>หัวข้อประเมินประจำปี</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(items, index) in assignment"  class="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <th>{{ index + 1 }}</th>
        <td>{{ items.indicator_name }}</td>
        <td>{{ items.evaluator_name }}</td>
        <td>{{ items.type }}</td>
        <td><button class="btn  btn-warning mr-3">เเก้ไข้</button>
            <button class="btn  btn-error" @click="deleteassignment(items.id)">ลบ</button>
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
</template>
<script setup>
  import { ref , onMounted } from 'vue'
  import api from '../api/axios'
  const assignment = ref([])
  async function  fetchassignment () {
    await api.get('/assignmentlist')
      .then((result)=>{
        // console.log(result.data)
        assignment.value = result.data
      }).catch((e)=>{
        console.log(e)
      })
  }
  async function deleteassignment(id) {
    if(confirm('delete ' + id + '?')){
       await api.delete(`/deleteassignment/${id}`)
    .then((res)=>{
      
        fetchassignment()
      
        
    }).catch((e)=>{
      console.log(e)
    })
  }
    }
  onMounted (()=>{
    fetchassignment()
  })
</script>