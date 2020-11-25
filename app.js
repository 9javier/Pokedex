
var app = angular.module("app",['ngRoute','ngMaterial', 'ngMessages','ngAnimate','angularUtils.directives.dirPagination'])
.config(['$routeProvider',function($routeProvider){
  $routeProvider.when(
    "/home",{
      templateUrl:"./components/list-pokemon/list.html",
      controller:"listController"
    })
}])





