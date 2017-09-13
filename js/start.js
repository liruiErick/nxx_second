(function () {

    var SPA_RESOLVE_INIT = function (hashData) {

        // console.log('开始执行indexStart.js');

        indexStart(hashData);

    };

    function indexStart(hashData) {

        // console.log(hashData);

        hj('.tab-switch, .switch-card').tabSwitch();

        // do something



    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();