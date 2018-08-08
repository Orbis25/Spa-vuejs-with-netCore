class Email{
      axios
      baseUrl

      constructor(axios, apiUrl) {
        this.axios = axios
        this.baseUrl = `${apiUrl}email`
      }

        send(model) {
          let client = this;
          return client.axios.post(`${client.baseUrl}` , model)
        }

}

export default Email