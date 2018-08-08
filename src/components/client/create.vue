<template>
<div class="row">
    <div class="col-12">
      <h2 class="text-center mb-4">
      <v-icon class="ss">accessibility</v-icon><br>
        {{title}}</h2>
    </div>
  
  <div class="col">
    <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item label="Codigo del cliente" v-show="ruleForm.id <= 0" prop="clientCode">
    <el-input  class="mb-5 text-center"  v-model="ruleForm.clientCode" :disabled="true"></el-input>
  </el-form-item>
<div class="row justify-content-around">
  <div class="col">
    
    <el-form-item label="Nombre Completo" prop="fullName">
     <el-input v-model="ruleForm.fullName"></el-input>
  </el-form-item>

   <el-form-item label="Numero telefonico" prop="phoneNumber">
     <el-input  class="mt-3" v-model="ruleForm.phoneNumber"></el-input>
  </el-form-item>
  </div>
  <div class="col">
    <el-form-item label="Correo electronico" prop="email">
     <el-input type="email"  v-model="ruleForm.email"></el-input>
  </el-form-item>

  <el-form-item label="Cedula o Carnet de identidad" prop="dni">
     <el-input  class="mt-3" v-model="ruleForm.dni"></el-input>
  </el-form-item>
    <el-form-item>
     <el-button type="success" @click="save()" >Agregar</el-button>
   <el-button type="danger" @click="redirect(path)">Cancelar</el-button>
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
      ruleForm: {
        id: 0,
        clientCode:
        `${"CL-"}` + Math.random().toString(36).substring(7).toUpperCase(),
        fullName: null,
        phoneNumber: null,
        email: null,
        dni: null
      },
      rules: {
        fullName: [
          {
            required: true,
            message: "Porfavor ingrese el Nombre completo ",
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
            required: true,
            message: "Porfavor ingrese su correo electronico ",
            trigger: "blur"
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
        ]
      },
      path: "/clientes"
    };
  },
  created() {
    let client = this;
    //ruta , param es el parametro en este caso.(id)
    client.get(client.$route.params.id);
  },
  methods: {
    redirect(path) {
      if (path == undefined) return;
      this.$router.push(path);
      this.$message({
        message:'Accion cancelada',
        type:'info'
      })
    },
    save() {
      let client = this;
      client.$refs["ruleForm"].validate(valid => {
        if (valid) {
          client.loading = true;
          if (client.ruleForm.id > 0) {
            client.$store.state.services.clientService
            .update(client.ruleForm)
            .then(c => {
              client.loading = false
              client.$message({
                message:'Cliente Actualizado correctamente',
                type:'success'
              })
              client.$router.push("/clientes");
            })
            .catch(c =>{
              client.$message({
                message:'Ha ocurrido un error',
                type:'error'
              })
            })
          } else {
            client.$store.state.services.clientService
              .addClient(client.ruleForm)
              .then(c => {
                client.loading = false;
                client.$message({
                  message: "Se ha añadido un nuevo cliente",
                  type: "success"
                });
                client.$router.push(client.path);
              })
              .catch(c => {
                client.$message({
                  message: "Ha ocurrido un error",
                  type: "error"
                });
              });
          }
        }
      });
    },
    get(id) {
      if (id == undefined) return;
      let client = this;
      client.loading = true;
      client.$store.state.services.clientService
        .get(id)
        .then(c => {
          client.loading = false;
          client.ruleForm.id = c.data.id;
          client.ruleForm.fullName = c.data.fullName;
          client.ruleForm.email = c.data.email;
          client.ruleForm.phoneNumber = c.data.phoneNumber;
          client.ruleForm.dni = c.data.dni;
        })
        .catch(c => {
          client.$message({
            message: "Ha ocurrido un error",
            type: "error"
          });
        });
    }
  },
  computed: {
    title() {
      return this.ruleForm.id === 0
        ? "Nuevo Cliente"
        : `${this.ruleForm.fullName}`;
    },
    
  }
};
</script>
<style>
.ss {
  font-size: 5em;
}
</style>
