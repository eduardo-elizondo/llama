'use strict';

/**
 * @ngdoc function
 * @name llamaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the llamaApp
 */
angular.module('llamaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
