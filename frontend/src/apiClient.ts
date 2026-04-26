import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:19132',
    timeout: 5000
})

export default apiClient