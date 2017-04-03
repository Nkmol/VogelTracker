class AuthController {
    constructor(AuthService, $ionicPopup, $localStorage, $state) {
        'ngInject';
        this.AuthService = AuthService;
        this.$ionicPopup = $ionicPopup;
        this.$localStorage = $localStorage;
        this.$state = $state;
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
            .then(res => {
                if(res.status == 200) {
                    this.$localStorage.token = res.data.token;
                    this.$state.go('app.home');
                }
            })
            .catch(res => {
                 this.$ionicPopup.alert({
                    title: 'Something went wrong when logging in',
                    template: res.data.message
                });
            })
    }
}

export default AuthController;