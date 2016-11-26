/**
 * Created by Administrator on 2016/11/26.
 */
$(document).ready(function () {
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

        });

    }
    $(window).on("resize",reset).trigger('resize');
});