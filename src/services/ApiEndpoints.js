const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;
const authUrl = import.meta.env.VITE_FIREBASE_AUTH_URL;


const ApiEndpoints = {
    signup: ()=>(`${authUrl}accounts:signUp?key=${apiKey}`),
    login: ()=>(`${authUrl}accounts:signInWithPassword?key=${apiKey}`),
    database: ()=>(`${dbUrl}`)
}

export default ApiEndpoints;