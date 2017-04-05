import PictureComponent from './picture.component';


const home = angular
    .module('picture', [
    ])
    .component('picture', PictureComponent)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('app.picture', {
                url: '/picture',
                template: `
                    <picture ion-view />
                `
            })
    })
    .name;

export default home;
