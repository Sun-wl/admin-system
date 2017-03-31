/**
 * Created by 大大大太阳 on 2017/3/18.
 */
app
    .controller("mStuInfo", function ($scope, myService) {
        $scope.form = {};
        //“学生就业信息查询” 获取学生就业信息
        function getStus() {
            myService.getStus($scope.form, function (data) {
                // console.log(data);
                $scope.stus = data;
            });
        }

        getStus();

        $scope.search = function () {
            getStus();
        };

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

        //获取省份信息
        myService.getProvinces(function (data) {
            // console.log(data);
            $scope.provinces = data;
        });

        $scope.changePast = function () {
            $scope.form.professionalId = 0;
            $scope.form.clazz = 0;
        };
        $scope.changeProf = function () {
            // var profIdStr = String($scope.form.professionalId);
            // var pasternId = Number(profIdStr.substring(0,profIdStr.length-1));
            $scope.form.pasternId = 0;
            $scope.form.clazz = 0;
        };


    });
app
    .controller("stuEmployInfoCtrl",function () {

    });
app
    .controller("addStuInfoCtrl",function () {

    });