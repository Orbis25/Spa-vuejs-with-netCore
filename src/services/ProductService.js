class ProductService {
    axios
    apiUrl

    constructor(axios,apiUrl){
        this.axios = axios;
        this.apiUrl = `${apiUrl}product`
    }

    
    getAll(){
        let product = this
        return product.axios.get(`${product.apiUrl}`)
    }

    add(model){
        let product = this
        return product.axios.post(`${product.apiUrl}`,model)
    }

    get(id){
        let product = this
        return product.axios.get(`${product.apiUrl}/${id}`)
    }

    update(model){
        let product = this
        return product.axios.put(`${product.apiUrl}`,model)
    }

    deleteProduct(id){
        let product = this
        return product.axios.delete(`${product.apiUrl}/${id}`)
    }

}

export default ProductService