import Auth from './auth';
import Map from './Map';
import Picture from './Picture';

const components = angular
    .module('app.components', [
        Auth,
        Map,
        Picture
    ])
    .name;

export default components;