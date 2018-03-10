function Swipe(container) {
    //获取第一个子节点
    var element = container.find(":first");
    //滑动对象
    var swipe = {};
    //li页面
    var slides = element.find(">");
    //获取容器尺寸
    var width = container.width();
    var height = container.height();
    //设置li页面容器ul的宽度
    element.css({
        width: (slides.length * width) + 'px',
        height: height + 'px'
    });
    //设置每一个页面li的宽度
    $.each(slides, function (index) {
        var slide = slides.eq(index);
        slide.css({
            width: width + 'px',
            height: height + 'px'
        });
    });
    //监控完成与移动
    swipe.scrollTo = function (x,speed) {
        //执行动画移动
        element.animate({
            'left': -x+'px'
        }, speed);
        return false;
    };
    return swipe;
}