<template>
    <div class="row" >
      <div class="div" >
        <div class="col" id="todo">
            <div class="row justify-content-between">
                <div class="col-">
                 <h1 class="text-center mt-2">Detalle de venta</h1>
                </div>
            </div>
                <hr>
            <el-row class="mt-4" :gutter="20">
            <el-col :span="6">
            <div class="">
                <p>
                <v-icon>person_pin</v-icon>
                <b>Cliente: </b>{{fullnameClient}}
                </p>
                <p>
                <v-icon>people</v-icon>
                <b>Vendedor: </b>{{fullnameUser}}
                </p>
                <p>
                <v-icon>email</v-icon>
                <b>Email: </b>{{form.emailClient}}
                </p>
            </div></el-col>
            <el-col :span="6">
            <div class="grid-content bg-purple">
                <p class="text-center "><v-icon>date_range</v-icon> <b>Fecha</b>  {{dateTime}}</p>
                 <p class="text-center"><v-icon>calendar_view_day</v-icon> <b>Cod: </b> {{saleCode}}</p>
                 <p class="text-center"><v-icon>attach_money</v-icon> <b>Total: </b> {{total}}</p>
            </div></el-col>
            </el-row>
            <hr>
  <el-table 
  v-loading="loading"
    id="basic-table"
    :data="data"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="productCode"
      label="codigo"
      width="150">
    </el-table-column>
    <el-table-column
      prop="productName"
      label="Nombre"
      width="120">
    </el-table-column>
    <el-table-column
      prop="qyt"
      label="cantidad"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="Precio"
      width="120">
    </el-table-column>
    <el-table-column
      prop="modelBrand"
      label="Modelo y Marca"
      width="300">
    </el-table-column>
    <el-table-column
      prop="supplier"
      label="Suplidor"
      width="120">
    </el-table-column>
  </el-table>
  </div>
  <div class="row justify-content-center mt-5">
      <div class="col-">
    <el-button type="default" @click="redirect(pathback)" ><v-icon>arrow_back_ios</v-icon>Volver</el-button>
    <el-button type="primary" @click="pdf()"><v-icon>local_printshop</v-icon>Imprimir </el-button>
    <el-button type="success" v-loading.fullscreen.lock="fullscreenLoading" @click="file() ; openFullScreen()" id="boton01" ><v-icon>email </v-icon>Enviar por correo</el-button>
      </div>
  </div>
        </div>
    </div>
</template>

<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  data() {
    return {
       fullscreenLoading: false,
      pathback: "/ventas",
      name: "view-bill",
      dateTime: null,
      saleCode: null,
      client: null,
      email: "example@gmail.com",
      data: [],
      countD: [],
      fullnameClient: null,
      form:{
      emailClient: null,
      archivo:'',
      },
      fullnameUser: null,
      total: 0,
      dialogFormVisible1: false,
      loading:false
    };
  },
  created() {
    let bill = this;
    bill.get(bill.$route.params.id);
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    },
    openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000)},
    get(id) {
      if (id == undefined) return;
      let bill = this;
      bill.loading = true
      bill.$store.state.services.saleService
        .get(id)
        .then(b => {
          bill.loading = false
          bill.fullnameClient = b.data[0].sale.client.fullName;
          bill.fullnameUser = b.data[0].sale.user.fullName;
          bill.form.emailClient = b.data[0].sale.client.email;
          let myDate = new Date( b.data[0].sale.dateTime);
          bill.dateTime =  myDate.getDate() +'-'+(myDate.getMonth()+1)+'-'+myDate.getFullYear() ;
          bill.saleCode = b.data[0].sale.saleCode;
          bill.countD = b.data;
          bill.total = b.data[0].sale.total;

          for (let i = 0; i <= bill.countD.length; i++) {
            bill.data.push({
              productCode: b.data[i].product.productCode,
              productName: b.data[i].product.name,
              qyt: b.data[i].quantity,
              price: b.data[i].product.price,
              modelBrand: `${b.data[i].product.modelProduct.name} - ${
                b.data[i].product.brand.name
              }`,
              supplier: b.data[i].product.supplier.name
            });
          }
        })
        .catch(b => {
          //exepcion b.data[i] is undefined incontrolated
        });
    },
    pdf() {
      let data = this;
      let doc = new jsPDF();
      doc.setFontSize(40);
      doc.text(20, 30, "Factura");
      doc.line(10, 50, 200, 50);

      doc.setFontSize(20);
      doc.text(130, 20, "Codigo: " + data.saleCode);
      doc.text(130, 40, "Fecha: " + data.dateTime);

      doc.setFontSize(20);
      doc.text(10, 70, "Cliente: " + data.fullnameClient);
      doc.text(10, 85, "Vendedor: " + data.fullnameUser);
      doc.text(10, 100, "Correo: " + data.email);
      doc.line(10, 115, 200, 115);

      doc.setFontSize(30);
      doc.text(10, 130, "Detalle de venta");
      doc.line(10, 50, 200, 50);
      
      doc.setFontSize(20);
      doc.text(130, 130, "Total : $"+data.total);


      var columns = [
        "Codigo",
        "Nombre",
        "Cantidad",
        "Precio",
        "Modelo y Marca",
        "Suplidor"
      ];
      var rows = [];
      data.data.forEach(element => {
        rows.push([
          element.productCode,
          element.productName,
          element.qyt,
          element.price,
          element.modelBrand,
          element.supplier
        ]);
      });

      doc.autoTable(columns, rows, { margin: { top: 140 } });
      doc.save(`Factura-${data.saleCode}.pdf`);
    },
    file(){
        let d = this
        d.form.archivo = $("#todo").html().toString();
        d.fullscreenLoading = true
        d.$store.state.services.email
        .send(d.form)
        .then(e =>{
          d.fullscreenLoading = false
          d.$notify.success({
          title: 'Mensage',
          message: 'Correo Enviado',
          offset: 100
        });
        })
        .catch(e =>{
           d.$notify.error({
          title: 'Error',
          message: 'Correo No Enviado',
          offset: 100
        });
        })
    }
  }
};
</script>
<style>
</style>
