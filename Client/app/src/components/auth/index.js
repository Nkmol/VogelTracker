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
            .state('app.login', {
                url: '/login',
                template: `
                    <ion-view>
                        <ion-nav-buttons side="left">
                            <button menu-toggle="left"class="button button-icon icon ion-navicon"></button>
                        </ion-nav-buttons>

                        <ion-content class="padding">
                            <login />
                        </ion-content>

                    </ion-view>
                `
            })
    })
    .name;

export default auth;