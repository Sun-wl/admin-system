'use strict';

/* Controllers */
// signin controller
app.controller('NavController', function ($rootScope, $scope, $localStorage, httpService) {


})
;


app.controller('LoginoutAdminController', function ($scope, $localStorage, $state, httpService) {

    $scope.loginout = function () {

        var _opts = {
            url: "admin/logout",
            success: function (result) {

                $localStorage.member = undefined;
                $localStorage.menuList = undefined;
                $state.go('access.adminLogin');
            },
            checkCodeError: function (code, errMsg, data) {
                $scope.authError = errMsg;
            }
        };
        httpService.http(_opts);
    };
});