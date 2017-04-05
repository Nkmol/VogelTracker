import PictureComponent from './picture.component';


const home = angular
    .module('picture', [
    ])
    .component('picture', PictureComponent)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('app.home.picture', {
                url: '/picture',
                template: `
                    <picture />
                `
            })
    })
    .name;

export default home;
