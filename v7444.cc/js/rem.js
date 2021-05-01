$(window).resize(function (){// 绑定到窗口缩放的事件
    init();
});
//页面刚刷新时调用
init()
function  init() {
    var whdef = 100 / 1920;
    var wH = window.innerHeight;// 当前窗口的高度
    var wW = window.innerWidth;// 当前窗口的宽度
    var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    $('html').css('font-size', rem + "px");
}