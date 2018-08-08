<template>
<div class="row" v-loading="loading">
  <div class="col">
    <h1 class="text-center mb-5">Factura</h1>
    <div class="row justify-content-around">
      <div class="col">
      <h6 class=""><b>Fecha: {{fecha}}</b></h6>
      </div>
      <div class="col">
      <h6 class=""><b>Codigo Factura: {{form.sales.saleCode}}</b></h6>
      </div>
      <div class="col"> 
      <h6 class=""><b>Codigo Empleado: {{form.sales.codigoEm}}</b></h6>
      </div>
    </div>
    <div style="margin: 10px;"></div>
<el-form :label-position="labelPosition" label-width="100px">
 <div class="row ">
      <div class="col">
      <el-form-item label="Buscar Cliente">
        <clientSelect @selectClient="addClient"></clientSelect>
      </el-form-item>
      </div>
      <div class="col">
      <el-form-item label="Buscar producto">
        <productSelect @productSelected="addProduct"></productSelect>
  </el-form-item>
  </div>
</div>
</el-form> 
  <v-data-table
    :headers="headers"
    :items="form.products"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.quantity }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.subTotal }}</td>
      <td><button class="btn btn-danger" @click="removeProduct(props)"><v-icon>delete</v-icon></button></td>
      
    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong class="row justify-content-end">
          <div class="col-">
          <el-input class="mt-1 mb-1" :value="form.sales.total" disabled="true" >
          <template slot="prepend">Total</template>{{total1}}
          </el-input>
            <el-button type="success" v-show="form.sales.total && form.sales.clientId" @click="sendSale">Realizar venta</el-button>
          </div>
        </strong>
        
      </td>
      {{data}}
    </template>
  </v-data-table>
</div>  
</div>
</template>
<script>
import clientSelect from "../client/selectAll";
import productSelect from "../products/selectP";

export default {
  components: {
    clientSelect,
    productSelect
  },
  data() {
    return {
      labelPosition: "top",
      loading:false,
      form: {

        sales:{
          saleCode: `FM-${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`,
        total: 0,
        clientId: 0,
        codigoEM: 1,
        userId:1
        },
        
        products: [],
        
      },

      fecha: "25/8/2019",
      headers: [
        {
          text: "Nombre Producto",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Cantidad", value: "quantity" },
        { text: "Precio", value: "price" },
        { text: "Subtotal", value: "subTotal" },
        { text: "Eliminar", value: "delete" }
      ]
    };
  },
  methods: {
    redirect(path){
      let sale = this
      if (path == undefined) return
      sale.$router.push(path)
    },
    addProduct: function(name, id, quantity, Subtotal, price , productCode ,brandId , categoryId ,
    modelProductId , supplierId) {
      let product = this;
      function userExists(id) {
        return product.form.products.some(function(el) {
          return el.id === id;
        });
      }
      if (!userExists(id)) {
        product.form.products.push({
          name: name,
          id: id,
          quantity: quantity,
          subTotal: Subtotal,
          price: price,
          productCode:productCode,
          brandId:brandId,
          categoryId:categoryId,
          modelProductId:modelProductId,
          supplierId:supplierId
          });
      } else {
        this.$message({
          message: "Este producto ya esta en la lista",
          type: "info"
        });
      }
    },
    removeProduct: function(product) {
      var index = this.form.products.indexOf(product);
      this.form.products.splice(product, 1);
    },
    addClient(value) {
      let client = this
      client.form.sales.clientId = value;
    },
    sendSale() {
      let sale = this
      sale.loading = true
      sale.$store.state.services.saleService
      .add(sale.form)
      .then(s =>{
        sale.loading = false
         sale.$notify.success({
          title: 'Venta',
          message: 'Venta Realizada',
          offset: 100
        });
        sale.redirect('/ventas');
      })
      .catch(s =>{
        sale.$message({
          message:'ha ocurrido un problema al procesar la venta',
          type:'error'
        })
      })
    }
  },
  computed: {
    total1: function() {
      let total = [];
      Object.entries(this.form.products).forEach(([key, val]) => {
        total.push(val.subTotal);
      });
      return (this.form.sales.total = total.reduce(function(total, num) {
        return (total += Number(num));
      }, 0));
    }
  }
};
</script>
<style>
.ss {
  font-size: 5em;
  color: #d32f2f;
}
</style>
