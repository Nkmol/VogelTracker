import LoginComponent from './login.component';

const auth = angular
    .module('auth', [

    ])
    .component('login', LoginComponent)
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('app.login', {
                url: '/login',
                template: LoginComponent.template,
                controller: LoginComponent.controller
            })
    })
    .name;

export default auth;