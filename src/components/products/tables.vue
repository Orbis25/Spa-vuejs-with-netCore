<template>
<div class="row">
<div class="col-12 mt-4">
  <v-card  v-loading="loading" >
  <!-- red darken-2 color para contrastar -->
    <h1 class="text-center mt-2">Productos   </h1>
 <!-- inicio -->
 <template>
   <v-card id="create"></v-card>
</template>
 <!-- final -->
    <v-card-title>
        <el-tooltip class="item" effect="dark" content="Agregar producto" placement="top">
      <v-btn
        fab
        dark
        small
        color="red darken-2"
        @click="redirect(path)"
        class="btn-icons">
        <v-icon>add</v-icon>
      </v-btn>
      </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Categorias" placement="top">
          <appcategory></appcategory>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Marcas" placement="top">
          <appbrand></appbrand>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Modelos" placement="top">
          <appModel></appModel>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Suplidores" placement="top">
          <appSupplier></appSupplier>
      </el-tooltip>
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
      <template  slot="items" slot-scope="props">
        <td class="">{{ props.item.productCode}}</td>
        <td class="">{{ props.item.name }}</td>
        <td class="">{{ props.item.price }}</td>
        <td class="">{{ props.item.quantity}}</td>
        <td class="">{{ props.item.category.name}}</td>
        <td class="">{{ props.item.modelProduct.name }}</td>
        <td class="">{{ props.item.brand.name }}</td>
        <td class="">{{ props.item.supplier.name }}</td>
        <td>
          <div class="row">
          <button @click="remove(props.item.id)"><v-icon class="btn btn-danger m-1">delete</v-icon></button>
          <button @click="redirect(`/actualizar/producto/${props.item.id}/`)"><v-icon class="btn btn-success">edit</v-icon></button> 
          </div>
        </td>        
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</div>

</div>
</template>
<script>
/* eslint-disable */
import appcategory from '../category/table';
import appbrand from '../brand/table';
import appModel from '../model/table';
import appSupplier from '../supplier/table';
export default {
  components:{
    appcategory,
    appbrand,
    appModel,
    appSupplier
  },
  data() {
    return {
      // para el floating
      direction: "right",
      fab: true,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: true,
      left: false,
      marca: "",
      dialogVisible: false,
      transition: "slide-y-reverse-transition",
      //end floating
      data: [],
      name: "table",
      path: "/addproducto",
      search: "",
      loading: false,
      headers: [
        {
          text: "Cod. Producto",
          align: "left",
          sortable: false,
          value: "productCode"
        },
        { text: "Nombre", value: "name" },
        { text: "Precio", value: "price" },
        { text: "Cantidad", value: "quantity" },
        { text: "Categoria", value: "category.name" },
        { text: "Modelo", value: "modelProduct.name" },
        { text: "Marca", value: "brand.name" },
        { text: "Suplidor", value: "supplier.name" },
        { text: "Accion", value: "action" }
      ],
      desserts: [],
    };
  },
  created() {
    let product = this;
    product.getAllProducts();
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    },
    getAllProducts() {
      let product = this;
      product.loading = true;
      product.$store.state.services.productService
        .getAll()
        .then(p => {
          product.data = p.data;
          product.loading = false;
        })
        .catch(p => {
          product.$message({
            message: "Ha ocurrido un error",
            type: "error"
          });
        });
    },
     remove(id) {
      let product = this;
      product.$confirm(
        "Va a eliminar un producto, seguro que desea continuar?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning"
        }
      )
        .then(() => {
      let product = this
      product.loading = true
      product.$store.state.services.productService
      .deleteProduct(id)
      .then(p =>{
        product.loading = false
        product.$message({
          message:'Eliminado correctamente',
          type:'success'
        })
        product.getAllProducts()
      })
      .catch(p =>{
        product.$message({
          message:'Ha ocurrido un error',
          type:'error'
        })
      })
     })
        .catch(() => {
          product.$message({
            type: "info",
            message: "Accion cancelada"
          });
        });
    }
  }
};
</script>
<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
.btn-icons {
  color: #ffffff;
  border: none;
}
.btn-icons:focus {
  outline: none;
}
</style>