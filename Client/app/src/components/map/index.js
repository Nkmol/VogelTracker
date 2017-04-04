import MapComponent from './map.component';
import MapService from './map.service'

const map = angular
    .module('map', [

    ])
    .service('MapService', MapService)
    .component('map', MapComponent)
    .config($stateProvider => {
        'ngInject';
        $stateProvider
            .state('app.home.map', {
                url: '/map',
                template: `<map /> `
            })
    })
    .name;

export default map;