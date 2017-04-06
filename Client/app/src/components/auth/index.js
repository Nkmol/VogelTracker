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
            .state('auth', {
                abstract: true,
                template: `
                    <ion-nav-bar class="bar-positive"></ion-nav-bar>
                    <ion-nav-view />
                `
            })
            .state('auth.login', {
                url: '/login',
                template: `
                    <login ion-view />
                `
            })
            .state('auth.register', {
                url: '/register',
                template: `
                    <register ion-view />
                `
            })
    })
    .name;

export default auth;