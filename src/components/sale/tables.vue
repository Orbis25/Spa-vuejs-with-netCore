<template>
  <v-card v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Ventas
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
        <td>{{ props.item.saleCode}}</td>
         <td class="">{{ 
           props.item.dateTime  }}</td>
         <td class="">{{ props.item.client.fullName }}</td>
        <td class="">{{ props.item.total }}</td> 
        <td>
          <button  @click="removed(props.item.id)"><v-icon class="btn btn-danger">delete</v-icon></button>
          <button @click="$router.push(`${pathview}/${props.item.id}`)"><v-icon class="btn btn-info">remove_red_eye</v-icon></button>
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
      path: "/factura",
      pathview: "/ver/factura",
      search: "",
      loading: false,
      headers: [
        {
          text: "Codigo de venta",
          align: "left",
          sortable: false,
          value: "saleCode"
        },
        { text: "Fecha", value: "dateTime" },
        { text: "Cliente", value: "client.fullName" },
        { text: "Total", value: "total" },
        { text: "Accion", value: "action" }
      ],
      data: []
    };
  },
  created() {
    let sale = this;
    sale.getSale();
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    },
    getSale() {
      let sale = this;
      sale.loading = true;
      sale.$store.state.services.saleService
        .getAll()
        .then(s => {
          sale.loading = false;
          sale.data = s.data;
        })
        .catch(s => {
          sale.$message({
            message: "Ha ocurrido un error",
            type: "error"
          });
        });
    },
      removed(id) {
      let sale = this;
      sale.$confirm(
        "Va a eliminar una venta, seguro que desea continuar?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
        .then(() => {
      let sale = this 
      sale.loading = true;
      sale.$store.state.services.saleService
      .remove(id)
      .then(r =>{
        sale.$message({
          message:'venta eliminada',
          type:'success'
        })
        sale.getSale()
      })
      .catch(r =>{
        sale.$message({
          message:'Ha ocurrido un error al eliminar',
          type:'error'
        })
      })
     })
        .catch(() => {
          sale.$message({
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
