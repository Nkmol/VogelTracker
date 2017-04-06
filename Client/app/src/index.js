import App from './app.module.js';
import './js'

// NOTE: This will work if you have your scripts loaded at the end of the page (instead of in the header).
//   http://stackoverflow.com/questions/16537783/which-method-should-i-use-to-manually-bootstrap-my-angularjs
angular.bootstrap(document, [App], {
    strictDi: true
});