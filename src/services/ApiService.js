import axios from "axios";

const base_url = "http://localhost:9000";

export const getRequest = async path => {
    try {
        const response = await axios.get(base_url+path);
        return response;
    } catch (error) {
        console.log(error);
    }
}