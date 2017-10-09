/*!
 * hj(华建) Javascript Lib v1.0.1
 *
 */

(function (root, factory) {

    factory(root)

})(window, function (window) {

    'use strict';

    var document = window.document,//获取document对象

        version = '1.0.1',

        serverInfo = 'http://10.0.0.21:8080/axis2/services/KbmsService/',//接口地址

        regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,//去除两端空格正则

        regClass = /^\.\S+$/g,//刷选class正则

        regId = /^#\S+$/g;//筛选id正则

    var hj = function (I) {//获取hj对象
        return new hj.fn.Init(I)
    };

    hj.fn = hj.prototype = {//fn共享hj的原型链

        hj: version,

        constructor: hj,

        each: function (fn) {//相当于jquery的each函数,这里只是处理了参数为函数的对象
            for (var i = 0, len = this.length; i < len; i++) {
                fn(this[i])
            }
            return this
        },

        /*
         * 注：on 和 off 这两个方法只提供了基础的事件绑定和解绑，
         * 目的是提供更简洁和单纯的事件绑定，并避免与 jQuery 产生耦合
         *
         * 不建议在其他业务需求中直接使用这两个函数
         * 如果需要使用，fn 要以声明的方式传递，否则难以解绑
         *
         * 调用时要确保事件不会重复绑定！！！如果无法避免请直接使用 jQuery
         *
         */
        on: function (event, fn) {//绑定事件
            if (utils.paraType(event) === '[object String]' && utils.paraType(fn) === '[object Function]') {
                return this.each(function (_this) {
                    _this.addEventListener(event, fn)
                })
            }
            return this
        },

        off: function (event, fn) {//解除绑定事件
            if (utils.paraType(event) === '[object String]' && utils.paraType(fn) === '[object Function]') {
                return this.each(function (_this) {
                    _this.removeEventListener(event, fn)
                })
            }
            return this
        },

        tabSwitch: function () {//tab框切换组件，两种类型的tab框切换 一种切换按钮时a标签 另一种是li标签
            this.each(function (_this) {
                var b_box = null,
                    t_box = null,
                    s_btn = null,
                    s_tab = null,
                    len = 0,
                    i = 0;
                if (_this.className.indexOf('tab-switch') !== -1) {
                    b_box = _this.getElementsByClassName('switch-btn')[0];
                    t_box = _this.getElementsByClassName('switch-box')[0];
                    s_btn = b_box.getElementsByTagName('a');
                    s_tab = t_box.getElementsByClassName('tab-box');
                    len = s_btn.length;
                } else {
                    b_box = _this.getElementsByClassName('card-btn')[0];
                    t_box = _this.getElementsByClassName('card-box')[0];
                    s_btn = b_box.getElementsByTagName('li');
                    s_tab = t_box.getElementsByClassName('card-item');
                    len = s_btn.length;
                }
                //切换标签添上索引属性，建立切换之间的联动关系
                for (; i < len; i++) {
                    s_btn[i].tabIndex = i
                }

                for (i = 0; i < len; i++) {

                    s_btn[i].onclick = function () {//对每个切换标签绑定点击事件

                        var this_class = this.className;

                        if (this_class.indexOf('active') === -1) {//当前切换标签不存在active属性

                            var will_show_tab = s_tab[this.tabIndex],
                                this_show_class = will_show_tab ? will_show_tab.className : '',//获取将要显示内容的dom对象

                                b_s = hj.siblings(this),//获取切换标签兄弟节点对象
                                t_s = will_show_tab ? hj.siblings(will_show_tab) : [];//获取将要显示的内容的兄弟对象

                            this.setAttribute('class', ((this_class) ? this_class + ' ' : '') + 'active');//设置当前切换标签的active类
                            hj.removeClass(b_s, 'active');//去除其兄弟节点的active类

                            if (this_show_class) {//设置显示内容的active类及兄弟的active的类

                                hj.removeClass(t_s, 'show');
                                will_show_tab.setAttribute('class', this_show_class + ' show')

                            } else {
                                console.warn('This button does not have a corresponding card')
                            }
                        }
                    }
                }
            })
        }
    };

    var Init = hj.fn.Init = function (I) {//共享Init方法

        if (!I) {
            return this
        }

        if (Object.prototype.toString.call(I) === '[object String]') {

            if (!(this instanceof hj)) {
                return new hj.fn.Init(I)
            }

            utils.getAllDom(this, I);

            this.selector = I;

            return this
        }

    };

    hj.extend = hj.fn.extend = function () {//把extend对象中方法挂载到hj上
        var len = arguments.length,
            i = 1,
            target = arguments[0] || {};

        if (Object.prototype.toString.call(target) !== '[object Object]') {
            target = {}
        }
        if (i === len) {
            target = this;
            i--
        }

        for (; i < len; i++) {
            if (arguments[i] != null) {
                for (var key in arguments[i]) {
                    if (arguments[i][key] !== undefined) {
                        target[key] = arguments[i][key]
                    }
                }
            }
        }

        return target
    };//共享extend方法

    hj.loadUrl = serverInfo;

    hj.loadXML = function (xmlStr) {//解析xml为json
        var obj = new DOMParser().parseFromString(xmlStr, 'text/xml') || new ActiveXObject('Microsoft.XMLDOM'),
            str = obj.documentElement ? obj.documentElement.textContent : obj.loadXML(xmlStr);
        if (obj.async) {
            obj.async = false
        }
        try {
            return JSON.parse(str)
        } catch (e) {
            return str
        }
    };

    hj.ajax = function (option) {
        var XMLHttp = null;
        if (utils.paraType(option) !== '[object Object]') {
            console.warn('Parameter error');
            return
        }
        if (!option.url) {
            console.warn('The Ajax request link cannot be empty');
            return
        }
        option.type = option.type ? option.type.toLowerCase() : 'get';
        option.data = option.data || null;
        // option.dataType = option.dataType || 'text';
        option.async = option.async || true;
        try {
            XMLHttp = new XMLHttpRequest();
        } catch (e) {

        }

        if (!utils.isEmptyObject(option.data)) {
            option.data = utils.handleAjaxData(option.data)
        }

        if (option.type === 'post') {
            XMLHttp.open(option.type, option.url, option.async);
            XMLHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            XMLHttp.send(option.data)
        } else { // 'get'
            XMLHttp.open(option.type, option.url + ((option.data) ? '?' + option.data : ''), option.async);
            XMLHttp.send()
        }

        XMLHttp.onreadystatechange = function () {
            if (XMLHttp.readyState === 4) {
                if (XMLHttp.status >= 200 && XMLHttp.status < 300 || XMLHttp.status === 304) {
                    if (option.success) {
                        option.success(XMLHttp.responseText)
                    }
                } else {
                    if (option.error) {
                        option.error(XMLHttp.status)
                    }
                }
            }
        }

    };

    hj.getUserData = function () {
        var cn = this.getCookie('identify');
        var cc = this.getCookie('key_code');
        var ln = localStorage['identify'];
        var lc = localStorage['key_code'];
        if ((cn && cc) || (ln && lc)) {
            return {
                'name': cn || ln,
                'decodeName': decodeURIComponent(cn || ln),
                'key_code': cc || lc
            }
        } else {
            return ''
        }
    };

    hj.checkLogin = function (userData, fn) {
        // console.log(userData);
        this.ajax({
            type: 'post',
            url: this.loadUrl + 'login',
            data: {
                'user': userData.decodeName,
                'password': userData.key_code
            },
            success: function (res) {
                res = hj.loadXML(res);
                if (res === 0) {
                    fn(true)
                } else {
                    fn(false)
                }
            }
        })
    };

    hj.setCookie = function (data) {
        var t = null;
        if (utils.paraType(data) === '[object Object]') {
            for (var key in data) {
                if (data[key].time) {
                    t = new Date();
                    t.setTime(t.getTime() + (data[key].time * 1000));
                } else {
                    t = null
                }
                document.cookie = encodeURI(key) + '=' + encodeURI(data[key].value) + ((t) ? '; expires=' + t.toUTCString() : '') + '; path=/';
            }
        }
    };

    hj.getCookie = function (name) {
        if (document.cookie) {
            var cookies = {};
            var obj = document.cookie.split('; ');
            for (var i = 0, len = obj.length, n = '', val = ''; i < len; i++) {
                var index = obj[i].indexOf('=');
                n = obj[i].substr(0, index);
                val = obj[i].substr(index + 1, obj[i].length);
                cookies[n] = val
            }
            n = null;
            val = null;
            if (document.cookie.indexOf(encodeURI(name)) !== -1) {
                return decodeURI(cookies[encodeURI(name)])
            } else {
                return cookies
            }
        } else {
            return ''
        }
    };

    hj.removeCookie = function () { // 清除所有
        var cookies = hj.getCookie();
        if (cookies) {
            var d = new Date();
            d.setTime(d.getTime() - 1);
            for (var key in cookies) {
                document.cookie = key + '=; expires=' + d.toUTCString() + '; path=/'
            }
        }
    };

    hj.clearUserInfo = function (fn) {
        this.removeCookie();
        localStorage.clear();
        fn ? fn() : null
    };

    hj.getToken = function (strMd5) {
        if (strMd5.length === 32) {
            return strMd5[0] + strMd5[8] + strMd5[16] + strMd5[24]
        }
        return ''
    };

    hj.template = function (data, temp) {
        return temp.replace(/{{(\w+)}}/g, function (p1, p2) {
            if (!p2) {
                return ''
            }
            return data[p2]
        })
    };

    hj.TemplateEngine = function (options) {
        var el = document.getElementById(options.el),
            temp = document.getElementById(options.temp).innerHTML,
            data = options.data || [],
            index = 0,
            _function = "var html = '';",
            matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;

        function filterHTML(source) {
            return String(source)
                .replace(/\\/g, "")
                .replace(/'/g, "'")
                .replace(/\r/g, "")
                .replace(/\n/g, "")
                .replace(/\t/g, "")
                .replace(/\u2028/g, "\\u2028")
                .replace(/\u2029/g, "\\u2029")
        }

        _function += "html += '";

        temp.replace(matcher, function (match, interpolate, eveluate, offset) {
            var tmp = filterHTML(temp.slice(index, offset)).replace(/\s+/g, ' ').trim();

            if (tmp) {
                _function += tmp
            }
            if (eveluate) {
                _function += "';" + eveluate + "html += '"
            }
            if (interpolate) {
                _function += "' + " + interpolate + " + '"
            }
            index = offset + match.length
        });

        _function += "'; return html;";

        var func = new Function('data', _function);

        // console.log(func(data));

        el.innerHTML = func(data);

        options.callback ? options.callback() : null

    };

    hj.md5 = function (string) {
        function safeAdd(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF)
        }

        function bitRotateLeft(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt))
        }

        function md5cmn(q, a, b, x, s, t) {
            return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
        }

        function md5ff(a, b, c, d, x, s, t) {
            return md5cmn((b & c) | ((~b) & d), a, b, x, s, t)
        }

        function md5gg(a, b, c, d, x, s, t) {
            return md5cmn((b & d) | (c & (~d)), a, b, x, s, t)
        }

        function md5hh(a, b, c, d, x, s, t) {
            return md5cmn(b ^ c ^ d, a, b, x, s, t)
        }

        function md5ii(a, b, c, d, x, s, t) {
            return md5cmn(c ^ (b | (~d)), a, b, x, s, t)
        }

        function binlMD5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << (len % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var i;
            var olda;
            var oldb;
            var oldc;
            var oldd;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            for (i = 0; i < x.length; i += 16) {
                olda = a;
                oldb = b;
                oldc = c;
                oldd = d;

                a = md5ff(a, b, c, d, x[i], 7, -680876936);
                d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5gg(b, c, d, a, x[i], 20, -373897302);
                a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5hh(d, a, b, c, x[i], 11, -358537222);
                c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5ii(a, b, c, d, x[i], 6, -198630844);
                d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safeAdd(a, olda);
                b = safeAdd(b, oldb);
                c = safeAdd(c, oldc);
                d = safeAdd(d, oldd)
            }
            return [a, b, c, d]
        }

        function binl2rstr(input) {
            var i;
            var output = '';
            var length32 = input.length * 32;
            for (i = 0; i < length32; i += 8) {
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
            }
            return output
        }

        function rstr2binl(input) {
            var i;
            var output = [];
            output[(input.length >> 2) - 1] = undefined;
            for (i = 0; i < output.length; i += 1) {
                output[i] = 0
            }
            var length8 = input.length * 8;
            for (i = 0; i < length8; i += 8) {
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
            }
            return output
        }

        function rstrMD5(s) {
            return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
        }

        function rstr2hex(input) {
            var hexTab = '0123456789abcdef';
            var output = '';
            var x;
            var i;
            for (i = 0; i < input.length; i += 1) {
                x = input.charCodeAt(i);
                output += hexTab.charAt((x >>> 4) & 0x0F) +
                    hexTab.charAt(x & 0x0F)
            }
            return output
        }

        function rawMD5(s) {
            return rstrMD5(unescape(encodeURIComponent(s)))
        }

        return rstr2hex(rawMD5(string))
    };

    hj.extend({

        trim: function (str) {
            return str ? (str + '').replace(regTrim, '') : ''
        },
        removeClass: function (elem, name) {
            var i = 0,
                l = elem.length || 0;
            for (; i < l; i++) {
                var c = elem[i].className || '';
                if (c.indexOf(name || ' ') !== -1) {
                    var t = elem[i].classList;
                    for (var j = 0, p = []; j < t.length; j++) {
                        if (t[j] !== name) {
                            p.push(t[j])
                        }
                    }
                    elem[i].setAttribute('class', p.join(' '))
                }
            }
        },
        siblings: function (elem) {//获取兄弟节点
            var r = [];
            var n = elem.parentNode.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }

    });

    var utils = {
        getAllDom: function (context, sel) {
            if (hj.trim(sel)) {

                var arr = sel.split(','),
                    tmp = null;

                for (var i = 0, len = arr.length; i < len; i++) {
                    var str = hj.trim(arr[i]);

                    if (regClass.test(str)) {
                        tmp = document.getElementsByClassName(str.replace('.', ''));
                        context = this.pushDom(context, tmp)
                    } else if (regId.test(str)) {
                        tmp = document.getElementById(str.replace('#', ''));
                        context = this.pushDom(context, [tmp]);
                    } else {
                        tmp = document.querySelectorAll(str);
                        context = this.pushDom(context, tmp)
                    }
                }

                return context
            } else {

                return []
            }
        },

        pushDom: function (target, source) {
            var i = 0,
                j = target.length || 0,
                len = source.length;
            for (; i < len; i++) {
                target[j + i] = source[i]
            }
            target.length = j + i;

            target.context = document;

            return target
        },

        paraType: function (para) {//获取参数类型
            return Object.prototype.toString.call(para)
        },

        isEmptyObject: function (obj) {//判断对象是否是对象
            var t;
            for (t in obj) {
                return false;
            }
            return true;
        },

        handleAjaxData: function (dataObj) {//把ajax的data属性修改成a=2&b=3的格式
            var key,
                arr = [];
            for (key in dataObj) {
                arr.push(key + '=' + dataObj[key])
            }
            return arr.join('&')
        }
    };

    Init.prototype = hj.fn;//Init与fn共享原型链

    window.hj = hj;//hj对象挂载到document上

    return hj

});

