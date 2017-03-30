// import angular from 'angular';
import Header from './header';

const common = angular
    .module('app.common', [
        Header
    ])
    .name;

export default common;