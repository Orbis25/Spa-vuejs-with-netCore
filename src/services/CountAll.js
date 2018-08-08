class CountAll {
    apiUrl
    axios
    
    constructor(axios,apiUrl){
        this.axios = axios
        this.apiUrl = `${apiUrl}home`
    }

    get(){
        let count = this;
        return count.axios.get(`${count.apiUrl}`)
    }

}

export default CountAll