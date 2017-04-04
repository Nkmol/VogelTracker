import Auth from './auth';
import Map from './Map';

const components = angular
    .module('app.components', [
        Auth,
        Map
    ])
    .name;

export default components;