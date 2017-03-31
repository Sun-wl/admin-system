'use strict';
/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/auth/login');
                $stateProvider
                    .state('auth',{
                        abstract: true,
                        url:'/auth',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function( $ocLazyLoad ){
                                    return $ocLazyLoad.load([
                                        'js/controller/login.js',
                                        'js/service/httpService.js'
                                    ]);
                                }]
                        }
                    })
                    .state('auth.loading',{
                        url:'/loading',
                        templateUrl:'tpl/auth/loading.html'
                    })
                    .state('auth.login',{
                        url:'/login',
                        templateUrl:'tpl/auth/login.html'
                    })

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/nav.js',
                                        'js/service/httpService.js',
                                        'js/service/myService.js',
                                        'js/filter/infoFilter.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.home', {
                        url: '/home',
                        templateUrl: 'tpl/home/home.html'
                    })
                    .state('app.mStuInfo', {
                        url: '/mStuInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mStuInfo.stuEmployInfo', {
                        url: '/stuEmployInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mStuInfo.stuEmployInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/mStuInfo/stuEmployInfo/stuEmployInfo.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mStuInfo.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.mStuInfo.addStuInfo', {
                        url: '/addStuInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mStuInfo.addStuInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/mStuInfo/addStuInfo/addStuInfo.html',
                        params: {id:null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mStuInfo.js'
                                    ]);
                                }]
                        }
                    })

                    .state('app.mEmployCount', {
                        url: '/mEmployCount',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mEmployCount.employDistbt', {
                        url: '/employDistbt',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mEmployCount.employDistbt.list', {
                        url: '/list',
                        templateUrl: 'tpl/mEmployCount/employDistbt/employDistbt.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mEmployCount.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.mEmployCount.employRate', {
                        url: '/employRate',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mEmployCount.employRate.list', {
                        url: '/list',
                        templateUrl: 'tpl/mEmployCount/employRate/employRate.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/mEmployCount.js'
                                    ]);
                                }]
                        }
                    })

                    .state('app.sPersonalInfo', {
                        url: '/sPersonalInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.sPersonalInfo.personalInfo', {
                        url: '/personalInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.sPersonalInfo.personalInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/sPersonalInfo/personalInfo/personalInfo.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/sPersonalInfo.js'
                                    ]);
                                }]
                        }
                    })
                    .state('app.sPersonalInfo.addInfo', {
                        url: '/addInfo',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.sPersonalInfo.addInfo.list', {
                        url: '/list',
                        templateUrl: 'tpl/sPersonalInfo/addInfo/addInfo.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/controller/sPersonalInfo.js'
                                    ]);
                                }]
                        }
                    })



            }
        ]
    );