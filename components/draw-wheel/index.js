// components/draw-wheel/index.js
import Wheel123 from "./Wheel123";
import Bg from "./Wheel";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        size: {  //绘制图片宽度 px
            type: Number,
            value: 828
        },
        list: {
            type: Array,
            value: [
                {name: "电视机", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品2", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品3", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品4", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品5", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品6", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品6", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"},
                {name: "奖品6", img: "https://7a75-zuju-test-0gqgstfd96eabf28-1302575230.tcb.qcloud.la/banner.jpg?sign=910a626b60246ed8290ee2f5bf8110fc&t=1609320738"}
            ]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _pxBoxSize: 828,
    },


    /*
    * 周期函数
    * */
    lifetimes: {
        ready: function() {
            this.drawBg();
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        /*
        * 绘制背景
        * */
        drawBg: function () {
            const that = this;
            return new Promise(function (resolve, reject) {
                const query = wx.createSelectorQuery().in(that);
                query.select("#canvas")
                    .fields({ node: true, size: true })
                    .exec((res) => {
                        if (res && res[0]) {
                            const canvas = res[0].node;
                            const size = that.data.size;
                            const list = that.data.list;
                            new Bg({
                                canvas: canvas,
                                width: size,
                                height: size,
                                prizeList: list
                            });
                            resolve(canvas)
                        } else {
                            reject("获取#bgCanvas节点实例信息失败")
                        }
                    })
            })
        }
    }
})
