class SupplierService{
    axios
    apiUrl

    constructor(axios,apiUrl){
        this.axios = axios
        this.apiUrl = `${apiUrl}supplier`
    }

    getAllSupplier(){
        let supplier = this
        return supplier.axios.get(`${supplier.apiUrl}`)
    }

     add(model) {
       let supplier = this
       return supplier.axios.post(`${supplier.apiUrl}`, model)
     }

     remove(id) {
       let supplier = this
       return supplier.axios.delete(`${supplier.apiUrl}/${id}`)
     }

}

export default SupplierService