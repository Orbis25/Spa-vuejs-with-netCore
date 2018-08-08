<template>
<div>
        <v-btn
        fab
        dark
        small
        color="indigo"
        class="btn-icons"
        @click="dialogFormVisible1 = true"
         >
        <v-icon>group_work</v-icon>
      </v-btn>
<el-dialog title="Marcas" :visible.sync="dialogFormVisible1">
  <el-form :model="form1"  :rules="rules1" ref="form1">
    <el-form-item  label="Nueva" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="form1.name" placeholder="Nombre de la marca" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item :label-width="formLabelWidth">
     <el-button @click="dialogFormVisible1 = false; msg('canselar')">Cancelar</el-button>
    <el-button v-show="form1.name" type="primary" @click="dialogFormVisible1 = false; msg('ok')" >Agregar</el-button>
    </el-form-item>
     </el-form> 
<v-card  v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Marcas
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
        <td>{{props.item.name}}</td>
        <td>
          <div class="row">
          <button @click="removeC(props.item.id)" ><v-icon class="btn btn-danger ">delete</v-icon></button>
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
      formLabelWidth: "120px",
      loading: false,
      search: "",
      form1: {
        name: ""
      },
      headers: [{ text: "Nombre", value: "name" }],
      rules1: {
        name: [
          {
            required: true,
            message: "Ingrese el nombre de la marca",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    let brand = this;
    brand.get();
  },
  methods: {
    msg(value) {
      let brand = this;
      brand.loading = true;
      switch (value) {
        case "ok":
          brand.$store.state.services.brandService
            .add(brand.form1)
            .then(b => {
              brand.loading = false;
              this.$message({
                message: "Marca Añadida",
                type: "success"
              });
              brand.get();
            })
            .catch(b => {
              brand.$message({
                message: "ha ocurrido un error",
                type: "error"
              });
              brand.loading = false;
            });
          break;
        case "canselar":
          this.$message("accion cancelada");
          brand.loading = false;
          break;
      }
    },
    get() {
      let brand = this;
      brand.loading = true;
      brand.$store.state.services.brandService
        .getAll()
        .then(b => {
          brand.data = b.data;
          brand.loading = false;
        })
        .catch(b => {
          brand.$message({
            message: "ha ocurrido un error",
            type: "error"
          });
        });
    },
    removeC(id) {
      let brand = this;
      brand.loading = true;
      brand.$store.state.services.brandService.remove(id).then(b => {
        brand.$message({
          message: "Marca eliminada",
          type: "success"
        });
        brand.loading = false;
        brand.get()
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
