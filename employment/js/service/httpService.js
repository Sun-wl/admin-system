/**
 * Created by Administrator on 2016/12/12.
 */


/**
 * code 响应变量定义
 * @type {{SUCCESS: number, ERROR: number, SESSION_TIME_OUT: number}}
 */
var CODESTATUS = {
    SUCCESS: 200,
    ERROR: 300,
    TIMEOUT: 301,
    SESSION_TIME_OUT: 401,
    UNAUTHORIZED: 403
};


/**
 * 判断 code
 * @param data
 */
function checkCode(data, opts) {
    var _data;
    var _isCode = true;
    if (!data) {
        _isCode = false;
    } else {
        if (typeof data == "string") {
            if (data.indexOf("code") > -1) {
                _data = jQuery.parseJSON(data);
            } else {
                _isCode = false;
            }
        } else {
            _data = data;
        }
    }

    if (_isCode && (_data.code)) {
        if (_data.code == CODESTATUS.SESSION_TIME_OUT || _data.code == CODESTATUS.TIMEOUT) {// 会话超时
            // 超时处理
            alert("登录超时");

            window.location.href = "http://localhost:63343/admin-system/employment/index.html?_ijt=vfl3fdc40jma8s2r07afjrfsiq#/auth/login";


            return false;
        } else if (_data.code == CODESTATUS.ERROR) {
            alert(_data.message);
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, _data.message, _data);
            }
            return false;
        } else if (_data.code == CODESTATUS.UNAUTHORIZED) {
            alert(_data.message);
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, "您没有权限!", _data);
            }
            return false;
        } else if (_data.code == CODESTATUS.PARAM_IS_ERROR) {

            alert("无效的请求参数");
            if (opts.checkCodeError) {
                opts.checkCodeError(_data.code, "无效的请求参数!", _data);
            }
            return false;
        }
    }
    return true;
}

/**
 * http 自定义封装
 */
