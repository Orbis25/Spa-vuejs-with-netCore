import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/dashboard'
import EmployedList from '@/components/employed/tables'
import ClientList from '@/components/client/tables'
import SaleList from '@/components/sale/tables'
import CreateEmp from '@/components/employed/create'
import CreateCli from '@/components/client/create'
import UpdateCli from '@/components/client/create'
import ProductList from '@/components/products/tables'
import CreateProdts from '@/components/products/create'
import UpdateProducts from '@/components/products/create'
import sale from '@/components/sale/bill'
import viewbill from '@/components/bill/view-bill'
import login  from '@/components/login/login'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/empleados',
    name: 'Ver / Empleados',
    component: EmployedList
  },
  {
    path: '/clientes',
    name: 'Ver / Clientes',
    component: ClientList
  },
  {
    path: '/ventas',
    name: 'Ver / Ventas',
    component: SaleList
  },
  {
    path: '/addempleado',
    name: 'Ver / Empleados / Agregar',
    component: CreateEmp
  },//update employeed
  {
    path: '/actualizar/empleado/:id/',
    name: 'Ver / Empleados / Actualizar',
    component: CreateEmp
  },
  {
    path: '/addcliente',
    name: 'Ver / Cliente / Agregar',
    component: CreateCli
  },//update clients
  {
    path: '/actualizar/cliente/:id/',
    name: 'Ver / Cliente / Actualizar',
    component: UpdateCli
  },
  {
    path: '/factura',
    name: 'Ver / Venta / Agregar',
    component: sale
  },
  {
    path: '/productos',
    name: 'Ver / Productos',
    component: ProductList
  },
  {
    path: '/addproducto',
    name: 'Ver / Productos / Agregar',
    component: CreateProdts
  }, //update clients
  {
    path: '/actualizar/producto/:id/',
    name: 'Ver / Productos / Actualizar',
    component: UpdateProducts
  },
  {
    path: '/ver/factura/:id',
    name: 'Ver / Detalle / Venta ',
    component: viewbill
  },
  {
    path:'/login',
    name:'Login',
    component:login
  }
   
]
export default new Router({
  routes
})
