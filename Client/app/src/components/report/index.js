import ReportService from './report.service';
import ReportComponent from './report.component';

const report = angular
    .module('report', [
        'ngCordova'
    ])
    .service('ReportService', ReportService)
    .component('report', ReportComponent)
    .config($stateProvider => {
        'ngInject';
            $stateProvider
        $stateProvider
            .state('app.report', {
                url: '/report',
                template: `<report ion-view /> `,
                params: {
                    img: null
                }

            })
    })
    .name;

export default report;