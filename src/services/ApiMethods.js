import axios from "axios"

class ApiMethods {
    static getMethod = async (url) => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            throw error.response.data.error;
        }
    }

    static postMethod = async (url, data) => {
        try {
            const response = await axios.post(url, data)
            return response.data
        } catch (error) {
            throw error.response.data.error;
        }
    }

    static putMethod = async (url, data) => {
        try {
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            throw error.response.data.error;
        }
    }

    static deleteMethod = async (url) => {
        try {
            const response = await axios.delete(url)
            return response.data
        } catch (error) {
            throw error.response.data.error;
        }
    }
}

export default ApiMethods;