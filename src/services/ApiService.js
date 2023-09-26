import axios from "axios";

const base_url = "http://localhost:9000";
const token = sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

export const postRequest = async (path,data) => {
    try {
        const response = await axios.post(base_url+path, data);
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