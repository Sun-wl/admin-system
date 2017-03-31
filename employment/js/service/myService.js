/**
 * Created by 大大大太阳 on 2017/3/18.
 */
app.factory("myService",function ($http) {
    return {
        getStus: function (form,handler) {
            var arr = {
                pasternId:form.pasternId,
                professionalId:form.professionalId,
                grade:form.grade,
                clazz:form.clazz,
                origin:form.origin,
                direction:form.direction
            };
            $http.get("./data/stus.js", {
                params: arr
            }).success(function (data) {
                handler(data);
            });
        },
        getclazzs: function (handler) {
            $http.get("./data/clazz.js")
                .success(function (data) {
                    handler(data);
                });
        },
        getProfs: function (handler) {
            $http.get("./data/professional.js")
                .success(function (data) {
                    handler(data);
                });
        },
        getPasterns: function (handler) {
            $http.get("./data/pasterns.js")
                .success(function (data) {
                    handler(data);
                });
        },
        getProvinces: function (handler) {
            $http.get("./data/province.js")
                .success(function (data) {
                    handler(data);
                });
        }
    }
});