/*！
 * hjForm
 * 基于 jQuery 的表单校验插件
 */
(function (root, factory, plug) {

    factory(root.jQuery, plug)

})(window, function ($, plug) {

    var __DEFAULTS__ = {//默认配置
        trigger: 'keyup',   // 默认验证触发 keyup 事件
        errMsg: '无效的值',  // 默认错误提示信息
        submitType: 'ajax', // 提交方式 'ajax' || 'normal'
        item: null,
        submitBtn: null
    };

    var __PROTOTYPE__ = { //获取注册内容
        _submit: function (fn, btn) {
            var err = this.$I.trigger(this.trigger).filter('.err').length,
                data = {};
            if (err === 0) {
                for (var i = 0; i < this.itemKey.length; i++) {
                    data[this.itemKey[i]] = $(this.itemKey[i]).val();
                }
                fn(data)
            } else {
                btn.disabled = false
            }
        },
        _normalSubmit: function () {

        }
    };

    var __RULES__ = { //验证内容
        'required': function () { // 验证是否为空
            return this.val() !== ''
        },
        'regexp': function (val) { // 正则验证
            return new RegExp(val).test(this.val())
        },
        'equals': function (val) { // 验证是否相等
            return $(val).val() === this.val()
        }
    };

    $.fn[plug] = function (options) {

        var _this = this;

        $.extend(this, __DEFAULTS__, options, __PROTOTYPE__);

        if (this.item) { //设置注册dom、内容
            var sel,
                tmp = [];
            for (sel in this.item) {
                tmp.push(sel)
            }
            this.itemKey = tmp;
            this.$I = this.find(tmp.join(','));
        } else {
            this.$I = this.find('input, select, textarea').not('[type=button], [type=submit], [type=reset]');
        }

        // console.log(this);

        this.$I.on(this.trigger, function () { //设置验证内容

            var $this = $(this).removeClass('succ err');

            var msgBox = $this.parent().siblings('p').attr('class', 'def hide');

            var result = true;

            $.each(__RULES__, function (rule, func) { //设置验证方式
                var item = _this.item['#' + $this[0].id];
                if (item[rule]) {
                    result = func.call($this, item[rule]);
                    if (result) {
                        msgBox.html('').attr('class', 'def hide');
                    } else {
                        msgBox.html(item[rule + '-msg'] || _this.errMsg).attr('class', 'def err')
                    }

                    return result
                }
            });

            $this.addClass(result ? 'succ' : 'err')

        });

        // 提交
        $(this.submitBtn.btn).on('click', function (e) {
            var btn = this;
            e.preventDefault();
            btn.disabled = true;
            _this._submit(_this.submitBtn.fn, btn);
        })

    }

}, 'hjForm');















