// pages/getphonenumber/getphonenumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionkey:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    wx.login({
      success: res => {
    //    console.log(res.code);
        var that = this;
        wx.request({
          // url: 'https://www.shsoften.cn/zitong/index.php/Api/GetPhoneNumber/index',
          url: 'https://www.shsoften.cn/zitong/index.php/Api/GetPhoneNumber/getsessionkey',

          data: {
 
            'code': res.code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (res) {
         //   console.log( res.data)
            that.setData({
              sessionkey: res.data
            });
           
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },
  getPhoneNumber: function (e) {
    var that=this;
   // console.log(e.detail.iv);
   // console.log(e.detail.encryptedData);
    wx.login({
      success: res => {
    //    console.log(res.code);
        wx.request({
          // url: 'https://www.shsoften.cn/zitong/index.php/Api/GetPhoneNumber/index',
          url: 'https://www.shsoften.cn/zitong/index.php/Api/GetPhoneNumber/getphone',

          data: {
            'encryptedData': (e.detail.encryptedData),
            'iv': (e.detail.iv),
            'sessionkey': that.data.sessionkey,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function (res) {
            console.log("++"+res.data)
            if (res.status == 1) {//我后台设置的返回值为1是正确
              //存入缓存即可
              console.log(res.phone)
              wx.setStorageSync('phone', res.phone);
            }
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  }
,
  getPhoneNumber1: function (e) {
  //  console.log(e.detail.errMsg)
  //  console.log(e.detail.iv)
  //  console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      // wx.showModal({
      //   title: '提示',
      //   showCancel: false,
      //   content: '同意授权',
      //   success: function (res) { }
      // })
    }
  } 
})