import Auth from './auth';
import Home from './home';
import Map from './Map';


const components = angular
    .module('app.components', [
        Auth,
        Home,
        Map

    ])
    .name;

export default components;