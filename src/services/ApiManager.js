import ApiEndpoints from "./apiEndpoints";
import ApiMethods from "./apiMethods";

class ApiManager {
    static signup = (body) => {
        const query = ApiEndpoints.signup();
        return ApiMethods.postMethod(query, body);
    }
    static login = (body) => {
        const query = ApiEndpoints.login();
        return ApiMethods.postMethod(query, body);
    }
    static sendMail = (body) => {
        const query = ApiEndpoints.sendMail();
        return ApiMethods.postMethod(query, body);
    }
    static getInbox = () => {
        const query = ApiEndpoints.getInbox();
        return ApiMethods.getMethod(query);
    }
    static getEmailDetail = (id) => {
        const query = ApiEndpoints.getEmailDetail(id);
        return ApiMethods.getMethod(query);
    }
}

export default ApiManager;