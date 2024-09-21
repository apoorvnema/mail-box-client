import { useSelector } from "react-redux"

const token = localStorage.getItem('token');

const Headers = {
    Authorization: token
}

export default Headers;