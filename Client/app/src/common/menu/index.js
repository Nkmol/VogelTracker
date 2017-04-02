import MenuComponent from './menu.component';

const menu = angular
  .module('menu', [])
  .component('menu', MenuComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider

    .state('app', {
        url: '/',
        abstract: true,
        // component: 'menu'
        template: '<h1 ui-view>test<h1>'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
})
  .name;

export default menu;