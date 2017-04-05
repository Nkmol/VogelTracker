import ContentComponent from './content.component';

const content = angular
  .module('content', [])
  .component('content', ContentComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('app.home', {
        abstract: true,
        template:  `
          <ion-view>
              <ion-content class="padding" data-tap-disabled="true">
                  <content />
              </ion-content>
          </ion-view>
        `
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login'); 
})
.name;

export default content;