// pages/npmTest/index.js
import Poster from "../../miniprogram_npm/xcx-poster-canvas/Poster"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        let drawData = [{
            name: "block",
            left: 0,
            top: 0,
            width: 750,
            height: 1334,
            linearGradient: "0, 0, 0, 3334",
            gradientStops: [[0, "#57bd6a"], [1, "#57bdb5"]]
        }, {
            name: "image",
            src: "/images/banner1.jpg",
            top: 0,
            left: 0,
            width: 750,
            height: 750,
            mode: "aspectFill",
            shadowColor: "rgba(10, 137, 33, 0.5)",
            shadowOffsetY: 10,
            shadowOffsetX: 10,
            shadowBlur: 20
        }, {
            name: "block",
            left: 0,
            top: 690,
            width: 750,
            height: 500,
            borderRadius : 60,
            // borderWidth: 2,
            // borderColor: "#fff",
            linearGradient: "0, 0, 0, 500",
            gradientStops: [[0, "#fff"], [1, "rgba(255, 255, 255, 0.95)"]],
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowOffsetY: -20,
            shadowBlur: 40
        }, {
            name: "text",
            top: 720,
            left: 0,
            text: "【寻丢还拾】",
            fontColor: "#57bd6a",
            fontSize: 40,
            fontWeight: "bold",
            lineHeight: 60,
            borderWidth: 5,
            borderColor: "#fff",
            textAlign: "center"
        }, {
            name: "text",
            left: 40,
            top: 810,
            text: "【寻丢还拾】小程序意在服务广大热心朋友；通过【寻丢还拾】小程序发布丢物信息或者拾物信息；为寻丢、还拾者提供方便",
            width: 750 - 80,
            fontColor: "#252525",
            fontSize: 30,
            lineHeight: 40,
            textAlign: "center",
        }, {
            name: "text",
            left: 0,
            top: 40,
            text: "联系方式: 13770962386",
            fontColor: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            lineHeight: 32,
            textAlign: "center",
            borderWidth: 10,
            borderColor: "#57bd6a",
            topFollow: true
        }, {
            name: "block",
            left: 0,
            bottom: -60,
            width: 750,
            height: 300,
            backgroundColor: "#fff",
            linearGradient: "0, 0, 0, 1000",
            gradientStops: [[0, "#57bd6a"], [1, "#57bdb5"]],
            borderRadius: 60,
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowOffsetY: -20,
            shadowBlur: 40
        }, {
            name: "text",
            left: 30,
            bottom: 165,
            text: "寻丢还拾、善小为之",
            fontColor: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            lineHeight: 32,
            textAlign: "left",
        }, {
            name: "text",
            left: 30,
            bottom: 120,
            width: 750 - 60 - 200,
            text: "寻物启事、拾物认领；来【寻丢还拾】小程序",
            fontColor: "#fff",
            fontSize: 26,
            lineHeight: 32,
            textAlign: "left",
        }, {
            name: "image",
            src: "/images/xcx.jpg",
            right: 30,
            bottom: 30,
            width: 150,
            height: 150,
            mode: "aspectFill",
            borderWidth: 10,
            borderColor: "#fff",
            borderRadius: 200,
        }]
        Poster.create(drawData).then(function (res) {
            that.setData({url: res})
            console.log("绘制成功")
            console.log(res)
        }).catch(function (err) {
            console.log(err)
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

    }
})