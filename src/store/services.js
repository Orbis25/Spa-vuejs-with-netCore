import Axios from 'axios'
import clientService from '../services/ClientService'
import employeeService from '../services/EmployeeService'
import productService from '../services/ProductService'
import categoryService from '../services/CategoryService'
import supplierService from '../services/SupplierService'
import brandService from '../services/BrandService'
import modelProductService from '../services/ModelProduct'
import saleService from '../services/SaleService'
import email from '../services/Email'
import countAll from '../services/CountAll'


let apiUrl = 'http://localhost:61956/'

//configuration axios
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    clientService: new clientService(Axios,apiUrl),
    employeeService: new employeeService(Axios,apiUrl),
    productService : new productService(Axios,apiUrl),
    categoryService: new categoryService(Axios,apiUrl),
    supplierService: new supplierService(Axios,apiUrl),
    brandService: new brandService(Axios,apiUrl),
    modelProductService: new modelProductService(Axios, apiUrl),
    saleService: new saleService(Axios,apiUrl),
    email:new email(Axios,apiUrl),
    countAll :new countAll(Axios,apiUrl)
}