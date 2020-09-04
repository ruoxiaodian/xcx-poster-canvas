//index.js
import Poster from "../../components/poster/Poster"
//获取应用实例
Page({
    data: {

    },
    bindCreatePoster: function () {
        const that = this;
        let drawData = [{
            name: "block",
            left: 0,
            top: 0,
            width: 750,
            height: 1334,
            backgroundColor: "#57bd6a",
            linearGradient: "0, 0, 0, 1334",
            gradientStops: [[0, "#57bd6a"], [0.5, "#57bd6a"], [1, "#57bdb5"]]
        }, {
            name: "text",
            left: 0,
            top: 0,
            text: "寻物启事",
            fontColor: "#57bd6a",
            fontSize: 40,
            fontWeight: "bold",
            lineHeight: 120,
            borderWidth: 10,
            borderColor: "#fff",
            textAlign: "center"
        }, {
            name: "image",
            src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599144443472&di=78010d5f898a63c1066cec0607fb4798&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg",
            left: 30,
            width: 750 - 90,
            height: 750 - 90,
            mode: "aspectFill",
            borderWidth: 15,
            borderColor: "rgba(255, 255, 255, 0.1)",
            topFollow: true
        }, {
            name: "text",
            left: 30,
            top: 20,
            text: "适当好好安徽省都hi哦扫我好滴哦哈 我哦爱好死哦对吼以后爱好爱好死哦和哦哈我爱好死哦和迪欧好好",
            width: 750 - 60,
            fontColor: "#fff",
            fontSize: 28,
            lineHeight: 40,
            textAlign: "center",
            topFollow: true
        }, {
            name: "block",
            left: 100,
            top: 20,
            width: 750 - 200,
            height: 50,
            borderWidth: 2,
            borderColor: "#fff",
            borderRadius: 10,
            topFollow: true
        }, {
            name: "text",
            left: 0,
            top: -50,
            text: "联系方式: 13770962386",
            fontColor: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            lineHeight: 32,
            textAlign: "center",
            topFollow: true
        }, {
            name: "block",
            left: 0,
            bottom: -60,
            width: 750,
            height: 300,
            backgroundColor: "#fff",
            linearGradient: "0, 0, 0, 500",
            gradientStops: [[0, "#fff"], [1, "rgba(255, 255, 255, 0.95)"]],
            borderRadius: 60,
        }, {
            name: "text",
            left: 30,
            bottom: 165,
            text: "寻丢还拾、善小为之",
            fontColor: "#57bd6a",
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
            fontColor: "#999",
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
    }
})
