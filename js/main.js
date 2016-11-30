/**
 * Created by Administrator on 2016/11/26.
 */
$(document).ready(function () {
    var sum =0;
    function reset() {
        var mCurrentWidth = $(window).width();
        var isSmallScreen = mCurrentWidth<768;
        /*直接子代选择器的好处是可以 没有误选的情况 但是一定把所有的自带一一列出  中间不能缺少一个 不能直接从爷爷到孙子*/
        var a =$("#main_ad>#carousel-example-generic>.carousel-inner>.item");
        $("#main_ad>#carousel-example-generic>.carousel-inner>.item").each(function (i,items) {
            var itemdata = $(items);
            var imgSrc = isSmallScreen? itemdata.data("image-xs"):itemdata.data("image-lg");
            console.log(imgSrc);
            if(!isSmallScreen){
                itemdata.css('backgroundImage', 'url("' + imgSrc + '")');
                itemdata.empty();
            }else{
                itemdata.html('<img src="' + imgSrc + '" alt="" />');
            }
            setSpecialTab();
        });

    }
    $(window).on("resize",reset).trigger('resize');
    function setSpecialTab() {
        $( ".nav-tabs-fanstyle > li").each(function (i,item) {
            sum +=item.clientWidth;
        });
        if(($(window).width()) < sum){
            $(".nav-tabs-fanstyle").css('width', sum);
            $(".nav-tabs-fanstyle").parent().css('overflow-x', 'scroll');
        }
    }
    $("#news .nav-pills a").on("click",function () {
         var title =$(this).data("title");
        $("#news .news-title span").text(title);
    });
    $("#news .nav-pills a").first().trigger("click");


    var $newTitle = $('.news-title');
    $('#news .nav-pills a').on('click', function() {
        // 获取当前点击元素
        var $this = $(this);
        // 获取对应的title值
        var title = $this.data('title');
        // 将title设置到相应的位置
        $newTitle.text(title);
    });

    // 1. 获取手指在轮播图元素上的一个滑动方向（左右）



    // 获取界面上的轮播图容器
    var $carousels = $('.carousel');
    var startX, endX;
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart', function(e) {
        // 手指触摸开始时记录一下手指所在的坐标X
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });

    $carousels.on('touchmove', function(e) {
        // 变量重复赋值
        endX = e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
    $carousels.on('touchend', function(e) {
        console.log(e);
        // 结束触摸一瞬间记录最后的手指所在坐标X
        // 比大小
        // console.log(endX);
        // 控制精度
        // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            // 有方向变化
            // console.log(startX > endX ? '←' : '→');
            // 2. 根据获得到的方向选择上一张或者下一张
            //     - $('a').click();
            //     - 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel-methods
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });

});