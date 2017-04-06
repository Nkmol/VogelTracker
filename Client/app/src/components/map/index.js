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
            .state('app.map', {
                url: '/map',
                template: `<map ion-view /> `
            })
    })
    .name;

export default map;