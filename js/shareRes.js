(function () {
    var SPA_RESOLVE_INIT = function (hashData) {

        console.log('开始执行indexShareRes.js');

        indexShareRes(hashData);

    };

    function indexShareRes(hashData) {

        // console.log(hashData);

        // do something

        /*切换内容提示*/

        $(".check").click(function () {
            $(".tabs").toggleClass(".active");
        });
        $(function () {

            var width = 233;
            var ulNum = $(".content ul").length;
            var contentWidth = width * ulNum;

            $(".box").width(contentWidth);

            $(".nav span").click(function () {

                $(this).addClass('active').siblings().removeClass('active');

                var clickNum = $(this).index();

                var moveLeft = clickNum * width * -1;

                $(".box").animate({'left': moveLeft}, 500);
            })

        });

    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();