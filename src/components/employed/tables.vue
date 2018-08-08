<template>
  <v-card  v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Empleados
       <v-btn class="add"
              color="red darken-2"
              dark
              small
              =
              top
              left
              fab
              @click="redirect(path)"
            >
              <v-icon>add</v-icon>
            </v-btn>
    </h1>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.codeUser }}</td>
        <td class="">{{ props.item.fullName }}</td>
        <td class="">{{ props.item.email }}</td>
        <td class="">{{ props.item.phoneNumber }}</td>
        <td class="">{{ props.item.dni }}</td>
        <td class="">
          <div v-if="props.item.position == 1">
              <div>Admin</div>
          </div>
          <div v-else>
              <div>Empleado</div>
          </div>
          </td>
        <td>
          <div class="row">
          <button @click="deleteEm(props.item.id)" ><v-icon class="btn btn-danger ">delete</v-icon></button>
          <button @click="$router.push(`/actualizar/empleado/${props.item.id}/`)"><v-icon class="btn btn-success ">edit</v-icon></button>
          <button><v-icon class="btn btn-info">remove_red_eye</v-icon></button>
          </div>
         </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>
<script>
/* eslint-disable */ 
export default {
  data() {
    return {
      name: "table",
      path:'/addempleado',
      search: "",
      loading: false,
      headers: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "code"
        },
        { text: "Nombre", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Numero", value: "phoneNumber" },
        { text: "Cedula", value: "dni" },
        { text: "Cargo", value: "position" },
        { text: "Accion", value: "action" }
      ]
    };
  },
  created(){
    let service = this;
    service.getAll();
  },
  methods: {
    redirect(path) {
      if (path === undefined) return
      this.$router.push(path)
    },
    getAll(){
      let service = this;
      service.loading = true;
      service.$store.state.services.employeeService
      .getAll()
      .then(e =>{
        service.data = e.data;
        service.loading = false
      })
      .catch(e =>{
          service.$message({
            message:"ha ocurrido un error",
            type:"error"
          })
      })
    },
    deleteEm(id){
      let service = this
      service.$confirm(
        "Va a eliminar un empleado, seguro que desea continuar?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
      .then(c =>{
        service.loading = true
      service.$store.state.services.employeeService
      .delete(id)
      .then(e =>{
        service.loading = false
          service.$message({
            message:"Empleado eliminado",
            type:"success"
          })
          service.getAll();
      })
      .catch(e =>{
        service.$message({
            message:"ha ocurrido un error",
            type:"error"
          })
      })
      })
      .catch(c =>{
        service.$message({
            message:"Accion cancelada",
            type:"info"
          })
      })  
    }
  }
}
</script>

<style>

.add {
  color: white;
}
</style>
