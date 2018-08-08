class SaleService {
  apiUrl
  axios
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = `${apiUrl}sale`
  }


  add(model) {
    let sale = this
    return sale.axios.post(`${sale.apiUrl}`, model);
  }

  getAll() {
    let sale = this
    return sale.axios.get(`${sale.apiUrl}`);
  }

  get(id){
      let sale = this
      return sale.axios.get(`${sale.apiUrl}/${id}`)
  }

  remove(id){
    let sale = this
     return sale.axios.delete(`${sale.apiUrl}/${id}`)
  }
}

export default SaleService
