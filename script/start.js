//第二个页面的动作
function startRun() {
    $(".bird").addClass('birdFly');
    boy.walkTo(2000, 0.5)
        .then(function() {
            // 暂停走路
            boy.stopWalk();
        })
        .then(function() {
            // 开门
            return openDoor();
        })
        .then(function() {
            // 开灯
            lamp.bright();
        })
        .then(function() {
            // 进商店
            return boy.toShop(2000);
        }).then(function(){
        // 取花
        return boy.talkFlower();
    }).then(function() {
        // 出商店
        return boy.outShop(2000);
    }).then(function () {
        return closeDoor();
    }).then(function () {
        lamp.dark();
    })
}
$(function () {
    var boy = BoyWalk();
    var container = $("#content");
    var swipe = Swipe(container);
    var visualWidth = container.width();
    var visualHeight = container.height();
    // 页面滚动到指定的位置
    function scrollTo(time, proportionX) {
        var distX = container.width() * proportionX;
        swipe.scrollTo(distX, time);
    }

    // 用来临时调整页面
//        swipe.scrollTo(container.width()*2, 0);

    // 获取数据
    var getValue = function(className) {
        var $elem = $('' + className + '');
        // 走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };

    // 桥的Y轴
    var bridgeY = function() {
        var data = getValue('.c_background_middle');
        return data.top;
    }();
    ////////
    //小女孩 //
    ////////
    var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        getWidth: function() {
            return this.elem.width();
        },
        setOffset: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getOffset: function() {
            return this.elem.offset();
        },
        // 转身动作
        rotate: function() {
            this.elem.addClass('girl-rotate');
        }
    };
    // 修正小女孩位置
    girl.setOffset();
    boy.talkFlower();


    ///////////
    //loge动画 //
    ///////////
    var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on(animationEnd, function() {
                    $(this).addClass('logoshake').off();
                });
        }
    };

    $('button').click(function () {
//            boy.walkTo(2000,0.15).then(function () {
//                return boy.walkTo(1500,0.25,(bridgeY - girl.getHeight())/visualHeight);
//            }).then(function () {
//                // 实际走路的比例
//                var proportionX = (girl.getOffset().left - parseInt(boy.getWidth())/2)/visualWidth;
//                return boy.walkTo(1500, proportionX);
//            }).then(function () {
//                boy.resetOriginal();
//            }).then(function () {
//                setTimeout(function () {
//                    girl.rotate();
//                    boy.rotate(function () {
//                        logo.run();
//                    })
//                },1000);
//            }).then(function () {
//                snowflake();
//            })
        snowflake();
        logo.run();
    });
});