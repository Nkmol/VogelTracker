// import angular from 'angular';
import Header from './header';
import Menu from './menu';

const common = angular
    .module('app.common', [
        Header,
        Menu
    ])
    .name;

export default common;