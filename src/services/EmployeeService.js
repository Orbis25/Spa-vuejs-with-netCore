class EmployeeService {
    axios
    apiUrl

    constructor(axios,apiUrl){
        this.axios = axios
        this.apiUrl = `${apiUrl}user`
    }

    getAll(){
        let service = this
        return service.axios.get(`${service.apiUrl}`)
    }

    add(model){
        let user = this
        return user.axios.post(`${user.apiUrl}`,model)
    }
    
    get(id){
        let user = this
        return user.axios.get(`${user.apiUrl}/${id}`)
    }

    update(model){
        let user = this 
        return user.axios.put(`${user.apiUrl}`,model)
    }

    delete(id){
        let user = this
        return user.axios.delete(`${user.apiUrl}/${id}`)
    }
}

export default EmployeeService