// import angular from 'angular';
import Header from './header';
import Menu from './menu';
import Content from './content';

const common = angular
    .module('app.common', [
        Header,
        Menu,
        Content
    ])
    .name;

export default common;