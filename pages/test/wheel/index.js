// pages/test/wheel/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        prizeInx: { //中奖索引
            type: Number,
            value: 1
        },
        length: { //奖品个数
            type: Number,
            value: 8
        },
        size: { //转盘尺寸
            type: Number,
            value: 0
        },
        speed: { //速度
            type: Number,
            value: 10   //deg
        },
        acceleration: { //加速度
            type: Number,
            value: 1.2
        },
        maxSpeed: {
            type: Number, //最大差值(转速)
            value: 35   //deg
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /*
    * 周期
    * */
    lifetimes: {
        attached: function () {
            this.init();
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {

        /*
        * 初始化
        * */
        init: function () {
            const systemInfo = wx.getSystemInfoSync();
            const size = this.data.size;
            const length = this.data.length;
            const single = 360 / length; //每个扇区的占比
            this.setData({maxSpeed: single * 2}); //最大转速
            !size ? this.setData({
                size: systemInfo.screenWidth - 30  //px
            }) : null
        },

        /*
        * 点击开始抽奖
        * */
        onStart: function () {
            const speed = this.data.speed;
            const maxSpeed = this.data.maxSpeed;
            if (this._isStart) {
                return false
            } else {
                this._isStart = true
                this._move(speed, maxSpeed)
            }
        },
        _move: function (speed, maxSpeed) {
            const that = this;
            const acceleration = this.data.acceleration;
            const _speed = this.data.speed;
            const Animation = wx.createAnimation({
                transformOrigin: "50% 50%"
            });
            that._timeOut = setTimeout(function () {
                Animation.rotate(speed).step();
                if (acceleration > 1) { //加速
                    if (speed * acceleration - speed > maxSpeed) {
                        speed += maxSpeed;
                    } else {
                        speed = parseInt(speed * acceleration);
                    }
                } else { //减速
                    if (maxSpeed * acceleration <= speed) {
                        let stopReg = that._stop(speed);
                        if (stopReg) {
                            Animation.rotate(stopReg).step();
                            that.setData({animation: Animation});
                            clearTimeout(that._timeOut);
                            return false
                        } else {
                            speed += _speed;
                        }
                    } else {
                        maxSpeed *= acceleration;
                        speed += maxSpeed;
                    }
                }
                that.setData({animation: Animation});
                that._move(speed, maxSpeed)
            }, 200)
        },

        /*
        * 抽奖结束
        * */
        onEnd: function () {

            if (this._isEnd) {
                return false
            } else {
                this._isEnd = true;
                this.setData({acceleration: 0.95});
            }
        },

        _stop: function (deg) {
            const speed = this.data.speed;
            const length = this.data.length;
            const prizeInx = this.data.prizeInx;
            const single = 360 / length; //每个扇区的占比
            let current = deg % 360;
            let stopDeg = prizeInx * single;
            if (current > stopDeg && current - stopDeg > speed) {
                return deg + (360 - current - stopDeg)
            }
            return false
        }
    }
})
