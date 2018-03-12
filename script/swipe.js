function Swipe(container) {
    var count = 0;
    var $audio = $("#audio");
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

// 音乐配置
    var audioConfig = [
        'music/sweet.mp3',
        'http://campus.51job.com/m/erdos/music/AKM-AK-152-04_2.mp3',
        'music/sweet.mp3'
    ];
    swipe.music = function () {
        $audio.attr('src',audioConfig[count = count === audioConfig.length ? 0 : count]);
        count ++ ;
        return false;
    };
    //监控完成与移动
    swipe.scrollTo = function (x,speed) {
        //执行动画移动
        element.animate({
            'left': -x+'px'
        }, speed,function () {
            swipe.music();
        });
        return false;
    };
    return swipe;
}