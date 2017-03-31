/**
 * Created by 大大大太阳 on 2017/3/19.
 */
app
    .filter("basePast", function () {
        //input要过滤的内容，根据系过滤
        return function (input, id) {
            if (input) {
                //循环遍历将
                var result = input.filter(function (item) {
                    if (id) {
                        return item.pasternId == id;
                    } else {
                        return item.id;
                    }

                });
                //将过滤后的结果返回
                return result;
            }

        };
    });
app
    .filter("baseProf", function () {
        //input要过滤的班级，prof为专业，grade为年级
        return function (input, prof) {
            if (input) {
                //循环遍历将
                var result = input.filter(function (item) {
                    if (prof) {
                        return item.professionalId == prof;
                    } else {
                        return item.id;
                    }

                });
                //将过滤后的结果返回
                return result;
            }

        };
    });
app
    .filter("baseGrade", function () {
        //input要过滤的班级，prof为专业，grade为年级
        return function (input,grade) {
            if (input) {
                //循环遍历将
                var result = input.filter(function (item) {
                    if (grade) {
                        return item.grade == grade;
                    } else {
                        return item.id;
                    }

                });
                //将过滤后的结果返回
                return result;
            }

        };
    });
