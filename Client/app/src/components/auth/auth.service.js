class AuthService {
    constructor($http, Config) {
        'ngInject'
        this.$http = $http;
        this.Config = Config;
    }

    login(user) {
        console.log(`${this.Config.url}/login`);
        return this.$http.post(`${this.Config.url}/login`, user)
            .then(res => {
                if(res.status == 200 && res.data.token) 
                    this.$http.defaults.headers.common['Authorization'] = 'JWT ' + res.data.token;

                return res;
            });
    }

    register(user) {
        return this.$http.post(`${this.Config.url}/register`, user);
    }
}

export default AuthService;