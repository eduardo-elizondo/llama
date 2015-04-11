'use strict';

/**
 * @ngdoc function
 * @name llamaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the llamaApp
 */
angular.module('llamaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
