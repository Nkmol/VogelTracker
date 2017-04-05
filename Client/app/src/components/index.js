import Auth from './auth';
import Map from './Map';
import Report from './report';

const components = angular
    .module('app.components', [
        Auth,
        Map,
        Report
    ])
    .name;

export default components;