$(function () {

    var boy = new BoyWalk();
    //第二个页面的动作
    function goToShop() {
        $(".bird").addClass('birdFly');
        var def = $.Deferred();
        boy.walkTo(5000, 0.5)
            .then(function() {
                // 暂停走路
                boy.stopWalk();
                // 开门
                return openDoor();
            })
            .then(function() {
                // 开灯
                lamp.bright();
                // 进商店
                return boy.toShop(2000);
            }).then(function(){
            // 取花
            return boy.talkFlower();
        }).then(function() {
            // 出商店
            return boy.outShop(2000);
        }).then(function () {
            lamp.dark();
            def.resolve();
            return closeDoor();
        });
        return def;
    }

//第三个页面的动作
    function upToBridge() {
        boy.walkTo(5000,0.15).then(function () {
            return boy.walkTo(2000,0.25,(bridgeY - girl.getHeight())/visualHeight);
        })
            .then(function () {
                // 实际走路的比例
                var proportionX = (girl.getOffset().left - parseInt(boy.getWidth()) + girl.getWidth()/5)/visualWidth;
                return boy.walkTo(2000, proportionX);
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


    setTimeout(function () {
        swip.music();
        $("#sun").addClass('rotation');
        $(".cloud1").addClass('cloud1Anim');
        $(".cloud2").addClass('cloud2Anim');
        boy.walkTo(4000,0.5).then(function () {
            swip.scrollTo(visualWidth, 5000);
            goToShop().then(function () {
                swip.scrollTo(visualWidth * 2, 5000);
                upToBridge();
            });
        });
    },2000);
});