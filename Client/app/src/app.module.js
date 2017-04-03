// App
import AppComponent from './app.components.js';
import Components from './components';
import Common from './common';
import Config from './app.constant';

const app = angular
    .module('app', [
        'ionic',
        'ngCordova',
        'ngStorage',
        Components,
        Common
    ])
    .run($ionicPlatform => {
        $ionicPlatform.ready(() => {
            if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
            StatusBar.styleDefault();
            }
        });
    }) 
    .constant('Config', Config) 
    .component('app', AppComponent)
    .name;

export default app;