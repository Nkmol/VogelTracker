class AuthService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    login(user) {
        return this.$http.post(`${this.Config.url}/login`, user);
    }

    register(user) {
        return this.$http.post(`${this.Config.url}/register`, user);
    }
}

export default AuthService;