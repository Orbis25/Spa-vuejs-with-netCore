<template>
<div class="row">
    <div class="col-12">
      <h2 class="text-center mb-4">
      <v-icon class="ss">inbox</v-icon><br>
        {{title}}</h2>
    </div>
  <div class="col">
    <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item label="Codigo del Producto" v-show="ruleForm.id <= 0" prop="productCode">
    <el-input  class="mb-5 text-center"  v-model="ruleForm.productCode" :disabled="true"></el-input>
  </el-form-item>
<div class="row justify-content-around">
  <div class="col">
    <el-form-item label="Nombre" prop="name">
     <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="Precio" prop="price">
     <el-input  v-model="ruleForm.price"></el-input>
  </el-form-item>
   <el-form-item label="Cantidad" prop="quantity">
        <el-input-number class="" v-model="ruleForm.quantity"  :min="1" ></el-input-number>
    </el-form-item>

      <div v-show="ruleForm.id >0">
        <p>Va a actualizar la categoria?</p>
      <el-switch v-model="value1">
      </el-switch>
      </div>
    <el-form-item v-show="value1 || ruleForm.id <=0" label="Categoria" prop="category">
      <selecCategory @CategorySelected="SelectIdCategory"></selecCategory>
    </el-form-item>

  </div>
    <div class="col mt-5"> 
      <div v-show="ruleForm.id >0">
        <p>Va a actualizar la Marca?</p>
      <el-switch v-model="value2">
      </el-switch>
      </div>
      <el-form-item v-show="value2 || ruleForm.id <=0"  label="Marca" prop="brand">
      <selecBrand @BrandSelected="BrandIdSelected"></selecBrand>
    </el-form-item>

      <div v-show="ruleForm.id >0">
        <p>Va a actualizar el supplidor?</p>
      <el-switch v-model="value3">
      </el-switch>
      </div>
    <el-form-item v-show="value3 || ruleForm.id <=0" label="Suplidor" prop="supplier">
      <selecSupplier @SupplierSelected="SupplierIdSelected"></selecSupplier>
    </el-form-item>
        <div v-show="ruleForm.id >0">
        <p>Va a actualizar el Modelo?</p>
      <el-switch v-model="value4">
      </el-switch>
      </div>
    <el-form-item label="Modelo" v-show="value4 || ruleForm.id <=0" prop="supplier">
      <selecModel @ModelSelected="ModelIdSelected"></selecModel>
    </el-form-item>
    <el-form-item>
     <el-button type="success"
      v-show="(ruleForm.categoryid != 0 && ruleForm.brandId != 0) && 
      (ruleForm.supplier != 0 && ruleForm.modelProductId != 0) "
      @click="save()" >{{buttonName }}</el-button>
   <el-button type="danger" @click="redirect(path)">Cancelar</el-button>
  </el-form-item>
  </div>
</div>
</el-form>
</div>
</div>
</template>
<script>

import selecCategory from './selectC'
import selecBrand from './selectB'
import selecSupplier from './selectS'
import selecModel from './selectM'


export default {
  data() {
    return {
      loading: false,
      value1:false,
      value2:false,
      value3:false,
      value4:false,
      data: [],
      valueC: '',
      ruleForm: {
        id: 0,
        productCode:
          `${"PT-"}` +
          Math.random()
            .toString(36)
            .substr(2, 5)
            .toUpperCase(),
        name: null,
        price: null,
        quantity: null,
        categoryid:0,
        modelProductId:0,
        supplierId:0,
        brandId:0 
      },
      rules: {
        name: [
          {
            required: true,
            message: "Porfavor ingrese el Nombre del producto",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Porfavor ingrese el precio",
          },
          {
            required: true,
            pattern:/^\d*(\.\d{1})?\d{0,1}$/,
            message: "Ingrese un precio valido",
            trigger: "blur"
          }
        ]
      },
      path: "/productos"
    };
  },
  created() {
    let product = this
    product.get(product.$route.params.id);
  },
  methods: {
    redirect(path) {
      if (path == undefined) return;
      this.$router.push(path);
      this.$message({
        message: "Accion cancelada",
        type: "info"
      });
    },
    save() {
      let product = this;
      product.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if(product.ruleForm.id > 0){
            product.loading = true
            product.$store.state.services.productService
            .update(product.ruleForm)
            .then(p =>{
              product.$message({
                message:'Producto Actualizado Correctamente',
                type:'success'
              })
              product.$router.push(product.path)
            })
            .catch(p =>{
              product.$message({
                message:'Ha ocurrido un error',
                type:'error'
              })
            })
          }else{
              product.$refs['ruleForm'].validate(valid => {
                if (valid) {
                  product.loading = true;
                  product.$store.state.services.productService
                  .add(product.ruleForm)
                  .then(p =>{
                    product.loading = false;
                    product.$message({
                      message:'Producto Agregado con exito',
                      type:'success'
                    })
                    product.$router.push(product.path)
                  })
                  .catch(p =>{
                    product.$message({
                      message:'Ha ocurrido un error',
                      type:'error'
                    })
                  })
                } 
              })
          }
        }
      }
      );
    },
    get(id){
      let product = this
      //very importan if this the api explot!!!!!!!!!! noottttt!!!!!!!!!!!!!!!
      if (id === undefined) return;
      product.loading = true
      product.$store.state.services.productService
      .get(id)
      .then(c =>{
        product.loading = false
        product.ruleForm.id = c.data.id
        product.ruleForm.name = c.data.name
        product.ruleForm.price = c.data.price
        product.ruleForm.quantity = c.data.quantity
        product.ruleForm.categoryid = c.data.categoryId
        product.ruleForm.modelProductId = c.data.modelProductId
        product.ruleForm.supplierId = c.data.supplierId
        product.ruleForm.brandId = c.data.brandId

      })
      .catch(p =>{
        p.$message({
          message:'Ha ocurrido un error',
          type:'error'
        })
      })
    },
    SelectIdCategory: function(value){
      let product = this
      product.ruleForm.categoryid = value
    },
    BrandIdSelected: function(value){
      let product = this
      product.ruleForm.brandId = value
    },
    SupplierIdSelected: function(value){
      let product = this
      product.ruleForm.supplierId = value
    },
    ModelIdSelected: function(value){
      let product = this
      alert(value)
      product.ruleForm.modelProductId = value
    }
  },
  computed: {
    title() {
      return this.ruleForm.id === 0
        ? "Nuevo Producto"
        : `${this.ruleForm.name}`;
    },
    buttonName(){
      return this.ruleForm.id === 0
      ? 'Agregar':'Actualizar'
    }
  },
  components:{
    selecCategory,
    selecBrand,
    selecSupplier,
    selecModel
  }
};
</script>
<style>
.ss {
  font-size: 5em;
}
</style>
