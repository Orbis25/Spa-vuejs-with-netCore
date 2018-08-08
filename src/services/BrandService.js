class BrandService{

    axios
    apiUrl

    constructor(axios,apiUrl){
        this.axios = axios
        this.apiUrl = `${apiUrl}brand`
    }

    getAll(){
        let brand = this
        return brand.axios.get(`${brand.apiUrl}`)
    }

    add(model){
        let brand = this
        return brand.axios.post(`${brand.apiUrl}`,model)
    }

    remove(id){
        let brand = this
        return brand.axios.delete(`${brand.apiUrl}/${id}`)
    }

}

export default BrandService