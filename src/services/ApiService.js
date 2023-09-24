import axios from "axios";

const base_url = "http://localhost:9000";

export const getRequest = async path => {
    try {
        const response = await axios.get(base_url+path);
        return response;
    } catch (error) {
        console.log(error);
        if(error && error.response.status === 401) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("user_id");
            sessionStorage.removeItem("role");
            window.location.href = "/login";
        }
    }
}