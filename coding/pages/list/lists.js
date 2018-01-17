// pages/list/lists.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../resources/2048.jpg",
      id: 0,
      latitude: 22.6,
      longitude: 114,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
    // controls: [{
    //   id: 1,
    //   iconPath: '../../resources/2048.jpg',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.navigateTo({
      url: '../2048/2048'
    });
  },
  controltap(e) {
    console.log("controltap!")
  },
  tap(e){
    console.log("点击地图事件")
    wx.getLocation({
      type: 'wgs84 ', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude +","+ longitude);
        
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.mapCtx = wx.createMapContext('map');
    // console.debug(this.mapCtx);
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.mapCtx.includePoints({
    //   padding: [10],
    //   points: [{
    //     latitude: 23.10229,
    //     longitude: 113.3345211,
    //   }, {
    //     latitude: 23.00229,
    //     longitude: 113.3345211,
    //   }]
    // })
    console.log(this.mapCtx);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})