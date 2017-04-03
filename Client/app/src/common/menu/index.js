import MenuComponent from './menu.component';

const menu = angular
  .module('menu', [])
  .component('menu', MenuComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
          abstract: true,
          template: MenuComponent.template,
          controller: MenuComponent.controller
      })
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
})
  .name;

export default menu;