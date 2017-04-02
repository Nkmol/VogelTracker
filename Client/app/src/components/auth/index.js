import LoginComponent from './login.component';

const auth = angular
    .module('auth', [

    ])
    .component('login', LoginComponent)
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('login', {
                parent: 'app',
                url: '/login',
                // component: 'login',
                // views: {
                //     'menuContent': 'login'
                // }
                template: `test!`
            })
    })
    .name;

export default auth;