import Auth from './auth';
import Map from './Map';
import Report from './report';

const components = angular
    .module('app.components', [
        Auth,
        Report,
        Map
    ])
    .name;

export default components;