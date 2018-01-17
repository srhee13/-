// pages/2048/2048.js
var touchDotX = 0;//触摸时的原点X
var touchDotY = 0;//触摸时的远点Y
var touchMoveX = 0;
var touchMoveY = 0;
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
//************************************************************************** */
var locations;
var keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
  "d", "e", "f"];
// 不同的数字对于不同的颜色,
// colors是颜色的数组
var colors = ["#FFF", "PINK", "GRAY", "#ABCDEF", "#0FF0FF", "#FF0", "#CDF0AB",
  "#FEDCBA", "#F0F", "#BBBBBB", "#00F", "#00FF00"];

var score;// 总分数
var max;// 最大数
var time;// 计时
var t;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:""
  },
  touchStart: function (e) {
    touchDotX = e.touches[0].pageX; // 获取触摸时的原点X
    touchDotY = e.touches[0].pageY;// 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  }, 
  //触摸移动事件
  touchMove: function (e) {
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;
   }, 
  // 触摸结束事件 
  touchEnd: function (e) {
    // console.log("touchMoveX:" + touchMoveX + " touchDotX:" + touchDotX + " diff:" + (touchMoveX - touchDotX));
    // console.log("touchMoveY:" + touchMoveY + " touchDotY:" + touchDotY + " diff:" + (touchMoveY - touchDotY));
    // 向左滑动  
    var rat = Math.abs((touchMoveY - touchDotY) / (touchMoveX - touchDotX));
    console.log(rat);
    if (rat > 1 && ((touchMoveY - touchDotY) > 0) && time < 10) {
      console.log("下");
    }
    if (rat > 1 && ((touchMoveY - touchDotY) < 0) && time < 10) {
      console.log("上");
    }
    if ((!(rat > 1)) && ((touchMoveX - touchDotX) < 0) && time < 10) {
      console.log("左");
    }
    if ((!(rat > 1)) && ((touchMoveX - touchDotX) > 0) && time < 10) {
      console.log("右");
    }
    
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  init:function(){
    init();
  },
  reInit:function(){
    init();
  },
  keys:function(e){
    this.setData({
      data: this.data.count + 1
    })
  }
})
function hello(){
  console.log("say hello")
}