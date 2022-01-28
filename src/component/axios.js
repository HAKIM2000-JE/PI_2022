import axios from 'axios'
// base url to make request to the movie database

const instance = axios.create({
    baseURL: "http://localhost:8081/document/info"
});
// instance.get()

export default instance