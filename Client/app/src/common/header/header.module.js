import HeaderComponent from './header.component';

const HeaderModule = angular
    .module('header', [])
    .component('header', HeaderComponent)
    .name;

export default HeaderModule;