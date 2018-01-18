// pages/2048/2048.js
var touchDotX = 0;//触摸时的原点X
var touchDotY = 0;//触摸时的远点Y
var touchMoveX = 0;
var touchMoveY = 0;
var timer = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
//************************************************************************** */
var locations = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
var isStart = false;//是否开始
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"",
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled1: false,
    plain: false,
    loading: false
  },
  default:function(e){
    var key = type + 'Size'
    var changedData = {}
    changedData[key] =
      this.data[key] === 'default' ? 'mini' : 'default'
    this.setData(changedData)
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
    var that = this;
    // console.log("touchMoveX:" + touchMoveX + " touchDotX:" + touchDotX + " diff:" + (touchMoveX - touchDotX));
    // console.log("touchMoveY:" + touchMoveY + " touchDotY:" + touchDotY + " diff:" + (touchMoveY - touchDotY));
    // 向左滑动  
    var rat = Math.abs((touchMoveY - touchDotY) / (touchMoveX - touchDotX));
    console.log(rat);
    if (rat > 1 && ((touchMoveY - touchDotY) > 0) && time < 10) {
      console.log("下");
      for (var i = 0; i < 4; i++) {
        // 判断每一行
        var row = [locations[i + 12], locations[i + 8], locations[i + 4],
        locations[i]];
        configurationD(i, row);
      }
      console.log(locations);
      locations[createLocation()] = createFixedNum();
      console.log(locations);
    }
    if (rat > 1 && ((touchMoveY - touchDotY) < 0) && time < 10) {
      console.log("上");
      for (var i = 0; i < 4; i++) {
        var row = [locations[i + 0], locations[i + 4], locations[i + 8],
        locations[i + 12]];
        configurationU(i, row);
      }
      console.log(locations);
      locations[createLocation()] = createFixedNum();
      console.log(locations);
    }
    if ((!(rat > 1)) && ((touchMoveX - touchDotX) < 0) && time < 10) {
      console.log("左");
      for (var i = 0; i < 4; i++) {
        // 判断每一行
        var row = [locations[i * 4], locations[i * 4 + 1],
        locations[i * 4 + 2], locations[i * 4 + 3]];
        configurationL(i, row);
      }
      console.log(locations);
      locations[createLocation()] = createFixedNum();
      console.log(locations);
    }
    if ((!(rat > 1)) && ((touchMoveX - touchDotX) > 0) && time < 10) {
      console.log("右");
      for (var i = 0; i < 4; i++) {
        // 判断每一行
        var row = [locations[i * 4 + 3], locations[i * 4 + 2],
        locations[i * 4 + 1], locations[i * 4]];
        configurationR(i, row);
      }
      console.log(locations);
      locations[createLocation()] = createFixedNum();
      console.log(locations);
    }
    var param = {}
    for (var i = 0; i < locations.length; i++) {
      if (locations[i] == 0) { 
        param['box_data' + keys[i]] = '' 
      }else{
        param['box_data' + keys[i]] = locations[i]
      }
      param['b_color' + keys[i]] = colors[Math.sqrt(locations[i])]
    } 
    param['score'] = score
    that.setData(param)

    if (locations.indexOf(0) == -1) {// 如果数组中不包含0
      // 判断相邻的数是否为相等
      // alert("注意了哦~");
      wx.vibrateLong({success:function(){
        wx.showModal({
          title:'友情提示',
          content:'嘎嘎，快要死了😭',
          showCancel:true,
          cancelText:'取消',
          complete:function(){
            if (isEndX() && isEndY()) {
              clearTimeout(t);
              wx.showToast({title:'还等什么呢，重新开始吧！'})
            }
          }
        })
      }})
    }
     clearInterval(interval); // 清除setInterval 
     time = 0;
  },
  start:function(){
    var that= this
    t = setInterval(function(){
      that.setData({'timer': ++timer+'s'})
    }, 1000);
    score = 0;
    max = 0;
    time = 0;
    locations[createLocation()] = createFixedNum();
    locations[createLocation()] = createFixedNum();
    var param = {} 
    for(var i=0;i<locations.length;i++){
      if (locations[i] == 0) {
        param['box_data' + keys[i]] = ''
      } else {
        param['box_data' + keys[i]] = locations[i]
      }
      param['b_color' + keys[i]] = colors[Math.sqrt(locations[i])]
    }
    param['disabled1'] = true
    that.setData(param)
    console.log("开始:");
    console.log(locations);
  },
  reset:function(){
    score = 0
    time = 0
    var that = this;
    locations = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var param = {}
    for (var i = 0; i < locations.length; i++) {
      if (locations[i] == 0) {
        param['box_data' + keys[i]] = ''
      } else {
        param['box_data' + keys[i]] = locations[i]
      }
      param['b_color' + keys[i]] = colors[Math.sqrt(locations[i])]
    }
    param['disabled1'] = false
    param['score'] = score
    param['timer'] = 0
    that.setData(param)
    clearInterval(t)
  },
  keys:function(e){
    this.setData({
      data: this.data.count + 1
    })
  }
})
function configurationD(i, r) {
  makeArray(r);

  for (var j = 0; j < 4; j++) {
    locations[4 * (3 - j) + i] = r[j];
  }
}

function configurationR(i, r) {
  // 向右
  makeArray(r);

  for (var j = 0; j < 4; j++) {
    locations[3 + 4 * i - j] = r[j];
  }
}

function configurationU(i, r) {
  makeArray(r);

  for (var j = 0; j < 4; j++) {
    locations[4 * j + i] = r[j];
  }
}

function configurationL(i, r) {
  makeArray(r);

  for (var j = 0; j < 4; j++) {
    locations[4 * i + j] = r[j];
  }
}

function makeArray(r) {
  if (!isZero(r)) {
    // 把数组中是0往后移动
    for (var m = 0; m < 4; m++) {
      for (var n = 0; n < 3; n++) {
        if (r[n] == 0) {
          r[n] = r[n + 1];
          r[n + 1] = 0;
        }
      }
    }
  }

  for (var m = 0; m < 3; m++) {
    if (r[m] == r[m + 1]) {
      var k = m;
      r[k] += r[k + 1];
      score += r[k];
      while (++k < 3) {
        r[k] = r[k + 1];
      }
      r[3] = 0;
    }
  }

  return r;
}

function isEndX() {
  // 判断横向的数组
  // 如果相邻位置的数不相同,就结束
  var f = false;
  var w = new Array();
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 4; i++) {
      w[i] = locations[4 * j + i];
    }
    // alert(w);
    f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3]);// 如果为真,表示相邻的两个数不相等
    if (!f) {
      break;
    }
  }

  return f;
}

function isEndY() {
  // 判断纵向的数组
  // 如果相邻位置的数不相同,就结束
  var f = false;
  var w = new Array();
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < 4; i++) {
      w[i] = locations[4 * i + j];
    }
    // alert(w);
    f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3]);// 如果为真,表示相邻的两个数不相等
    if (!f) {
      break;
    }
  }

  return f;
}

// 随机生成两个数
function createFixedNum() {
  // 生成2/4;
  // 生成2的概率是0.8
  return Math.random() < 0.8 ? 2 : 4;
}
// 生成位置
function createLocation() {
  // 在空位置中随机生成
  var num = Math.floor(Math.random() * 16);
  // 如果该位置有值,就返回重新生成
  while (locations[num] != 0) {
    num = Math.floor(Math.random() * 16);
  }
  return num;
}

function isZero(m) {
  return m[0] == 0 && m[1] == 0 && m[2] == 0 && m[3] == 0;
}