(function () {

    'use strict';

    var routerFn = {
        paraType: function (para) {
            return Object.prototype.toString.call(para)
        },

        getUrlMas: function (key) {
            var hashDetail = location.hash.split('?'),
                hashName = hashDetail[0].split('#' + key)[1],
                params = hashDetail[1] ? hashDetail[1].split('&') : [],
                query = {};
            for (var i = 0; i < params.length; i++) {
                var item = params[i].split('=');
                query[item[0]] = item[1]
            }
            return {
                path: hashName,
                query: query
            }
        }
    };

    function HjRouter() {

        this.hashList = {};     // 保存注册路由 - Object
        this.index = 'index';   // 设置默认主页 - String
        this.key = '';          // 默认规则 - String
        this.beforeJump = null; // 跳转之前 - Function
        this.afterJump = null;  // 跳转之后 - Function

    }

    HjRouter.prototype = {

        init: function () {
            var self = this;
            window.addEventListener('load', function () {
                // console.log('load');
                self.urlChange()
            });
            window.addEventListener('hashchange', function () {
                // console.log('hashchange');
                self.urlChange()
            });
            // 异步引入的js通过回调传参
            window.SPA_RESOLVE_INIT = null
        },

        urlChange: function () {
            var hashData = routerFn.getUrlMas(this.key);
            // console.log(hashData);
            if (this.hashList[hashData.path]) {
                this.refresh(hashData)
            } else {
                location.hash = this.key + this.index
            }
        },

        refresh: function (hashData) {
            var self = this;
            if (self.beforeJump) {
                self.beforeJump({
                    to: {
                        path: hashData.path,
                        query: hashData.query
                    },
                    next: function () {
                        self.hashList[hashData.path].callback.call(self, hashData)
                    }
                })
            } else {
                self.hashList[hashData.path].callback.call(self, hashData)
            }
        },

        setIndex: function (index) {
            if (routerFn.paraType(index) === '[object String]') {
                this.index = index
            }
        },

        add: function (path, callback) {
            path = path.replace(/\s*/g, '');
            if (path && callback && routerFn.paraType(callback) === '[object Function]') {
                this.hashList[path] = {
                    callback: callback,
                    fn: null // 储存异步文件状态
                }
            } else {
                console.trace('路由注册失败，\npath:' + path + '\ncallback:' + callback)
            }
        },

        remove: function (path) {
            if (this.hashList[path]) {
                delete this.hashList[path]
            }
        },

        beforeLoad: function (callback) {
            if (routerFn.paraType(callback) === '[object Function]') {
                this.beforeJump = callback
            } else {
                console.trace('路由切换前钩子函数不正确')
            }
        },

        afterLoad: function (callback) {
            if (routerFn.paraType(callback) === '[object Function]') {
                this.afterJump = callback
            } else {
                console.trace('路由切换后回调函数不正确')
            }
        },

        loadPage: function (path, area, callback) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    doResponse(xhr)
                }
            };
            xhr.open('POST', path, true);
            xhr.send(null);

            function doResponse(xhr) {
                var tmp = xhr.responseText;
                area.innerHTML = tmp;
                callback()
            }

        },

        asyncFun: function (file, hashData) {
            var self = this;
            if (self.hashList[hashData.path].fn) {
                // console.log(file + '已存在！');
                self.afterJump && self.afterJump(hashData);
                self.hashList[hashData.path].fn(hashData)
            } else {
                var _body = document.body;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = file;
                script.async = true;
                // SPA_RESOLVE_INIT = null;
                script.onload = function () {
                    // console.log(file + '加载完毕！');
                    self.afterJump && self.afterJump(hashData);
                    self.hashList[hashData.path].fn = SPA_RESOLVE_INIT;
                    self.hashList[hashData.path].fn(hashData)
                };
                _body.appendChild(script)
            }
        },

        syncFun: function (callback, hashData) {
            this.afterJump && this.afterJump(hashData);
            callback && callback(hashData)
        }

    };

    window.HjRouter = new HjRouter();

})();







































