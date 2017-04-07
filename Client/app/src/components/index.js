import Auth from './auth';
import Map from './Map';
import Report from './report';
import Overview from './overview';

const components = angular
    .module('app.components', [
        Auth,
        Report,
        Map,
        Overview
    ])
    .name;

export default components;