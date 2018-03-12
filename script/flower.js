//飘玫瑰花
function snowflake() {
    var snowflakeUrl = [
        'img/f1.png',
        'img/f2.png',
        'img/f3.png',
        'img/f4.png',
        'img/f5.png',
        'img/f6.png'
    ];
    //花容器
    var $flakeContainer = $("#snowflake");

    //随机六张图中得到其中一张
    function getImagesName() {
        return snowflakeUrl[Math.floor(Math.random()*6)];
    }
    //创建一个花元素
    function createSnowBox() {
        var url = getImagesName();

        return $('<div class="snowbox"></div>')
            .css('background-image','url(' + url + ')')
            .addClass('snowRoll');
    }
    //开始飘花
    setInterval(function () {
        //运动轨迹
        var startPositionLeft = Math.random()*visualWidth - 100,
            startOpacity = 1,
            endPostionTop = visualHeight - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration = visualHeight * 10 + Math.random()*5000;
        //随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        //创建一个花元素
        var $flake = createSnowBox();

        //设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity: randomStart
        });
        //加入到容器
        $flake.appendTo($flakeContainer);
        //开始执行动画
        $flake.transition({
            top: endPostionTop,
            left: endPositionLeft,
            opacity: 0.7
        },duration,'ease-out',function () {
            $(this).remove();
        })
    },500);
}