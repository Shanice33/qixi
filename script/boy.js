//小孩走路
function BoyWalk() {
    var instanceX;
    var container = $("#content");
    var visualWidth = container.width();
    var visualHeigth = container.height();

    var swip = Swipe(container);
// 获取走路的路线数据
    var getValue = function (className) {
        var $elem = $('.' + className);
        // 走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    }
// 路的Y轴坐标
    var pathY = function () {
        var data = getValue('a_background_middle');
        return data.top + data.height / 2;
    }();
//设置男孩走路的位置
    var $boy = $("#boy");
    var boyHeight = $boy.height();
// 修正小男孩的正确位置,路的中间位置减去小孩的高度，25是一个修正值
    $boy.css({
        top: pathY - boyHeight + 25
    });

//===================动画处理============================ //
//暂停走路
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

//恢复走路
    function restoreWalk() {
        $boy.removeClass('pauseWalk');
    }

//css3的动作变化
    function slowWalk() {
        $boy.addClass('slowWalk');
    }

//用transition做运动
    function startRun(options, runTime) {
        var dfdplay = $.Deferred();
        //恢复走路
        restoreWalk();
        //运动属性
        $boy.transition(
            options,
            runTime,
            'linear',
            function () {
                dfdplay.resolve(); // 动画完成
            }
        );
        return dfdplay;
    }

//开始走路
    function walkRun(time, dist, disY) {
        time = time || 3000;
        //脚动作
        slowWalk();
        //开始走路
        var d1 = startRun({
            'left': dist,
            'top': disY ? disY : undefined
        }, time);
        return d1;
    }
//走进商店
    function walkToShop(runTime) {
        var defer = $.Deferred();
        var doorObj = $(".door");
        // 门的坐标
        var offsetDoor = doorObj.offset();
        var doorOffsetLeft = offsetDoor.left;
        // 小孩当前的坐标
        var offsetBoy = $boy.offset();
        var boyOffetLeft = offsetBoy.left;
        // 当前需要移动的坐标
        instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + $boy.width() / 2);
        //开始走进去
        var walkPlay = startRun({
            transform: 'translateX('+instanceX+'px),scale(0.3,0.3)',
            opacity: 0.1
        },2000);
        // 走路完毕
        walkPlay.done(function() {
            $boy.css({
                opacity: 0
            });
            defer.resolve();
        });
        return defer;
    }
//取花
    function talkFlower() {
        // 增加延时等待效果
        var defer = $.Deferred();
        setTimeout(function() {
            // 取花
            $boy.addClass('slowFlowerWalk');
            defer.resolve();
        }, 1000);
        return defer;
    }
    // 走出店
    function walkOutShop(runTime) {
        var defer = $.Deferred();
        restoreWalk();
        // 开始走路
        var walkPlay = startRun({
            transform: 'scale(1,1)',
            opacity: 1
        }, runTime)
        // 走路完毕
        walkPlay.done(function() {
            defer.resolve();
        });
        return defer;
    }

//计算需要移动的距离
    function calculateDist(direction, propotion) {
        return (direction === 'x' ? visualWidth : visualHeigth) * propotion;
    }
   return {
        //计算
       // 开始走路
       walkTo: function(time, proportionX, proportionY) {
           var distX = calculateDist('x', proportionX);
           var distY = calculateDist('y', proportionY);
           return walkRun(time, distX, distY);
       },
       // 走进商店
       toShop: function() {
           return walkToShop.apply(null, arguments);
       },
       // 走出商店
       outShop: function() {
           return walkOutShop.apply(null, arguments);
       },
       // 停止走路
       stopWalk: function() {
           pauseWalk();
       },
       // 获取男孩的宽度
       getWidth: function() {
           return $boy.width();
       },
       // 复位初始状态
       resetOriginal: function() {
           this.stopWalk();
           // 恢复图片
           $boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
       },
       // 取花
       talkFlower: function() {
           return talkFlower();
       },
       // 转身动作
       rotate: function(callback) {
           restoreWalk();
           $boy.addClass('boy-rotate');
           // 监听转身完毕
           if (callback) {
               $boy.on(animationEnd, function() {
                   callback();
                   $(this).off();
               })
           }
       }
   } 
}
