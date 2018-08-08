<template>
  <div class="row">
    <div class="col ">
  <el-input placeholder="Cliente" disabled="true"  v-model="cliente"></el-input><br>
  </div>
  <div class="col">
    <el-button type="primary"   @click="dialogFormVisible1 = true" >buscar</el-button>
  </div>
  <el-dialog title="Clientes" :visible.sync="dialogFormVisible1">
<v-card  v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Clientes
    </h1>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
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
        <td>{{props.item.fullName}}</td>
        <td>
          <div class="row">
          <button @click="add(props.item.id , props.item.fullName)" ><v-icon class="btn btn-success">add</v-icon></button>
          </div>
         </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>       
    </el-dialog>
</div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      data: [],
      name: "table",
      dialogFormVisible1: false,
      loading: false,
      cliente: null,
      idCliente:0,
      search: null,
      headers: [{ text: "Nombre", value: "fullName" }]
    };
  },
  created() {
    let client = this;
    client.get();
  },
  methods: {
    get() {
      let client = this;
      client.$store.state.services.clientService
        .getAll()
        .then(c => {
          client.data = c.data;
        })
        .catch(c => {
          client.$message({
            message: "ha ocurrido un error al cargar los clientes",
            type: "error"
          });
      });
    },
    add(value1 , value2){
      let client =  this
      client.dialogFormVisible1 = false
      client.cliente = value2
      client.idCliente = value1

      client.$emit('selectClient' , value1)

    }
  }
};
</script>
<style>
</style>
