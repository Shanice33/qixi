var container = $("#content");
var visualWidth = container.width();
var visualHeight = container.height();
var swip = new Swipe(container);

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


///////////
// 灯动画 //
///////////
var lamp = {
    elem: $('.b_background'),
    bright: function() {
        this.elem.addClass('lamp-bright');
    },
    dark: function() {
        this.elem.removeClass('lamp-bright');
    }
};

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
