(function () {

    var page = document.getElementById('page');

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

    // HjRouter.beforeJump(function () {
    //
    // });

    HjRouter.setIndex('start');
    HjRouter.key = '!';
    HjRouter.init();


    window.hjUtils = {
        topSearchBindClick: function () {

            // TODO: 点击搜索按钮抓取信息

            var box = $('#color-switch');

            box.find('.ser-tab a').click(function () {
                box.attr('class', $(this).data('color'));
                $(this).addClass('checked').siblings().removeClass('checked');
            })

        }


    };

})();






















