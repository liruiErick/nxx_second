(function () {
    var SPA_RESOLVE_INIT = function (hashData) {

        console.log('开始执行indexShareRes.js');

        indexShareRes(hashData);

    };

    function indexShareRes(hashData) {

        // console.log(hashData);

        // do something
        /*获取操作类型*/
        var SearchType=[];
        $(".searchs .search-txt .search-tab ul li").each(function () {
            SearchType.push($(this).text());
        });
        /*切换搜索内容类型*/
        $(".searchs .search-txt .search-tab .check").off().click(function (e) {
            e.stopPropagation();
            $(".searchs .search-txt .search-tab ul.tabs").toggleClass("active");
            $(".searchs .search-txt .search-tab i.icon").toggleClass("active");
        });
        /*选中搜索内容类型*/
        $(".searchs .search-txt .search-tab ul li").off().click(function (e) {
            e.stopPropagation();
            $(".searchs .search-txt .search-tab .check").text($(this).text());
        });
        /*搜索框获取焦点*/
        /*$(".searchs .search-txt .search-tab .txt-serach input").off().focus(function () {
            $(".searchs .search-txt .search-tab .txt-serach .hot-sug").css("display","block");

            $(".searchs .search-txt .search-tab .check").text()==="内容"?$(".searchs .search-txt .search-tab .txt-serach .hot-sug ul:first-child").css("display","block"):$(".searchs .search-txt .search-tab .txt-serach .hot-sug ul:last-child").css("display","block");
        });*/
        /*取消搜索框焦点*/
        /*$(".searchs .search-txt .search-tab .txt-serach input").off().blur(function () {
            $(".searchs .search-txt .search-tab .txt-serach .hot-sug").css("display","none");
            $(".searchs .search-txt .search-tab .txt-serach .hot-sug ul").css("display","none");
        });*/
        /*内容复原*/
        $(document).off().click(function (e) {
            e.stopPropagation();
            $(".searchs .search-txt .search-tab ul.tabs").hasClass("active")?$(".searchs .search-txt .search-tab ul.tabs").removeClass("active"):null;
            $(".searchs .search-txt .search-tab i.icon").hasClass("active")?$(".searchs .search-txt .search-tab i.icon").removeClass("active"):null;
            $(".searchs .search-txt .search-tab .check").text()==="搜索"?null:$(".searchs .search-txt .search-tab .check").text("搜索");
        });
        $(function () {
            var width = 233;
            var ulNum = $(".content-person .content ul").length;
            var contentWidth = width * ulNum;

            $("content-person .box").width(contentWidth);

            $("content-person .nav span").click(function (e) {
                e.stopPropagation();
                $(this).addClass('active').siblings().removeClass('active');

                var clickNum = $(this).index();

                var moveLeft = clickNum * width * -1;

                $("content-person .box").animate({'left': moveLeft}, 500);
            })

        });

    }

    return window.SPA_RESOLVE_INIT = SPA_RESOLVE_INIT

})();