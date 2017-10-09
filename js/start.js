(function () {

    var SPA_RESOLVE_INIT = function (hashData) {

        console.log('开始执行 start.js');

        indexStart(hashData);

    };

    function indexStart(hashData) {

        // console.log(hashData);

        // do something

        hj('.tab-switch, .switch-card').tabSwitch();

        hjUtils.topSearchBindClick();

        // @ 模态框确认按钮
        $('.confirm').off().click(function () {
            hjUtils.getUserListData(function (chkData) {
                console.log(chkData);
                // TODO : 首页确认后分享



                $('#modalDialog').find("input[type='checkbox']").prop("checked", false)
            })
        });

    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();