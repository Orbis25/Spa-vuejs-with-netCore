class ModelProductService {
  axios
  apiUrl
  constructor(axios, apiUrl) {
    this.axios = axios
    this.apiUrl = `${apiUrl}modelProduct`
  }

  getAll() {
    let model = this
    return model.axios.get(`${model.apiUrl}`)
  }

  add(model) {
    let modelp = this
    return modelp.axios.post(`${modelp.apiUrl}`, model)
  }

  remove(id) {
    let model = this
    return model.axios.delete(`${model.apiUrl}/${id}`)
  }




}

export default ModelProductService
