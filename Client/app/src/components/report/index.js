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
            .state('app.home.report', {
                url: '/report',
                template: `<div style="margin-top: 50px"><report /></div> `
            })
    })
    .name;

export default report;