class CategoryService{
    axios
    apiUrl

    constructor(axios , apiUrl){
        this.axios = axios
        this.apiUrl = `${apiUrl}category`
    }

    getAll(){
        let category = this
        return category.axios.get(`${category.apiUrl}`)
    }

    add(model){
        let category = this
        return category.axios.post(`${category.apiUrl}`,model)
    }

    remove(id){
        let category = this
        return category.axios.delete(`${category.apiUrl}/${id}`)
    }

}

export default CategoryService