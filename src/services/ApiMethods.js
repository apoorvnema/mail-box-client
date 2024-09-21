import axios from "axios"

class ApiMethods {
    static getMethod = async (url) => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    static postMethod = async (url, data) => {
        try {
            const response = await axios.post(url, data)
            return response.data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    static putMethod = async (url, data) => {
        try {
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    static deleteMethod = async (url) => {
        try {
            const response = await axios.delete(url)
            return response.data
        } catch (error) {
            throw error.response.data.message;
        }
    }
}

export default ApiMethods;