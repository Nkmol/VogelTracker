import CameraComponent from './camera.component';

const home = angular
    .module('home', [ 'ionic',
     'ngCordova',
    ])
    .component('camera', CameraComponent)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('home', {
                url: '/home',
                component: 'camera'
            })
    })
    .name;

export default home;