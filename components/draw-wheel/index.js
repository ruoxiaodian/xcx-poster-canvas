// components/draw-wheel/index.js
import Wheel from "./Wheel"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        size: {  //绘制图片宽度 rpx
            type: Number,
            value: 750
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _pxBoxSize: 750,
    },


    /*
    * 周期函数
    * */
    lifetimes: {
        attached: function() {
            const that = this;
            const query = wx.createSelectorQuery().in(that);
            query.select("#canvas")
                .fields({ node: true, size: true })
                .exec((res) => {
                    const canvas = res[0].node;
                    let pxBoxSize = that.data._pxBoxSize;
                    const drawInstance = new Wheel({
                        canvas,
                        width: pxBoxSize,
                        height: pxBoxSize,
                        colors: ["#fbf6d8", "#ffffff"]
                    });
                    drawInstance.init()
                })
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {

    }
})
