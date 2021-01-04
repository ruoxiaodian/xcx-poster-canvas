// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        size: 750 //rpx
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bindInput: function (e) {
        console.log(e)
        this.setData({prizeInx: e.detail.value})
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})