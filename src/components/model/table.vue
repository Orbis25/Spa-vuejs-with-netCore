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
        <v-icon>line_style</v-icon>
      </v-btn>
<el-dialog title="Modelos" :visible.sync="dialogFormVisible1">
  <el-form :model="form1"  :rules="rules1" ref="form1">
    <el-form-item  label="Nuevo" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="form1.name" placeholder="Nombre del modelo" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item :label-width="formLabelWidth">
     <el-button @click="dialogFormVisible1 = false; msg('canselar')">Cancelar</el-button>
    <el-button v-show="form1.name" type="primary" @click="dialogFormVisible1 = false; msg('ok')" >Agregar</el-button>
    </el-form-item>
     </el-form> 
<v-card  v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Modelos
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
          <button @click="remove(props.item.id)" ><v-icon class="btn btn-danger ">delete</v-icon></button>
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
    let model = this;
    model.get();
  },
  methods: {
    msg(value) {
      let model = this;
      model.loading = true;
      switch (value) {
        case "ok":
          model.$store.state.services.modelProductService
            .add(model.form1)
            .then(b => {
              model.loading = false;
              this.$message({
                message: "Modelo Añadido",
                type: "success"
              });
              model.get();
            })
            .catch(b => {
              model.$message({
                message: "ha ocurrido un error",
                type: "error"
              });
              model.loading = false;
            });
          break;
        case "canselar":
          this.$message("accion cancelada");
          model.loading = false;
          break;
      }
    },
    get() {
      let model = this;
      model.loading = true;
      model.$store.state.services.modelProductService
        .getAll()
        .then(b => {
          model.data = b.data;
          model.loading = false;
        })
        .catch(b => {
          model.$message({
            message: "ha ocurrido un error",
            type: "error"
          });
        });
    },
    remove(id) {
      let model = this;
      model.loading = true;
      model.$store.state.services.modelProductService.remove(id).then(b => {
        model.$message({
          message: "Modelo eliminado",
          type: "success"
        });
        model.loading = false;
        model.get()
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
