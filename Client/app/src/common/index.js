// import angular from 'angular';
import Header from './header';
import Menu from './menu';
import Content from './content';
import Picture from './picture';
import Footer from './footer';

const common = angular
    .module('app.common', [
        Header,
        Menu,
        Content,
        Picture,
        Footer
    ])
    .name;

export default common;