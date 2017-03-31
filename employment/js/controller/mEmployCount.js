/**
 * Created by 大大大太阳 on 2017/3/19.
 */
app
    .controller("mEmployCountCtrl", function ($scope, myService) {
        //获取省份信息
        myService.getProvinces(function (data) {
            // console.log(data);
            $scope.provinces = data;
        });

        //获取系部信息
        myService.getPasterns(function (data) {
            // console.log(data);
            $scope.pasterns = data;
        });

        //获取专业信息
        myService.getProfs(function (data) {
            // console.log(data);
            $scope.profs = data;
        });

        //获取班级信息
        myService.getclazzs(function (data) {
            // console.log(data);
            $scope.clazzs = data;
        });


    });
app
    .controller("employDistbtCtrl", function ($scope, myService) {

    });
app
    .controller("employRateCtrl", function ($scope, myService) {

    });