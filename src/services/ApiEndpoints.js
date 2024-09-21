const authUrl = import.meta.env.VITE_AUTH_URL;


const ApiEndpoints = {
    signup: ()=>(`${authUrl}/user/signup`),
    login: ()=>(`${authUrl}/user/login`),
    database: ()=>(`${authUrl}`)
}

export default ApiEndpoints;