import ReportService from './report.service';
import ReportComponent from './report.component';
import SearchComponent from './search.component';

const report = angular
    .module('report', [
        'ngCordova'
    ])
    .service('ReportService', ReportService)
    .component('report', ReportComponent)
    .component('search', SearchComponent)
    .config($stateProvider => {
        'ngInject';
            $stateProvider
            // .state('app.home.report', {
            //     abstract: true,
            //     template: ` 
            //         <ion-nav-bar class="bar-positive"></ion-nav-bar>
            //         <ion-nav-view /> `
            // })
            // .state('app.home.report.create', {
            //     url: '/report',
            //     template: `<report ion-view />`
            // })
            // .state('app.home.report.search', {
            //     url: '/search',
            //     template: `<search ion-view /> `
            // })
        $stateProvider
            .state('app.home.report', {
                url: '/report',
                template: `<div style="margin-top: 50px"><report /></div> `
            })
            .state('search', {
                url: '/search',
                template: `<div style="margin-top: 50px"><search /></div> `
            })
    })
    .name;

export default report;