import ContentComponent from './content.component';

const content = angular
  .module('content', [])
  .component('content', ContentComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('app.home', {
        template:  `
          <ion-view>
              <ion-nav-buttons side="left">
                  <button menu-toggle="left"class="button button-icon icon ion-navicon"></button>
              </ion-nav-buttons>

              <ion-content class="padding">
                  <content />
              </ion-content>

          </ion-view>
        `
      })
})
.name;

export default content;