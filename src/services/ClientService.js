class ClientService {
    axios
    baseUrl

    constructor(axios,apiUrl){
        this.axios = axios
        this.baseUrl = `${apiUrl}client`
    }

    getAll(){
        let self = this;
        return self.axios.get(`${self.baseUrl}`)
    }

    addClient(model){
        let client = this;
        return client.axios.post(`${client.baseUrl}`, model)
    }

    get(id){
        let client = this;
        return client.axios.get(`${client.baseUrl}/${id}`)
    }

    update(model){
        let client = this;
        return client.axios.put(`${client.baseUrl}`,model)
    }

    delete(id){
        let client = this;
        return client.axios.delete(`${client.baseUrl}/${id}`)
    }
}
export default ClientService