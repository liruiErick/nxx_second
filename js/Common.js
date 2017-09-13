/*!
 * hj(华建) Javascript Lib v1.0.1
 *
 */

(function (root, factory) {

    factory(root)

})(window, function (window) {

    'use strict';

    var document = window.document,

        version = '1.0.1',

        serverInfo = 'http://10.0.0.21:8080/',

        regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        regClass = /^\.\S+$/g,

        regId = /^#\S+$/g;

    var hj = function (I) {
        return new hj.fn.Init(I)
    };

    hj.fn = hj.prototype = {

        hj: version,

        constructor: hj,

        each: function (fn) {
            for (var i = 0, len = this.length; i < len; i++) {
                fn(this[i])
            }
            return this
        },

        tabSwitch: function () {
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

                for (; i < len; i++) {
                    s_btn[i].tabIndex = i
                }

                for (i = 0; i < len; i++) {

                    s_btn[i].onclick = function () {

                        var this_class = this.className;

                        if (this_class.indexOf('active') === -1) {

                            var will_show_tab = s_tab[this.tabIndex],
                                this_show_class = will_show_tab ? will_show_tab.className : '',

                                b_s = hj.siblings(this),
                                t_s = will_show_tab ? hj.siblings(will_show_tab) : [];

                            this.setAttribute('class', this_class + ' active');
                            hj.removeClass(b_s, 'active');

                            if (this_show_class) {

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

    var Init = hj.fn.Init = function (I) {

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

    hj.extend = hj.fn.extend = function () {
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
    };

    hj.loadUrl = serverInfo;

    hj.loadXML = function (xmlStr) {
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
        siblings: function (elem) {
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
        }
    };

    Init.prototype = hj.fn;

    window.hj = hj;

    return hj

});


















