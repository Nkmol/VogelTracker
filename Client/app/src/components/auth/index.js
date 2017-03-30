import LoginComponent from './login.component';

const auth = angular
    .module('auth', [

    ])
    .component('login', LoginComponent)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('auth', {
                url: '/auth',
                component: 'login'
            })
    })
    .name;

export default auth;