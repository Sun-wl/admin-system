'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$localStorage', '$window','$rootScope',
    function(              $scope,   $localStorage,   $window,$rootScope ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
          $templateCache.remove(current.templateUrl);
        }
      });

      // config
      $scope.app = {
        host: "http://127.0.0.1:8080",
        backendName: '就业信息管理系统',
        direction:[{name:"未就业",value:1},{name:"就业",value:2},{name:"考研",value:3},{name:"其他",value:4}],
        grades:[{name:"11级（15届）",value:11},{name:"12级（16届）",value:12},{name:"13级（17届）",value:13}],

          // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#3d9970',//27c24c
          warning: '#f39c12',//fad733
          danger:  '#dd4b39',//f05050
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);