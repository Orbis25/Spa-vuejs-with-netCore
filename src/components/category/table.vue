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
        <v-icon>category</v-icon>
      </v-btn>
<el-dialog title="Categorias" :visible.sync="dialogFormVisible1">
  <el-form :model="form1"  :rules="rules1" ref="form1">
    <el-form-item  label="Nueva" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="form1.name" placeholder="Nombre de la categoria" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item :label-width="formLabelWidth">
     <el-button @click="dialogFormVisible1 = false; msg('canselar')">Cancelar</el-button>
    <el-button v-show="form1.name" type="primary" @click="dialogFormVisible1 = false; msg('ok')" >Agregar</el-button>
    </el-form-item>
     </el-form> 
<v-card  v-loading="loading">
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Categorias
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
            message: "Ingrese el nombre de la Categoria",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    let category = this;
    category.get();
  },
  methods: {
    msg(value) {
      let category = this;
      category.loading = true;
      switch (value) {
        case "ok":
          category.$store.state.services.categoryService
            .add(category.form1)
            .then(c => {
              category.loading = false;
              this.$message({
                message: "Categoria Añadida",
                type: "success"
              });
              category.get();
            })
            .catch(c => {
              this.$message("accion cancelada");
              category.loading = false;
            });
          break;
        case "canselar":
          this.$message("accion cancelada");
          category.loading = false;
          break;
      }
    },
    get() {
      let category = this
      category.$store.state.services.categoryService
        .getAll()
        .then(c => {
          category.data = c.data;
        })
        .catch(c => {});
    },
    removeC(id){
        let category = this
        category.loading = true
        category.$store.state.services.categoryService
        .remove(id)
        .then(c =>{
        category.$message({
            message:'Categoria eliminada ',
            type:'success'
        })
        category.loading = false
        category.get()
        })
        .catch(c =>{
            category.$message({
            message:'No se ha podido eliminar',
            type:'error'
        })
        })

    }
  }
};
</script>
<style>
.add {
  color: white;
}
</style>
