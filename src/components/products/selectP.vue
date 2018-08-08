<template>
  <div class="row">
    <div class="col ">
  <el-input placeholder="producto" disabled="true"  v-model="producto"></el-input><br>
  </div>
  <div class="col">
    <el-button type="primary"   @click="dialogFormVisible1 = true" >buscar</el-button>
  </div>
  <el-dialog title="Productos" :visible.sync="dialogFormVisible1">
<v-card  v-loading="loading">
    <h1 class="text-center mt-2">Productos
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
        <td>{{props.item.name}}</td>
        <td>
          <div class="row">
          <button @click="add(props.item.id,props.item.name,props.item.quantity,props.item.price,props.item.productCode,
          props.item.brandId , props.item.categoryId , props.item.modelProductId ,props.item.supplierId )" ><v-icon class="btn btn-success">add</v-icon></button>
          </div>
         </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>    
    </el-dialog>
    <el-dialog
        width="30%"
        title="Elija la cantidad"
        :visible.sync="innerVisible"
        append-to-body>
        <el-input-number size="medium" :min="1" :max="quantityMax"  v-model="quantity"></el-input-number>
          <el-input class="mt-1 mb-1" placeholder="Please input" :value="total" disabled="true" >
          <template slot="prepend">Precio:</template>
          </el-input>
        <el-button type="primary" @click="addform()">Agregar</el-button>
        <el-button type="default" @click="dialogFormVisible1 = true; innerVisible = false;  ">volver</el-button>
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
      innerVisible: false,
      dialogFormVisible1: false,
      loading: false,
      subtotal: 0,
      quantityMax: 0,
      producto: null,
      price: 0,
      idproducto: 0,
      quantity: 0,
      productCode:null,
      brandId:0,
      categoryId:0,
      modelProductId:0,
      supplierId:0,
      search: null,
      headers: [{ text: "Nombre", value: "name" }]
    };
  },
  created() {
    let product = this;
    product.get();
  },
  methods: {
    get() {
      let product = this;
      product.$store.state.services.productService
        .getAll()
        .then(c => {
          product.data = c.data;
        })
        .catch(c => {
          product.$message({
            message: "ha ocurrido un error al cargar los Productos",
            type: "error"
          });
        });
    },
    add(id, name, max, price , productCode, brandId ,categoryId ,modelProductId ,SupplierId) {
      let product = this;

      if(max > 0){
      product.innerVisible = true;
      product.dialogFormVisible1 = false;

      product.producto = name;
      product.idproducto = id;
      product.quantity = 1;
      product.quantityMax = max;
      product.price = price;
      product.productCode = productCode;
      product.brandId = brandId;
      product.categoryId = categoryId;
      product.modelProductId = modelProductId;
      product.supplierId = SupplierId;
      }
      if(max <= 0){
        product.$message({
          message:'Este producto esta agotado',
          type:'info'
        })
      }


     
    },
    addform() {
      let product = this;
      
      product.$emit('productSelected' , product.producto, product.idproducto 
      ,product.quantity ,product.subtotal ,product.price,
       product.productCode , product.brandId
      , product.categoryId , product.modelProductId , product.supplierId )
    }
  },
  computed: {
    total() {
      return this.price != 0
        ? (this.subtotal = (this.quantity * this.price).toFixed(2))
        : (this.subtotal = this.price);
    }
  }
};
</script>
<style>
.total {
  border: 1px solid #409eff;
}
</style>
