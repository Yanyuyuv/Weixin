// pages/SearchResult/SearchResult.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0未报名，1报名成功，2面试成功，3.....
    stuId: 0,
    direction: '',
    status: 0,
    lineActive: -1,
    moveY: 'translateY(0)',
    rightMsg: '审核中',
    failMsg: '未通过',
    passMsg: '已通过',
    fail: 0,
    // 个人信息弹窗
    show: false,
    //报名信息按钮移动信息
    move: '',
    //报名信息按钮缓动信息
    transition: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    this.setData({
      stuId: options.stuId,
      direction: options.direction
    })
    setTimeout(() => {
      this.requestStatus()


    }, 500)


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

  // 加载动画
  statusAnimation(status) {
    if (status == 0) {
      return
    }
    let movePercent = -15 - (status - 1) * 25;
    this.setData({
      lineActive: 1,
      moveY: 'translateY' + `(${movePercent}%)`
    })
    // console.log(this.data.moveY);
  },

  // 向服务器发送请求的函数
  async requestStatus() {
    let result = await request(`/getProgress/${this.data.stuId}`)
    // console.log(result)
    if (result.code == 200) {

      this.setData({
        status: result.data.change.status,
        fail: result.data.change.fail
      })
      this.statusAnimation(this.data.status);
      // console.log(this.data.status)
      // console.log(this.data.fail)
    } else {
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      })
    }

  },

  //右上角X按钮
  exitBtn() {
    // 跳转到首页
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  // 个人信息按钮(打开)
  infoBtn() {
    // console.log(1)
    this.setData({
      show: true,
      move: 'easeIn'
    })
  },
  //关闭个人信息
  onClose() {
    this.setData({
      show: false,
      move: 'easeOut'
    });
  },
})