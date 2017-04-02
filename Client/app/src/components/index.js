import Auth from './auth';
import Home from './home';

const components = angular
    .module('app.components', [
        Auth,
        Home
    ])
    .name;

export default components;