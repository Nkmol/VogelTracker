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
            username: '',
            password: '',
            email: ''
        }
    }

    $onChanges(changes) {

    }

    login() {
        return this.AuthService.login(this.user)
            .then(res => {
                if(res.status == 200) {
                    this.$localStorage.token = res.data.token;
                    this.$state.go('app.home.map');
                }
            })
            .catch(res => {
                 this.$ionicPopup.alert({
                    title: 'Something went wrong when logging in',
                    template: res.data.message
                });
            })
    }

    register() {
        return this.AuthService.register(this.user)
            .then(res => {
                console.log(res);
                if(res.status == 200) {
                    this.$ionicPopup.alert({
                        title: 'Your account has been successfully registered'
                    })
                    .then(() => this.$state.go('login'));
                }
            })
            .catch(res => {
                 this.$ionicPopup.alert({
                    title: 'Something went wrong when registering in',
                    template: res.data.message
                });
            })
    }
}

export default AuthController;