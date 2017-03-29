(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var AppComponent = {
    template: "\n    <header></header>\n    <nav></nav>\n    <div>\n        <div ui-view></div>\n    </div>\n    <footer></footer>\n  "
};

exports.default = AppComponent;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appComponents = require('./app.components.js');

var _appComponents2 = _interopRequireDefault(_appComponents);

var _componentsModule = require('./components/components.module.js');

var _componentsModule2 = _interopRequireDefault(_componentsModule);

var _commonModule = require('./common/common.module.js');

var _commonModule2 = _interopRequireDefault(_commonModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('app', ['ionic', 'ngCordova', _componentsModule2.default, _commonModule2.default]).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).component('app', _appComponents2.default).name; // App
exports.default = app;

},{"./app.components.js":1,"./common/common.module.js":3,"./components/components.module.js":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _header = require('./header/header.module');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var common = angular.module('app.common', [_header2.default]).name; // import angular from 'angular';
exports.default = common;

},{"./header/header.module":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var HeaderComponent = {
    template: "\n    <ion-header-bar class=\"bar-positive\"></ion-header-bar>\n    <ion-content>\n        <div class=\"list\">\n        <label class=\"item item-input item-floating-label\">\n            <span class=\"input-label\">First Name</span>\n            <input type=\"text\" placeholder=\"First Name\">\n        </label>\n        </div>\n    </ion-content>\n    "
};

exports.default = HeaderComponent;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _header = require('./header.component');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderModule = angular.module('header', []).component('header', _header2.default).name;

exports.default = HeaderModule;

},{"./header.component":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import angular from 'angular';
var components = angular.module('app.components', []).name;

exports.default = components;

},{}],7:[function(require,module,exports){
'use strict';

var _appModule = require('./app.module.js');

var _appModule2 = _interopRequireDefault(_appModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE: This will work if you have your scripts loaded at the end of the page (instead of in the header).
//   http://stackoverflow.com/questions/16537783/which-method-should-i-use-to-manually-bootstrap-my-angularjs
angular.bootstrap(document, [_appModule2.default]);

},{"./app.module.js":2}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXHNyY1xcYXBwLmNvbXBvbmVudHMuanMiLCJhcHBcXHNyY1xcYXBwLm1vZHVsZS5qcyIsImFwcFxcc3JjXFxjb21tb25cXGNvbW1vbi5tb2R1bGUuanMiLCJhcHBcXHNyY1xcY29tbW9uXFxoZWFkZXJcXGhlYWRlci5jb21wb25lbnQuanMiLCJhcHBcXHNyY1xcY29tbW9uXFxoZWFkZXJcXGhlYWRlci5tb2R1bGUuanMiLCJhcHBcXHNyY1xcY29tcG9uZW50c1xcY29tcG9uZW50cy5tb2R1bGUuanMiLCJhcHBcXHNyY1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLElBQU0sZUFBZTtBQUNqQjtBQURpQixDQUFyQjs7a0JBV2UsWTs7Ozs7Ozs7O0FDVmY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLE1BQU0sUUFDUCxNQURPLENBQ0EsS0FEQSxFQUNPLENBQ1gsT0FEVyxFQUVYLFdBRlcscURBRFAsRUFPUCxHQVBPLENBT0gsMEJBQWtCO0FBQ25CLG1CQUFlLEtBQWYsQ0FBcUIsWUFBTTtBQUN2QixZQUFHLE9BQU8sT0FBUCxJQUFrQixPQUFPLE9BQVAsQ0FBZSxPQUFmLENBQXVCLFFBQTVDLEVBQXNEO0FBQ3REO0FBQ0E7QUFDQSxvQkFBUSxPQUFSLENBQWdCLFFBQWhCLENBQXlCLHdCQUF6QixDQUFrRCxJQUFsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBUSxPQUFSLENBQWdCLFFBQWhCLENBQXlCLGFBQXpCLENBQXVDLElBQXZDO0FBQ0M7QUFDRCxZQUFHLE9BQU8sU0FBVixFQUFxQjtBQUNyQixzQkFBVSxZQUFWO0FBQ0M7QUFDSixLQWREO0FBZUgsQ0F2Qk8sRUF3QlAsU0F4Qk8sQ0F3QkcsS0F4QkgsMkJBeUJQLElBekJMLEMsQ0FMQTtrQkFnQ2UsRzs7Ozs7Ozs7O0FDL0JmOzs7Ozs7QUFFQSxJQUFNLFNBQVMsUUFDVixNQURVLENBQ0gsWUFERyxFQUNXLGtCQURYLEVBSVYsSUFKTCxDLENBSEE7a0JBU2UsTTs7Ozs7Ozs7QUNUZixJQUFNLGtCQUFrQjtBQUNwQjtBQURvQixDQUF4Qjs7a0JBY2UsZTs7Ozs7Ozs7O0FDZGY7Ozs7OztBQUVBLElBQU0sZUFBZSxRQUNoQixNQURnQixDQUNULFFBRFMsRUFDQyxFQURELEVBRWhCLFNBRmdCLENBRU4sUUFGTSxvQkFHaEIsSUFITDs7a0JBS2UsWTs7Ozs7Ozs7QUNQZjtBQUNBLElBQU0sYUFBYSxRQUNkLE1BRGMsQ0FDUCxnQkFETyxFQUNXLEVBRFgsRUFJZCxJQUpMOztrQkFNZSxVOzs7OztBQ1BmOzs7Ozs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxTQUFSLENBQWtCLFFBQWxCLEVBQTRCLHFCQUE1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBBcHBDb21wb25lbnQgPSB7XHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGhlYWRlcj48L2hlYWRlcj5cclxuICAgIDxuYXY+PC9uYXY+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgdWktdmlldz48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGZvb3Rlcj48L2Zvb3Rlcj5cclxuICBgXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBDb21wb25lbnQ7IiwiLy8gQXBwXHJcbmltcG9ydCBBcHBDb21wb25lbnQgZnJvbSAnLi9hcHAuY29tcG9uZW50cy5qcyc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZS5qcyc7XHJcbmltcG9ydCBDb21tb24gZnJvbSAnLi9jb21tb24vY29tbW9uLm1vZHVsZS5qcyc7XHJcblxyXG5jb25zdCBhcHAgPSBhbmd1bGFyXHJcbiAgICAubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAgICAgJ2lvbmljJyxcclxuICAgICAgICAnbmdDb3Jkb3ZhJyxcclxuICAgICAgICBDb21wb25lbnRzLFxyXG4gICAgICAgIENvbW1vblxyXG4gICAgXSlcclxuICAgIC5ydW4oJGlvbmljUGxhdGZvcm0gPT4ge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KCgpID0+IHtcclxuICAgICAgICAgICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XHJcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXHJcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxyXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XHJcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkgXHJcbiAgICAuY29tcG9uZW50KCdhcHAnLCBBcHBDb21wb25lbnQpXHJcbiAgICAubmFtZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcDsiLCIvLyBpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlci9oZWFkZXIubW9kdWxlJztcclxuXHJcbmNvbnN0IGNvbW1vbiA9IGFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2FwcC5jb21tb24nLCBbXHJcbiAgICAgICAgSGVhZGVyXHJcbiAgICBdKVxyXG4gICAgLm5hbWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwiY29uc3QgSGVhZGVyQ29tcG9uZW50ID0ge1xyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxpb24taGVhZGVyLWJhciBjbGFzcz1cImJhci1wb3NpdGl2ZVwiPjwvaW9uLWhlYWRlci1iYXI+XHJcbiAgICA8aW9uLWNvbnRlbnQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpdGVtIGl0ZW0taW5wdXQgaXRlbS1mbG9hdGluZy1sYWJlbFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWxhYmVsXCI+Rmlyc3QgTmFtZTwvc3Bhbj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvaW9uLWNvbnRlbnQ+XHJcbiAgICBgXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJDb21wb25lbnQ7IiwiaW1wb3J0IEhlYWRlckNvbXBvbmVudCBmcm9tICcuL2hlYWRlci5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgSGVhZGVyTW9kdWxlID0gYW5ndWxhclxyXG4gICAgLm1vZHVsZSgnaGVhZGVyJywgW10pXHJcbiAgICAuY29tcG9uZW50KCdoZWFkZXInLCBIZWFkZXJDb21wb25lbnQpXHJcbiAgICAubmFtZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlck1vZHVsZTsiLCIvLyBpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuY29uc3QgY29tcG9uZW50cyA9IGFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ2FwcC5jb21wb25lbnRzJywgW1xyXG5cclxuICAgIF0pXHJcbiAgICAubmFtZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudHM7IiwiaW1wb3J0IEFwcCBmcm9tICcuL2FwcC5tb2R1bGUuanMnO1xyXG5cclxuLy8gTk9URTogVGhpcyB3aWxsIHdvcmsgaWYgeW91IGhhdmUgeW91ciBzY3JpcHRzIGxvYWRlZCBhdCB0aGUgZW5kIG9mIHRoZSBwYWdlIChpbnN0ZWFkIG9mIGluIHRoZSBoZWFkZXIpLlxyXG4vLyAgIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY1Mzc3ODMvd2hpY2gtbWV0aG9kLXNob3VsZC1pLXVzZS10by1tYW51YWxseS1ib290c3RyYXAtbXktYW5ndWxhcmpzXHJcbmFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbQXBwXSk7Il19
