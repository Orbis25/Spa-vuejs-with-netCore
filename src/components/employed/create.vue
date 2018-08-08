<template>
<div class="row">
  <div class="col-12">
      <h2 class="text-center mb-4">
      <v-icon class="ss">work</v-icon><br>
        {{title}}</h2>
    </div>
 <div class="col">
    <el-form v-loading="loading" :rules="rules"  :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
    <el-form-item label="Codigo del Usuario" v-show="ruleForm.id <= 0" prop="codeUser">
    <el-input  class="text-center" v-model="ruleForm.codeUser" :disabled="true">{{positionMethod}}</el-input>
  </el-form-item>
  <div class="row justify-content-around">
  <div class="col">
    <el-form-item label="Nombre Completo" prop="fullName">
     <el-input v-model="ruleForm.fullName"></el-input>
  </el-form-item>
  <el-form-item label="Numero telefonico" prop="phoneNumber">
     <el-input  class="mt-3 numeric" v-model="ruleForm.phoneNumber"></el-input>
  </el-form-item>
    <el-form-item label="Correo electronico" prop="email">
     <el-input type="email"  class="mt-3"  v-model="ruleForm.email"></el-input>
  </el-form-item>
  </div>
  <div class="col">
    <el-form-item label="Cedula o Carnet de identidad" prop="dni">
     <el-input  v-model="ruleForm.dni"></el-input>
  </el-form-item>

    <el-form-item v-show="ruleForm.id > 0" label="Desea cambiar la contraseña?">
    <el-switch v-model="updatePass"></el-switch>
  </el-form-item>

  <div v-show="updatePass || ruleForm.id <= 0">
  <el-form-item label="Contraseña" prop="pass">
     <el-input type="password" class="mt-3" v-model="ruleForm.pass"></el-input>
  </el-form-item>
 <el-form-item label="Confirme su contraseña">
  <small v-show="ruleForm.pass != confirmPass" class="form-text text-red">Las contraseñas no coinciden</small>
     <el-input type="password" class="mt-3" v-model="confirmPass"></el-input>
  </el-form-item>
    </div>
      <el-form-item label="Es Admin?" >
    <el-switch v-model="el_switch"></el-switch>
  </el-form-item>
    <el-form-item>
    <el-button v-show="ruleForm.pass === confirmPass && confirmPass != ''" type="success" @click="save()" >Agregar</el-button>
    <el-button type="info" @click="redirect(path)">Cancelar</el-button>
  </el-form-item>
  </div>
  </div>
    </el-form>
</div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      confirmPass: "",
      el_switch: false,
      updatePass:false,
      ruleForm: {
        codeUser:
          `${"EM-"}` + Math.random().toString(36).substring(7).toUpperCase(),
        id: 0,
        fullName: "",
        phoneNumber: "",
        email: "",
        dni: "",
        pass: "",
        position: 0
      },
      rules: {
        fullName: [
          {
            required: true,
            message: "Porfavor ingrese el nombre",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "Porfavor ingrese el numero",
            trigger: "change"
          },
          {
            min: 10,
            message: "Longitud minina 10",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            message: "Ingrese un numero valido",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Porfavor ingrese un correo valido",
            trigger: "change"
          }
        ],
        dni: [
          {
            required: true,
            message: "Porfavor ingrese su carnet de identidad",
            trigger: "change"
          },
          {
            required: true,
            min: 11,
            max: 11,
            message: "ingrese una cedula valida",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "Porfavor ingrese su contraseña",
            trigger: "change"
          }
        ]
      },
      path: "/empleados"
    };
  },
  created() {
    let user = this;
    //obtener el parametro pasado por la url
    user.get(user.$route.params.id);
  },
  methods: {
    redirect(path) {
      if (path == undefined) return;
      this.$router.push(path);
      this.$message({
        message: "Accion cancelada",
        type: "info"
      });
    },
    save() {
      let user = this;
      user.$refs["ruleForm"].validate(valid => {
        if (valid) {
          user.loading = true;
          if (user.ruleForm.id > 0) {
            user.$store.state.services.employeeService
              .update(user.ruleForm)
              .then(e => {
                user.loading = false;
                user.$message({
                  message: "Empleado actualizado correctamente",
                  type: "success"
                });
                user.$router.push(user.path);
              })
              .catch(e => {
                user.$message({
                  message: "Ha ocurrido un error",
                  type: "error"
                });
              });
          } else {
            user.ruleForm.pass += btoa(user.ruleForm.pass);
            user.$store.state.services.employeeService
              .add(user.ruleForm)
              .then(e => {
                user.loading = false;
                user.$message({
                  message: "Se ha añadido un nuevo empleado",
                  type: "success"
                });
                user.$router.push(user.path);
              })
              .catch(e => {
                user.$message({
                  message: "Ha ocurrido un error",
                  type: "error"
                });
              });
          }
        } else {
          user.$message({
            message: "Ocurrio un error al añadir usuario",
            type: "error"
          });
        }
      });
    },
    get(id) {
      let user = this;
      if (id === undefined) return;
      user.loading = true;
      user.$store.state.services.employeeService
        .get(id)
        .then(e => {
          user.loading = false;
          user.ruleForm.id = e.data.id;
          user.ruleForm.fullName = e.data.fullName;
          user.ruleForm.phoneNumber = e.data.phoneNumber;
          user.ruleForm.email = e.data.email;
          user.ruleForm.dni = e.data.dni;
          user.ruleForm.position = e.data.position;
          user.ruleForm.pass = e.data.pass;
          user.confirmPass = e.data.pass;
          if (user.ruleForm.position === 1) {
            user.el_switch = true;
          }
          if(user.ruleForm.position === 0){
            user.el_switch = false;
          }
        })
        .catch(e => {
          user.$message({
            message: "Ha ocurrido un error",
            type: "error"
          });
        });
    }
  },
  computed: {
    title() {
      return this.ruleForm.id === 0 ? "Nuevo Empleado" : this.ruleForm.fullName;
    },
    positionMethod() {
      return this.el_switch === false
        ? (this.ruleForm.position = 0)
        : (this.ruleForm.position = 1);
    }
  }
};
</script>

<style>
.ss {
  font-size: 5em;
}
.text-red {
  color: red;
}
</style>