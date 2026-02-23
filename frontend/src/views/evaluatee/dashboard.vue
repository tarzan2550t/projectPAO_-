<template>

    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
        <p class="text-sm text-gray-500 uppercase font-bold text-black">รอการประเมิน</p>
        <p class="text-3xl font-bold text-black">1</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border-b-4 border-green-500">
        <p class="text-sm text-gray-500 uppercase font-bold text-black">ประเมินสำเร็จ</p>
        <p class="text-3xl font-bold text-black" >2</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border-b-4 border-purple-500">
        <p class="text-sm text-gray-500 uppercase font-bold text-black">จำนวนหัวข้อ</p>
        <p class="text-3xl font-bold text-black">8</p>
      </div>
    </div>



    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table class="table">
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
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
  
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';


</script>


