import LoginComponent from './login.component';
import AuthService from './auth.service'

const auth = angular
    .module('auth', [

    ])
    .component('login', LoginComponent)
    .service('AuthService', AuthService)
    .config($stateProvider => {
        'ngInject';
        console.log(LoginComponent.controller)
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
    })
    .name;

export default auth;