// components/poster/index.js
import Draw from "Draw.js"
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        width: {  //绘制图片宽度 rpx
            type: Number,
            value: 750
        },
        height: {  //绘制图片高度 rpx
            type: Number,
            value: 1334
        },
        pixelRatio: { //精度 默认使用 systemInfo.pixelRatio
            type: Number,
            value: 0
        },
        showLoading: { //是否显示loading效果
            type: Boolean,
            value: true
        },
    },

    /**
     * 组件的初始数据
     * 宽高默认值必须给 不然在ios端会绘制空白
     */
    data: {
        _pxWidth: 320,
        _pxHeight: 569
    },
    _drawData: [],

    /*
    * 监听data数据变动
    * */
    observers: {

    },

    /*
    * 生命周期方法
    * */
    lifetimes: {
        attached: function() {
            const that = this;
            const query = wx.createSelectorQuery().in(this);
            query.select('#myCanvas')
                .fields({ node: true, size: true })
                .exec((res) => {
                    const canvas = res[0].node;
                    that.init(canvas)
                })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {

        /*
        * 初始化
        * */
        init: function (canvas) {
            const width = this.data.width;
            const height = this.data.height;
            const pixelRatio = this.data.pixelRatio;
            const drawInstance = new Draw(canvas, width, height, pixelRatio);
            this.setData({
                _pxWidth: parseInt(width * drawInstance.factor),
                _pxHeight: parseInt(height * drawInstance.factor)
            })
            this._drawInstance = drawInstance;

        },

        /*
        * 创建海报
        * */
        create: async function (data) {
            const instance = this._drawInstance;
            const showLoading = this.data.showLoading;
            let singleRes = {};  //保存每次绘制返回尺寸
            showLoading ? wx.showLoading({title: "海报生成中...", mask: true}): null;
            instance.clear(); //绘制前清空画布
            for (let i = 0; i < data.length; i ++) {
                let single = data[i];
                if (single.topFollow) {
                    single.top = (singleRes.top || 0) + (single.top || 0)
                }
                if (single.leftFollow) {
                    single.left = (singleRes.left || 0) + (single.left || 0)
                }
                singleRes = await instance.draw(single);
            }
            let tempFilePath = await this._canvasToTempFilePath();
            showLoading ? wx.hideLoading() : null;
            return tempFilePath
        },

        /*
        * 生成图片临时文件
        * */
        _canvasToTempFilePath: function () {
            const that = this;
            const instance = this._drawInstance;
            return new Promise(function (resolve, reject) {
                clearTimeout(that._timeOut);
                that._timeOut = setTimeout(function () {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: that.data._pxWidth,
                        height: that.data._pxHeight,
                        destWidth: instance.canvas.width,
                        destHeight: instance.canvas.height,
                        canvas: instance.canvas,
                        success: function (res) {
                            resolve(res.tempFilePath);
                        },
                        fail: function (err) {
                            reject(err)
                        }
                    }, that)
                }, 500)
            })
        }
    }
})
