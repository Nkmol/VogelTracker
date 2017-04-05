// import angular from 'angular';
import Header from './header';
import Menu from './menu';
import Picture from './picture';
import Footer from './footer';

const common = angular
    .module('app.common', [
        Header,
        Menu,
        Picture,
        Footer
    ])
    .name;

export default common;