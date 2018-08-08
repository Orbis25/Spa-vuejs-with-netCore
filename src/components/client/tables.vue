<template>

  <v-card v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Clientes
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
              <v-icon >add</v-icon>
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
        <td>{{ props.item.clientCode }}</td>
        <td class="">{{ props.item.fullName }}</td>
        <td class="">{{ props.item.email }}</td>
        <td class="">{{ props.item.phoneNumber }}</td>
        <td class="">{{ props.item.dni }}</td>
        <td>
          <button @click="deleteClient(props.item.id)"><v-icon class="btn btn-danger">delete</v-icon></button>
          <button @click="$router.push(`/actualizar/cliente/${props.item.id}/`)"><v-icon class="btn btn-success">edit</v-icon></button>
          <button><v-icon class="btn btn-info">remove_red_eye</v-icon></button></td>
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
      data: [],
      name: "table",
      path: "/addcliente",
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
        { text: "dni", value: "dni" },
        { text: "Accion", value: "action" }
      ]
    };
  },
  created() {
    let self = this;
    self.getAll();
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    },
    getAll() {
      let self = this;
      self.loading = true;
      //conectamos al seervicio
      self.$store.state.services.clientService
        //accedemos al metodo
        .getAll()
        //indicamos que tiene que hacer
        .then(c => {
          self.data = c.data;
          self.loading = false;
        })
        .catch(c => {
          self.$message({
            message: "ocurrio un error",
            type: "error"
          });
        });
    },
    deleteClient(id) {
      let client = this;
      client.$confirm(
        "Va a eliminar un cliente, seguro que desea continuar?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
        .then(() => {
          client.$store.state.services.clientService
            .delete(id)
            .then(c => {
              client.$message({
                message: "Cliente eliminado correctamente",
                type: "success"
              });
              client.getAll();
            })
            .catch(c => {
              client.$message({
                message: "Ha ocurrido un error",
                type: "error"
              });
            });
        })
        .catch(() => {
          client.$message({
            type: "info",
            message: "Accion cancelada"
          });
        });
    }
  }
};
</script>
<style>
.add {
  color: white;
}
</style>
