var apichallenge = angular.module('apichallenge', ['ui.router', 'angularify.semantic.popup']);

// routes
apichallenge.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/index.html",
      controller: "indexController"
    })
    .state('result', {
      url: "/game/:id",
      templateUrl: "partials/result.html",
      controller: "resultController"
    });
});

// allow data links
apichallenge.config(['$compileProvider',
function ($compileProvider) {
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
}]);

// directive to load popups
apichallenge.directive('loadPopup', function() {
  return function(scope, element, attrs) {
    angular.element(element).popup();
  };
})
