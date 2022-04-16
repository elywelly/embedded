import axios from "axios";

export const fetchSession = async () => {
    const response = await axios.get('/api/sessions');
    return response.data;
}