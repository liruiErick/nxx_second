(function () {

    var SPA_RESOLVE_INIT = function (hashData) {

        console.log('开始执行 needHelp.js');

        needHelp(hashData);

    };

    function needHelp(hashData) {

        // console.log(hashData);

        // do something
        var $qus = $('#qus'),         // 问题
            $qusDes = $('#qusDes'),   // 描述
            $addImg = $('#addImg'),
            $selArea = $('#selArea'), // 领域
            $selLb = $('#selLb'),     // 标签
            $selPer = $('#selPer'),   // @ 用户框

            $sel = $('#sel'),         // 选择按钮
            $comStn = $('#comStn'),   // 提交按钮

            $modal = $('#modalDialog'),
            $imgBox = $('#imgBox'),

            temp = '<div class="item"><span class="fl icon-img"></span><span class="fl img-name nowrap">{{name}}</span></div>',
            user = '';

        var userData = hj.getUserData();
        if (userData) {
            hj.checkLogin(userData, function (msg) {
                if (msg) {
                    user = userData.decodeName
                } else {
                    user = '';
                    hj.clearUserInfo();
                    layer.msg('登录无效！', {time: 1500}, function () {
                        window.location.href = '' // 重载并返回首页
                    })
                }
            })
        }

        // 添加图片
        $addImg.change(function () {
            var imgHtml = '';
            for (var i = 0; i < this.files.length; i++) {
                if (this.files[i].type.split('/')[0] === 'image' && this.files[i].size < 104857600) {
                    imgHtml += hj.template({'name': this.files[i].name}, temp)
                }
            }
            $imgBox.html(imgHtml)
        });

        // 选择用户 弹出 @ 模态框
        $sel.click(function () {
            $modal.show();
        });

        // @ 模态框确认按钮
        $('.confirm').off().click(function () {
            $modal.hide();
            var uData = hjUtils.getUserListData();
            // console.log(uData);
            $selPer.val(uData);
            $('#modalDialog').find("input[type='checkbox']").prop("checked", false);
        });

        // 提交问题按钮
        $comStn.click(function (e) {
            e.preventDefault();
            var que = $qus.val(),
                qusDes = $qusDes.val(),
                selArea = $selArea.val(),
                selLb = $selLb.val(),
                selPer = $selPer.val();
            if (que && qusDes && selArea && user) {
                hj.ajax({
                    type: 'post',
                    url: hj.loadUrl + 'addQuestion',
                    data: {
                        'user': user,
                        'title': que,
                        'content': qusDes,
                        'area': selArea,
                        'tag': selLb,
                        'status': '0',
                        'imgs': '',
                        "invite": selPer
                    },
                    success: function (res) {
                        res = hj.loadXML(res);
                        // console.log(res);
                        if (res) {
                            layer.msg("求助成功！", {time: "1500"}, function () {
                                location.reload()
                            })
                        } else {
                            layer.msg("求助失败！");
                        }
                    }
                })
            } else {
                layer.msg("问题、问题描述和领域不能为空！");
            }
        });
    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();