var apichallenge = angular.module('apichallenge', ['ui.router', 'angularify.semantic.popup']);

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
    });/*
    .state('itemSet', {
      url:"/itemset/:id",
      templateUrl: "partials/itemset.html",
      controller: "itemSetController"  
    });*/
});

apichallenge.config(['$compileProvider',
function ($compileProvider) {
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
}]);

apichallenge.directive('loadPopup', function() {
  return function(scope, element, attrs) {
    angular.element(element).popup();
  };
})