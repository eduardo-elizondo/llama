'use strict';

angular.module('llamaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: 'y',
        templateUrl: '../y/main/main.html',
        controller: 'MainCtrl'
      });
  });