// components/wheel/index.js
import Bg from "./background";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        size: {
            type: Number,
            value: 0
        },
        list: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _canvasSize: 375,
        _origin: 300
    },

    /*
    * 数据监听
    * */
    observers: {
        "size": function (val) {
            if (val) {
                console.log(val)
            }
        },
        "list": function (val) {
            if (val && val.length > 0) {
                this.setData({
                    _list: val.map(function (item, index) {
                        console.log(index)
                        let baseAngle = 360 / val.length;
                        return {
                            name: item.name,
                            img: item.img,
                            rotate: baseAngle * index
                        }
                    })
                })
            }
        }
    },

    /*
    * 组件周期
    * */
    lifetimes: {
        attached: async function() {
            let size = this.data.size;
            size === 0 ? await this.setDefault() : null; //初始化
            await this.drawBg();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /*
        * 设置默认值
        * */
        setDefault: function () {
            const that = this
            return new Promise(function (resolve, reject) {
                const query = wx.createSelectorQuery().in(that);
                query.select(".wheel-component-container")
                    .fields({ node: true, size: true })
                    .exec((res) => {
                        if (res[0]) {
                            let {width} = res[0];
                            that.setData({size: width});
                            resolve(width)
                        } else {
                            reject("获取.wheel-component-container节点实例信息失败")
                        }
                    })
            })
        },

        /*
        * 绘制背景
        * */
        drawBg: function () {
            const that = this
            return new Promise(function (resolve, reject) {
                const query = wx.createSelectorQuery().in(that);
                query.select("#canvas")
                    .fields({ node: true, size: true })
                    .exec((res) => {
                        if (res[0]) {
                            const canvas = res[0].node;
                            const size = that.data.size;
                            let list = that.data.list;
                            new Bg({
                                canvas: canvas,
                                width: size,
                                height: size,
                                num: list.length
                            })
                            resolve(canvas);
                        } else {
                            reject("获取#canvas节点实例信息失败")
                        }
                    })
            })

        }
    }
})
