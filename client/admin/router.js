﻿'use strict';

app
  .run(
      function ($rootScope,   $state,   $stateParams,$localStorage,$http) {
		  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.auth;
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
          $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            $rootScope.previousState = from;
            $rootScope.previousStateParams = fromParams;
          });
	}
  )
.config(
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/auth/loading');
          $stateProvider
              .state('auth',{
                  abstract: true,
                  url:'/auth',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('admin/auth/ctrl.js');
                      }]
                  }
              })
              .state('auth.loading',{
                  url:'/loading',
                  templateUrl:'admin/auth/loading.html',
              })
              .state('auth.login',{
                  url:'/login',
                  templateUrl:'admin/auth/login.html',
              })
		  
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'admin/app.html',
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'admin/dashboard.html',
                  ncyBreadcrumb: {
                    label: '<i class="fa fa-home"></i> 首页'
                  }
              })
              .state('app.news', {
                  abstract: true,
                  url: '/news',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('admin/news/ctrl.js');
                      }]
                  }
              })
              .state('app.news.list', {
                  url: '/list?page&search',
                  templateUrl: 'admin/news/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '新闻列表',
                  }
              })
              .state('app.news.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/news/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.news.list',
                    label: '编辑',
                  }
			  })
              .state('app.news.create', {
                  url: '/create',
                  templateUrl: 'admin/news/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.news.list',
                    label: '新增',
                  }
              })
		}
  );

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
app.factory('AuthInterceptor', function ($rootScope, $q,$location) {
  return {
    responseError: function (response) {
        if(response.status==401)
        {
            $location.url('/auth/login');
        }
      return $q.reject(response);
    }
  };
})