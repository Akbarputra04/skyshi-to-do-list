import axios from "axios"

const API = axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id'
})

export default API