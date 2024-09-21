import ApiEndpoints from "./apiEndpoints";
import ApiMethods from "./apiMethods";

class ApiManager {
    static signup = (body) => {
        const query = ApiEndpoints.signup();
        return ApiMethods.postMethod(query, body);
    }
}

export default ApiManager;