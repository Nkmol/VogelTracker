import LoginComponent from './login.component';
import RegisterComponent from './register.component';
import AuthService from './auth.service'

const auth = angular
    .module('auth', [

    ])
    .component('login', LoginComponent)
    .component('register', RegisterComponent)
    .service('AuthService', AuthService)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('login', {
                url: '/login',
                template: `
                    <ion-view>
                        <ion-content class="padding">
                            <login />
                        </ion-content>
                    </ion-view>
                `
            })
            .state('register', {
                url: '/register',
                template: `
                    <ion-view>
                        <ion-content class="padding">
                            <register />
                        </ion-content>
                    </ion-view>
                `
            })
    })
    .name;

export default auth;