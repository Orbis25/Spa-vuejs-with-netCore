
<template>
<div class="row justify-content-center">
    <div class="col-6">
    <el-card shadow="always">
        <h1 class="text-center">Login</h1>
        <div class="row justify-content-center">
            <div class="col-">
            <img class="posicionimg" src="@/assets/loginIcon.png" alt="">
            </div>
        </div>
    </el-card>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" class="mt-2" label-width="100px" :model="formLabelAlign">
  <el-form-item label="Correo">
    <el-input v-model="formLabelAlign.email"></el-input>
  </el-form-item>
  <el-form-item label="Contraseña">
    <el-input v-model="formLabelAlign.password"></el-input>
  </el-form-item>
  <el-button type="primary" class="btn btn-block">Entrar</el-button>
</el-form>
    </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          email: '',
          passwort: ''
        }
      };
    }
  }
</script>
<style>
</style>
