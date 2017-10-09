(function () {

    var page = document.getElementById('page');

    /**
     * 四大页面路由注册
     */
    HjRouter.add('start', function (hashData) {

        HjRouter.loadPage('pages/start.html', page, function () {
            HjRouter.asyncFun('js/start.js', hashData)
        });

    });
    HjRouter.add('internetRes', function (hashData) {

        HjRouter.loadPage('pages/internetRes.html', page, function () {
            HjRouter.asyncFun('js/internetRes.js', hashData)
        });

    });
    HjRouter.add('shareRes', function (hashData) {

        HjRouter.loadPage('pages/shareRes.html', page, function () {
            HjRouter.asyncFun('js/shareRes.js', hashData)
        });

    });
    HjRouter.add('scienceRes', function (hashData) {

        HjRouter.loadPage('pages/scienceRes.html', page, function () {
            HjRouter.asyncFun('js/scienceRes.js', hashData)
        });

    });

    /**
     * start 页路由注册
     */
    HjRouter.add('startNoticeMore', function (hashData) {

        HjRouter.loadPage('pages/start/startNoticeMore.html', page, function () {
            HjRouter.asyncFun('js/startNoticeMore.js', hashData)
        });

    });
    HjRouter.add('startNoticeDetail', function (hashData) {

        HjRouter.loadPage('pages/start/startNoticeDetail.html', page, function () {
            HjRouter.asyncFun('js/startNoticeDetail.js', hashData)
        });

    });
    HjRouter.add('mySpider', function (hashData) {

        HjRouter.loadPage('pages/start/mySpider.html', page, function () {
            HjRouter.asyncFun('js/mySpider.js', hashData)
        });

    });
    HjRouter.add('myCollection', function (hashData) {

        HjRouter.loadPage('pages/start/myCollection.html', page, function () {
            HjRouter.asyncFun('js/myCollection.js', hashData)
        });

    });
    HjRouter.add('myRecommend', function (hashData) {

        HjRouter.loadPage('pages/start/myRecommend.html', page, function () {
            HjRouter.asyncFun('js/myRecommend.js', hashData)
        });

    });
    HjRouter.add('myUpload', function (hashData) {

        HjRouter.loadPage('pages/start/myUpload.html', page, function () {
            HjRouter.asyncFun('js/myUpload.js', hashData)
        });

    });
    HjRouter.add('startNewsList', function (hashData) {

        HjRouter.loadPage('pages/start/startNewsList.html', page, function () {
            HjRouter.asyncFun('js/startNewsList.js', hashData)
        });

    });
    HjRouter.add('problemDetail', function (hashData) {

        HjRouter.loadPage('pages/start/problemDetail.html', page, function () {
            HjRouter.asyncFun('js/problemDetail.js', hashData)
        });

    });

    /**
     * internetRes 页路由注册
     */
    HjRouter.add('internetResSearch', function (hashData) {

        HjRouter.loadPage('pages/internetRes/internetResSearch.html', page, function () {
            HjRouter.asyncFun('js/internetResSearch.js', hashData)
        });

    });
    HjRouter.add('internetNewsDetail', function (hashData) {

        HjRouter.loadPage('pages/internetRes/internetNewsDetail.html', page, function () {
            HjRouter.asyncFun('js/internetNewsDetail.js', hashData)
        });

    });
    HjRouter.add('wbDetail', function (hashData) {

        HjRouter.loadPage('pages/internetRes/wbDetail.html', page, function () {
            HjRouter.asyncFun('js/wbDetail.js', hashData)
        });

    });
    HjRouter.add('internetAttentionList', function (hashData) {

        HjRouter.loadPage('pages/internetRes/internetAttentionList.html', page, function () {
            HjRouter.asyncFun('js/internetAttentionList.js', hashData)
        });

    });


    /**
     * shareRes 页路由注册
     */
    HjRouter.add('searchRes', function (hashData) {

        HjRouter.loadPage('pages/shareRes/searchRes.html', page, function () {
            HjRouter.asyncFun('js/searchRes.js', hashData)
        });

    });
    HjRouter.add('searchUserAndPro', function (hashData) {

        HjRouter.loadPage('pages/shareRes/searchUserAndPro.html', page, function () {
            HjRouter.asyncFun('js/searchUserAndPro.js', hashData)
        });

    });
    HjRouter.add('upload', function (hashData) {

        HjRouter.loadPage('pages/shareRes/upload.html', page, function () {
            HjRouter.asyncFun('js/upload.js', hashData)
        });

    });
    HjRouter.add('resPreview', function (hashData) {

        HjRouter.loadPage('pages/shareRes/resPreview.html', page, function () {
            HjRouter.asyncFun('js/resPreview.js', hashData)
        });

    });
    HjRouter.add('needHelp', function (hashData) {

        HjRouter.loadPage('pages/shareRes/needHelp.html', page, function () {
            HjRouter.asyncFun('js/needHelp.js', hashData)
        });

    });
    HjRouter.add('myHelp', function (hashData) {

        HjRouter.loadPage('pages/shareRes/myHelp.html', page, function () {
            HjRouter.asyncFun('js/myHelp.js', hashData)
        });

    });


    /**
     * scienceRes 页路由注册
     */
    HjRouter.add('scienceResSearch', function (hashData) {

        HjRouter.loadPage('pages/scienceRes/scienceResSearch.html', page, function () {
            HjRouter.asyncFun('js/scienceResSearch.js', hashData)
        });

    });
    HjRouter.add('scienceDetail', function (hashData) {

        HjRouter.loadPage('pages/scienceRes/scienceDetail.html', page, function () {
            HjRouter.asyncFun('js/scienceDetail.js', hashData)
        });

    });

    HjRouter.beforeLoad(function (msg) {
        // console.log(msg);
        var self = this;
        if (msg.to.path.indexOf('needHelp') !== -1) {
            var tmp = hj.getUserData();
            if (!tmp) {
                layer.msg("请先登陆！", {time: 2000}, function () {
                    $('.user-btn')[0].click();
                });
                $('#closeBtn').click(function () {
                    msg.from.path === msg.to.path ? location.hash = '' : location.hash = self.key + msg.from.path
                })
            } else {
                msg.next()
            }
        } else {
            msg.next()
        }
    });

    HjRouter.setIndex('start');
    HjRouter.key = '!';
    HjRouter.init();

    var user_html = '<div class="user-box"><a class="user-name nowrap" href="javascript:void(0);">欢迎，{{decodeName}}</a><ul><li><a href="#!myHelp?key={{name}}" target="_blank">我的求助</a></li><li><a class="quit" href="javascript:void(0);">退出</a></li></ul></div>';
    var btn_html = '<a class="user-btn" data-msg="欢迎登录" data-class=".login-form" data-height="309" href="javascript:void(0);">登录</a><span>/</span><a class="user-btn" data-msg="欢迎注册" data-class=".register-form" data-height="535" href="javascript:void(0);">注册</a>';
    var loginBox = document.getElementById('loginBox');
    var topMsg = $('#topMsg');
    var modalBox = $('#modalBox');
    var modalBody = $('#modalBody');
    var modalTitle = $('#modalTitle');
    var closeBtn = $('#closeBtn');
    var toggle = $('.toggle');
    var department = $('#department');
    var modalDialog = $('#modalDialog');

    var loginBtn = $('#loginBtn');
    var regBtn = $('#register');
    var resetBtn = $('#resBtn');

    var inHeight = 0;

    // 获取部门列表和用户列表
    (function () {
        hj.ajax({
            type: 'post',
            url: hj.loadUrl + 'getDepartmentList',
            success: function (res) {
                var temp = '<option value="{{id}}">{{name}}</option>';
                var html = '';
                res = hj.loadXML(res);
                // console.log(res);
                for (var i = 0; i < res.length; i++) {
                    html += hj.template(res[i], temp)
                }
                department.append(html);

                new hj.TemplateEngine({
                    el: 'mdBody',
                    temp: 'userListTpl',
                    data: res,
                    callback: bindEventForUserList
                });
            }
        })
    })();

    // 自动登录
    var userData = hj.getUserData();
    if (userData) {
        hj.checkLogin(userData, function (msg) {
            if (msg) {
                loginBox.innerHTML = hj.template(userData, user_html);
                // 退出登录
                loginBox.getElementsByClassName('quit')[0].onclick = function () {
                    hj.clearUserInfo(reset);
                    window.location.href = '' // 重载并返回首页
                };
            } else {
                hj.clearUserInfo(reset);
                layer.msg('登录失败，请重新登录！', {time: 2000})
            }
        })
    } else {
        hj.clearUserInfo(reset);
    }

    // 登录注册按钮
    function reset() {
        loginBox.innerHTML = btn_html;
        $(loginBox).find('.user-btn').on('click', function () {
            // modalBody.find('input').val('');
            inHeight = window.innerHeight;
            modalTitle.html($(this).data('msg'));
            $($(this).data('class')).show().siblings().hide();
            modalBox.show().animate({opacity: 1}, 'fast');
            modalBody.animate({top: (inHeight - $(this).data('height')) / 2 + 'px'}, 'fast')
        })
    }

    // 关闭模态框
    closeBtn.off().click(function () {
        modalBox.animate({opacity: 0}, 'fast').hide('fast');
        modalBody.animate({top: 0}, 'fast');
        modalBody.find('input').val('');
        department.val('');
        loginBtn[0].disabled = false;
        regBtn[0].disabled = false;
        resetBtn[0].disabled = false;
    });

    // 修改密码、返回、立即创建、立即登录按钮事件
    toggle.click(function () {
        $($(this).data('class')).animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 200);
        modalBody.animate({
            top: (inHeight - $(this).data('height')) / 2 + 'px'
        }, 'fast');
        modalTitle.html($(this).data('msg'));
    });

    // 模态框顶部信息提示
    function showTipMsg(msg, time, obj, fn) {
        topMsg.html(msg).stop().animate({opacity: 1, top: '40px'}, 200).show(200);
        setTimeout(function () {
            hideTipMsg(topMsg, obj, fn)
        }, time)
    }

    function hideTipMsg(topMsg, obj, fn) {
        topMsg.stop().animate({opacity: 0, top: '10px'}, 100).html('');
        if (obj)
            obj[0].disabled = false;
        if (fn) {
            fn()
        }
    }

    // 注册表单验证
    $('#regForm').hjForm({
        trigger: 'input',
        item: {
            '#reg_name': {
                'required': true,
                'required-msg': '用户名不能为空',
                'regexp': /^[a-zA-Z0-9\u4e00-\u9fa5_-]{1,20}$/,
                'regexp-msg': '支持中文、字母、数字、"-"、"_"的组合，1-20个字符'
            },
            '#reg_tel': {
                'required': true,
                'required-msg': '电话号码不能为空',
                'regexp': /^((0\d{2,3}-?)?\d{7,8}|(\+86|0086)?\s*1[34578]\d{9})$/,
                'regexp-msg': '请输入正确的电话号码'
            },
            '#department': {
                'required': true,
                'required-msg': '部门不能为空'
            },
            '#reg_pwd': {
                'required': true,
                'required-msg': '密码不能为空',
                'regexp': /^(.*[\w_-].*){6,20}$/,
                'regexp-msg': '允许使用字母、数字和符号的组合，6-20个字符'
            },
            '#reg_dou_pwd': {
                'required': true,
                'required-msg': '密码不能为空',
                'regexp': /^(.*[\w_-].*){6,20}$/,
                'regexp-msg': '允许使用字母、数字和符号的组合，6-20个字符',
                'equals': '#reg_pwd',
                'equals-msg': '两次密码不一致'
            }
        },
        submitBtn: {
            btn: '#register',
            fn: function (data) {
                // console.log(data);
                hj.ajax({
                    type: 'post',
                    url: hj.loadUrl + 'addUser',
                    data: {
                        'user': data['#reg_name'],
                        'password': hj.md5(data['#reg_dou_pwd']),
                        'tel': data['#reg_tel'],
                        'department': data['#department']
                    },
                    success: function (res) {
                        res = hj.loadXML(res);
                        if (res) {
                            showTipMsg('注册成功！', 2000, regBtn, function () {
                                $('.reg-login').click();
                                modalBody.find('input').val('');
                                department.val('');
                            })
                        } else {
                            showTipMsg('注册失败，该用户名已存在！', 4000, regBtn)
                        }
                    }
                })
            }
        }
    });

    // 登陆
    loginBtn.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var user = $("#name").val();
        var pass = $("#pwd").val();
        var chk = $("#chk")[0].checked;
        this.disabled = true;
        if (user && pass) {
            hj.ajax({
                type: 'post',
                url: hj.loadUrl + 'login',
                data: {
                    'user': user,
                    'password': hj.md5(pass)
                },
                success: function (res) {
                    res = hj.loadXML(res);
                    if (res === 0) {
                        showTipMsg('欢迎回来！', 1500, '', function () {
                            if (chk) {
                                localStorage['identify'] = encodeURIComponent(user);
                                localStorage['key_code'] = hj.md5(pass);
                            } else {
                                hj.setCookie({
                                    'identify': {
                                        value: encodeURIComponent(user)
                                    },
                                    'key_code': {
                                        value: hj.md5(pass)
                                    }
                                });
                            }
                            location.reload();
                        })
                    } else {
                        showTipMsg((res === 1) ? '登陆失败，请检查用户名或密码！' : '登陆失败，该用户名不存在！', 2000, loginBtn);
                    }
                }
            })
        }
    });

    // 修改密码
    resetBtn.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var user = $("#resName").val();
        var oldP = $("#oldPwd").val();
        var newP = $("#newPwd").val();
        this.disabled = true;
        if (user && oldP && newP) {
            hj.ajax({
                type: 'post',
                url: hj.loadUrl + 'changePassword',
                data: {
                    'user': user,
                    'oldPass': hj.md5(oldP),
                    'newPass': hj.md5(newP)
                },
                success: function (res) {
                    res = hj.loadXML(res);
                    // console.log(res);
                    if (res) {
                        showTipMsg('修改成功！', 2000, resetBtn, function () {
                            $(".back").click();
                            modalBody.find('input').val('');
                        })
                    } else {
                        showTipMsg('修改失败', 3000, resetBtn);
                    }
                }
            })
        }
    });

    // @ 模态框关闭按钮
    $("#mCloseBtn").click(function () {
        modalDialog.hide();
        $('#modalDialog').find("input[type='checkbox']").prop("checked", false)
    });
    // @ 模态框动态事件绑定
    function bindEventForUserList() {
        // 展开收缩事件
        $('a.part').click(function (e) {
            e.stopPropagation();
            $(this).toggleClass('active').parent().siblings('.con').toggleClass('show');
        });
        // 全选
        $(".chk-all").click(function () {
            var _this = $(this);
            if (_this[0].checked) {
                _this.parents('.head').siblings('.con').find("input[type='checkbox']").prop("checked", true)
            } else {
                _this.parents('.head').siblings('.con').find("input[type='checkbox']").prop("checked", false)
            }
        });
    }

    window.hjUtils = {
        topSearchBindClick: function () {

            // TODO: 点击搜索按钮抓取信息

            var box = $('#color-switch');

            box.find('.ser-tab a').click(function () {
                box.attr('class', $(this).data('color'));
                $(this).addClass('checked').siblings().removeClass('checked');
            })

        },
        getUserListData: function (fn) {
            var data = [];
            var tmp = $(".con").find("input[type='checkbox']");
            tmp.each(function (index, item) {
                if ($(item).prop("checked")) {
                    data.push($(item).val())
                }
            });
            modalDialog.find("input[type='checkbox']").prop("checked", false);
            if (fn) {
                fn(data.join(';'))
            } else {
                return data.join(';')
            }
        }
    }

})();






