app.factory('httpService', function ($http, $timeout, $q) {
    // 默认参数
    var _httpDefaultOpts = {
        method: 'GET', // GET/DELETE/HEAD/JSONP/POST/PUT
        url: '',
        params: {}, // 拼接在url的参数
        data: {},
        cache: false, // boolean or Cache object
        limit: true, //是否节流
        timeout: "httpTimeout", // 节流变量名
        timeoutTime: 0,
        isErrMsg: false,// 错误提示
        isErrMsgFn: null,// 错误提示函数
        checkCode: true, // 是否校验code
        before: function () {
        }, // ajax 执行开始 执行函数
        end: function () {
        }, // ajax 执行结束 执行函数
        error: function (e) {
            console.log(e);
        }, // ajax 执行失败 执行函数
        success: function (data) {
        }, // ajax 执行成功 执行函数
        checkCodeError: function (code, errMsg, data) {
            alert(errMsg);
        } // ajax 校验code失败 执行函数
    };

    var _httpTimeoutArray = {"httpTimeout": null};//ajax节流使用的定时器 集合

    var _isErrMsgFn = function (opts) {
        if (angular.isFunction(opts.isErrMsgFn)) {
            opts.isErrMsgFn();
        } else {
            alert("抱歉！因为操作不能够及时响应，请稍后在试...");
        }
    };

    // http请求之前执行函数
    var _httpBefore = function (opts) {
        if (angular.isFunction(opts.before)) {
            opts.before();
        }
    };

    // http请求之后执行函数
    var _httpEnd = function (opts) {
        if (angular.isFunction(opts.end)) {
            opts.end();
        }
        if (opts.limit) {
            $timeout.cancel(_httpTimeoutArray[opts.timeout]);
        }
    };

    // 响应错误判断
    var _responseError = function (data, opts) {
        // public.js
        return checkCode(data, opts);
    };

    // http 请求执行过程封装    deferred ：http 链式请求延迟对象
    var _httpMin = function (opts, deferred) {
        /*
         _httpBefore(opts);
         $.ajax({
         'url': opts.url,
         type: "GET",
         traditional: true,
         data: (opts.params ? opts.params : {}),
         xhrFields: {
         withCredentials: true,
         },
         crossDomain: true,
         success:function(data,header,config,status) {

         // 权限，超时等控制
         if (!_responseError(data, opts)) {
         return false;
         }
         // 请求成功回调函数
         if (opts.success) {
         opts.success(data, header, config, status);
         }
         _httpEnd(opts);
         },
         error: function(data,header,config,status){ //处理响应失败
         if(opts.isErrMsg){
         _isErrMsgFn();
         }

         opts.error(data,header,config,status);

         _httpEnd(opts);
         }
         });*/

        _httpBefore(opts);
        opts.params.timestamp = new Date().getTime();
        $http({
            method: opts.method,
            url: opts.url,
            params: opts.params,
            data: opts.data
        }).success(function (data, header, config, status) { //响应成功
            // 权限，超时等控制
            if (!_responseError(data, opts)) {
                return false;
            }

            // 请求成功回调函数
            if (opts.success) {
                opts.success(data, header, config, status);
            }
            if (deferred) {
                deferred.resolve(data, header, config, status);  //任务被成功执行
            }
            _httpEnd(opts);
        }).error(function (data, header, config, status) { //处理响应失败
            if (opts.isErrMsg) {
                _isErrMsgFn();
            }

            opts.error(data, header, config, status);

            if (deferred) {
                deferred.reject(data, header, config, status); //任务未被成功执行
            }

            _httpEnd(opts);
        });
    };


    var _httpPost = function (opts) {
        _httpBefore(opts);
        $.ajax({
            'url': opts.url,
            type: "POST",
            traditional: true,
            data: (opts.params ? opts.params : {}),
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            success: function (data, header, config, status) {

                // 权限，超时等控制
                if (!_responseError(data, opts)) {
                    return false;
                }

                // 请求成功回调函数
                if (opts.success) {
                    opts.success(data, header, config, status);
                }
                _httpEnd(opts);
            },
            error: function (data, header, config, status) { //处理响应失败
                if (opts.isErrMsg) {
                    _isErrMsgFn();
                }

                opts.error(data, header, config, status);

                _httpEnd(opts);
            }
        });
    };

    var _httpDownload = function (opts) {
        _httpBefore(opts);

        var obj = opts.params;

        var u = opts.url + "?";

        for (var p in obj) { // 方法
            if (typeof ( obj [p]) == " function ") {
                obj [p]();
            } else { // p 为属性名称，obj[p]为对应属性的值

                if (obj[p]) {
                    u += p + "=" + obj[p] + "&";
                }
            }
        } // 最后显示所有的属性

        u = u.substring(0,u.length-1);

        window.open(u);

    };

    // http请求，内含节流等控制
    var _http = function (opts, deferred) {

        opts = $.extend({}, _httpDefaultOpts, opts);
        var result;
        /*
         if (opts.limit) {
         $timeout.cancel(_httpTimeoutArray[opts.timeout]);
         _httpTimeoutArray[opts.timeout] = $timeout(function () {
         result = _httpMin(opts, deferred);
         }, opts.timeoutTime);
         } else {*/
        result = _httpMin(opts, deferred);
        //}
    };

    // http 链式请求
    var _linkHttpMin = function (opts, deferred) {
        _http(opts, deferred);
    };

    // var baseUrl = 'http://192.168.1.96:8080/backend/';
    // var baseUrl = 'http://192.168.31.201:8080/backend/';
     var baseUrl = 'http://localhost:8080/backend/';


    return {
        /**
         * http请求
         * @param opts
         */
        httpPost: function (opts) {
            opts.url = baseUrl + opts.url;
            _httpPost(opts);
        },
        httpDownload: function (opts) {
            opts.url = baseUrl + opts.url;
            _httpDownload(opts);
        },

        /**
         * http请求
         * @param opts
         */
        http: function (opts) {
            opts.url = baseUrl + opts.url;
            _http(opts);
        },
        /**
         * http链式请求
         * @param opts
         * @param deferred
         * @returns {deferred.promise|{then, catch, finally}}
         */
        linkHttp: function (opts, deferred) {
            opts.url = baseUrl + opts.url;
            deferred = deferred || $q.defer();
            _linkHttpMin(opts, deferred);
            return deferred.promise;
        }
    };
});

