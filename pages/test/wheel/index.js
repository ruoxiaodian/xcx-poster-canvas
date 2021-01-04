// pages/test/wheel/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        start: { //开始
            type: Boolean,
            value: false
        },
        prizeInx: { //中奖索引
            type: Number,
            value: -1
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
        },
        roundNum: {  //圈数
            type: Number,
            value: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _speed: 10,
        _acceleration: 1.2
    },

    /*
    * 周期
    * */
    lifetimes: {
        attached: function () {
            this.init();
        }
    },

    /*
    * 监听
    * */
    observers: {
        "prizeInx": function (val) {
            if (val && val >= 0) {
                this.setData({_acceleration: 0.95});
            }
        },
        "speed": function (val) {
            this.data._speed = val || 0
        },
        "acceleration": function (val) {
            this.data._acceleration = val || 0
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
            const speed = this.data._speed;
            const maxSpeed = this.data.maxSpeed;
            if (this._isStart) { //如果是开始 则停止
                return false
            } else {
                this._isStart = true;
                this.setData({_acceleration: this.data.acceleration});
                this._move(speed, maxSpeed);
            }
        },

        /*
        * 旋转
        * */
        _move: function (reg, maxSpeed) {
            const that = this;
            const acceleration = this.data._acceleration;
            const speed = this.data.speed;
            const roundNum = this.data.roundNum;
            const Animation = wx.createAnimation({
                transformOrigin: "50% 50%"
            });
            that._timeOut = setTimeout(function () {
                Animation.rotate(reg).step();
                if (acceleration > 1) { //加速
                    if (reg * acceleration - reg > maxSpeed) {
                        reg += maxSpeed;
                    } else {
                        reg = parseInt(reg * acceleration);
                    }
                } else { //减速
                    if (parseInt(reg / 360) >= roundNum) {
                        if (maxSpeed * acceleration <= reg) {
                            let stopReg = that._stop(reg);
                            if (stopReg) {
                                Animation.rotate(stopReg).step();
                                that.setData({animation: Animation});
                                clearTimeout(that._timeOut);
                                return false
                            } else {
                                reg += speed;
                            }
                        } else {
                            maxSpeed *= speed;
                            reg += maxSpeed;
                        }
                    } else {
                        reg += maxSpeed;
                    }
                }
                that.setData({animation: Animation});
                that.data._speed = reg;
                that._move(reg, maxSpeed)
            }, 200)
        },

        _stop: function (deg) {
            const speed = this.data.speed;
            const length = this.data.length;
            const prizeInx = this.data.prizeInx;
            const single = 360 / length; //每个扇区的占比
            let current = deg % 360;
            let stopDeg = prizeInx * single;
            let differ = Math.abs(360 - current - stopDeg);
            if (differ < speed) {
                delete this._isStart;
                return deg + differ
            }
            return false
        }
    }
})
