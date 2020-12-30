// components/draw-wheel/index.js
import Wheel from "./Wheel";
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
                {name: "xxx", img: "/images/test.jpg"},
                {name: "xxx", img: "/images/test.jpg"},
                {name: "xxx", img: "/images/test.jpg"},
                {name: "xxx", img: "/images/test.jpg"},
                {name: "xxx", img: "/images/test.jpg"},
                {name: "xxx", img: "/images/test.jpg"}
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
        attached: function() {
            this.draw();
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        /*
        * 绘制背景
        * */
        draw: function () {
            const that = this;
            const query = wx.createSelectorQuery().in(that);
            query.select("#canvas")
                .fields({ node: true, size: true })
                .exec((res) => {
                    const canvas = res[0].node;
                    const size = that.data.size;
                    const list = that.data.list;
                    new Wheel({
                        canvas: canvas,
                        width: size,
                        height: size,
                        colors: ["#fbf6d8", "#ffffff"],
                        list: list
                    });
                })
        }
    }
})
