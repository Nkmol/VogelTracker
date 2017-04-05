// import angular from 'angular';
import Header from './header';
import Menu from './menu';
import Content from './content';
import Picture from './picture';

const common = angular
    .module('app.common', [
        Header,
        Menu,
        Content,
        Picture
    ])
    .name;

export default common;