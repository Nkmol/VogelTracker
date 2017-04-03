class AuthController {
    constructor(AuthService, $ionicPopup, $localStorage) {
        'ngInject';
        this.AuthService = AuthService;
        this.$ionicPopup = $ionicPopup;
        this.$localStorage = $localStorage;
    }

    $onInit() {
        this.user = {
            username: 'test',
            password: ''
        }
    }

    $onChanges(changes) {

    }

    login() {
        return this.AuthService.login(this.user)
            .catch(res => {
                this.$ionicPopup.alert({
                    title: 'Something went wrong when logging in',
                    template: res.data.message
                });
            })
            .then(res => {
                if(res.status == 200)
                    this.$localStorage.token = res.data.token;
            })
    }
}

export default AuthController;