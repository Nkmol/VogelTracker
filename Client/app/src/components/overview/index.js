import OverviewService from './overview.service';
import OverViewComponent from './overview.component';

const overview = angular
    .module('overview', [
        'ngCordova'
    ])
    .service('OverviewService', OverviewService)
    .component('overview', OverViewComponent)
    .config($stateProvider => {
        'ngInject';
            $stateProvider
        $stateProvider
            .state('app.overview', {
                url: '/overview',
                template: `<overview ion-view /> `
            })
    })
    .name;

export default overview;