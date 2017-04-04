import HomeComponent from './home.component';


const home = angular
    .module('home', [
    ])
    .component('home', HomeComponent)
    .config($stateProvider => {
        'ngInject';
        console.log(HomeComponent.controller)
        $stateProvider
            .state('app.home.picture', {
                url: '/home',
                template: `
                   <home />
                `
            })
    })
    .name;

export default home;