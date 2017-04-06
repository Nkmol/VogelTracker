import Menu from './menu';
import Picture from './picture';
import Footer from './footer';

const common = angular
    .module('app.common', [
        Menu,
        Picture,
        Footer
    ])
    .name;

export default common;