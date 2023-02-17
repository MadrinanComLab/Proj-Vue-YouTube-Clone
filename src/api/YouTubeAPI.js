import Axios from "axios";

export default Axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    headers: {}
});