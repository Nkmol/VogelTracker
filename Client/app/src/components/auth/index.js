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
                    <ion-view view-title="VogelTracker">
                        <ion-content class="padding has-header">
                            <login />
                        </ion-content>
                    </ion-view>
                `
            })
            .state('register', {
                url: '/register',
                template: `
                    <ion-view>
                        <ion-nav-buttons side="left">
                            <button class="button back-button buttons button-clear header-item" ng-click="$ctrl.go('login')">
                                <i class="icon ion-ios-arrow-back"> Login </i> 
                            </button>
                        </ion-nav-buttons>
                        <ion-content class="padding has-header">
                            <register />
                        </ion-content>
                    </ion-view>
                `
            })
    })
    .name;

export default auth;