(function () {

    var SPA_RESOLVE_INIT = function (hashData) {

        console.log('开始执行 myUpload.js');

        myUpload(hashData);

    };

    function myUpload(hashData) {

        // console.log(hashData);

        // do something


    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();