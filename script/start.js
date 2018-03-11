$(function () {
    var boy = BoyWalk();
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
    };
// 桥的Y轴
    var bridgeY = function() {
        var data = getValue('c_background_middle');
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

///////////
//loge动画 //
///////////
    var logo = {
        elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on('animationend', function() {
                    $(this).addClass('logoshake').off();
                });
        }
    };

//第二个页面的动作
    function startRun() {
        $(".bird").addClass('birdFly');
        var def = $.Deferred();
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
            def.resolve();
        });
        return def;
    }

    // boy.talkFlower();
//第三个页面的动作
    function upToBridge() {
        boy.walkTo(2000,0.15).then(function () {
            return boy.walkTo(1500,0.25,(bridgeY - girl.getHeight())/visualHeight);
           })
            .then(function () {
               // 实际走路的比例
               var proportionX = (girl.getOffset().left - parseInt(boy.getWidth())/2)/visualWidth;
               return boy.walkTo(1500, proportionX);
           })
            .then(function () {
               boy.resetOriginal();
           })
            .then(function () {
               setTimeout(function () {
                   girl.rotate();
                   boy.rotate(function () {
                       logo.run();
                   })
               },1000);
           })
            .then(function () {
               snowflake();
           });
    }

    $('button').click(function () {
        $("#sun").addClass('rotation');
        $(".cloud1").addClass('cloud1Anim');
        $(".cloud2").addClass('cloud2Anim');
        boy.walkTo(3000,0.5).then(function () {
            swip.scrollTo(visualWidth, 3000);
            startRun().then(function () {
                swip.scrollTo(visualWidth * 2, 2000);
                upToBridge();
            });
        });
    });
});