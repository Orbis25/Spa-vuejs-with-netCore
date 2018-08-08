<template>
<div class="row justify-conten-around mt-3">
  <div class="col">
    <div class="row">
    <div class="col-12">
    <h1>Inicio</h1>
     <hr>
   </div>
    <div class="container">
       <el-row class="mt-2" :gutter="12">
  <el-col :span="8">
    <el-card shadow="always">
      <div class="text-center">
        <v-icon>work</v-icon>
      <h3>{{data[2]}} Empleados</h3> 
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
     <el-card shadow="always">
      <div class="text-center">
        <v-icon>accessibility_new</v-icon>

      <h3>{{data[3]}} Clientes</h3> 
      </div>
    </el-card>
  </el-col>
  <el-col :span="8">
   <el-card shadow="always">
      <div class="text-center">
        <v-icon>view_comfy</v-icon>

      <h3>{{data[0]}} Productos</h3> 
      </div>
    </el-card>
  </el-col>
    </el-row>
    </div>
    </div>
    <chartjs-doughnut v-bind:labels="labels" v-bind:datasets="datasets"
    v-bind:option="option"></chartjs-doughnut>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "dashboard",
      //for charts.js
      labels: ["producto", "Empleados", "Cliente","Ventas"],
      datasets: [
        {
          data: [0, 0 , 0 , 0],
          backgroundColor: ["Red", "Yellow", "Blue","Green"]
        }
      ],
      option:{
         title: {
                display: true,
                position: 'bottom',
                text: 'Dashboard'
            }
      },
      data:[]
    };
  },
  created(){
    let count = this
    count.get()
  },
  methods:{
    get(){
      let count = this
      count.$store.state.services.countAll
      .get()
      .then(e =>{
        count.data = e.data,
        count.datasets[0].data[0] = e.data[0]
        count.datasets[0].data[1] = e.data[2]
        count.datasets[0].data[2] = e.data[3]
        count.datasets[0].data[3] = e.data[1]
      })
      .catch(e =>{
        count.$message('Ha ocurrido un error')
      })
    }
  }
};
</script>

<style>

</style>
