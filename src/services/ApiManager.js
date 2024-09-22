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
    static getMailDetail = (id) => {
        const query = ApiEndpoints.getMailDetail(id);
        return ApiMethods.getMethod(query);
    }
    static markAsRead = (id) => {
        const query = ApiEndpoints.markAsRead(id);
        return ApiMethods.putMethod(query);
    }
    static deleteMail = (id) => {
        const query = ApiEndpoints.deleteMail(id);
        return ApiMethods.deleteMethod(query);
    }
    static getSent = () => {
        const query = ApiEndpoints.getSent();
        return ApiMethods.getMethod(query);
    }
    static getSentMailDetail = (id) => {
        const query = ApiEndpoints.getSentMailDetail(id);
        return ApiMethods.getMethod(query);
    }
}

export default ApiManager;