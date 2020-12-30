/*大转盘*/
export default class Wheel {
    //constructor是一个构造方法，用来接收参数
    //num 扇形区域分几块
    constructor(data = {}) {
        const systemInfo = wx.getSystemInfoSync();
        const pixelRatio = systemInfo.pixelRatio;
        const {
            canvas = null, //canvas实例
            width = 750, //宽度
            height = 750, //高度
            colors = ["#fbf6d8", "#ffffff"], //颜色设置
            list = []
        } = data;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.list = list;
        this.num = list.length;
        this.colors = colors;
        canvas.width = parseInt(width * pixelRatio);  //画布内容宽度
        canvas.height = parseInt(height * pixelRatio);  //画布内容高度
        this.context = canvas.getContext("2d");
        this._timeInterval = null;
        this.init ()
    }

    /*初始化*/
    init () {
        const that = this;
        const context = this.context;
        const width = this.canvas.width;
        context.translate(width / 2, width / 2);
        let lightChange = false;
        clearInterval(that._timeInterval);
        that._timeInterval = setInterval(function () {
            lightChange = !lightChange;
            context.clearRect(0, 0, width, width);
            that._drawBg();
            that._drawLights(8, lightChange);
            that._drawSectors();
            that._drawButton();
            that._drawPrizes();
        }, 1000)


    }

    /*
    * 绘制背景
    * */
    _drawBg () {
        const context = this.context;
        const width = this.canvas.width;
        context.beginPath(); //开始绘制
        context.fillStyle = "#ffb90d";
        context.arc(0, 0, width / 2, 0, 2 * Math.PI);
        context.fill();
        context.save();
    }

    /*
    * 绘制背景霓虹灯
    * */
    _drawLights (radius = 8, isChange = true) {
        const context = this.context;
        const width = this.canvas.width;
        const num = 24;
        let colors = ["#ffda51", "#ffffff"];
        colors = isChange ? colors : colors.reverse();
        let padding = 30;
        let baseAngle = Math.PI * 2 / num;
        let r = width / 2 - (padding - radius * 2);
        for(let index = 0; index < num; index ++) {
            let angle = index * baseAngle;
            let x = r * Math.cos(angle);
            let y = r * Math.sin(angle);
            context.beginPath();//开始绘制
            context.fillStyle = index % 2 === 0 ? colors[0] : colors[1];
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();//填充颜色
            context.save();
        }
    }

    /*
    * 划分扇区
    * */
    _drawSectors (padding = 30) {
        const context = this.context;
        const width = this.canvas.width;
        const num = this.num;
        const colors = this.colors;
        let baseAngle = Math.PI * 2 / num;
        let colorStart = 0;
        for(let index = 0; index < num; index ++) {
            let angle = index * baseAngle;
            context.beginPath();//开始绘制
            context.fillStyle = colors[colorStart];//设置每个扇形区域的颜色
            colorStart = (colorStart === colors.length - 1) ? 0 : (colorStart + 1);
            context.arc(0, 0, width / 2 - padding, angle, angle + baseAngle, false);
            context.arc(0, 0, width / num, angle + baseAngle, angle, true);
            context.fill();//填充颜色
            context.save();//保存当前环境的状态
        }
    }

    /*
    * 绘制按钮
    * */
    _drawButton () {
        const context = this.context;
        const width = this.canvas.width;
        const num = this.num;
        let r = width / num - 10;
        context.beginPath();
        context.fillStyle = "#cb1224";
        context.shadowColor = "rgba(0, 0, 0, 0.5)";
        context.shadowBlur = 10;
        context.arc(0, 0, r, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.save();
        context.restore();

        context.restore();
        context.beginPath();
        context.fillStyle = "#e42837";
        context.arc(0, 0, r - 2, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.save();

        context.beginPath();
        let grd = context.createRadialGradient(0, 0, 0, 0, 0, r - 15);
        grd.addColorStop(0.0, "#e42837");
        grd.addColorStop(1.0, "#cb1224");
        context.fillStyle = grd;
        context.arc(0, 0, r - 15, 0, Math.PI * 2);
        context.fill();
        context.closePath();
        context.save();
    }

    /*
    * 绘制奖品以及奖品名称
    * */
    async _drawPrizes (padding = 30) {
        const context = this.context;
        const width = this.canvas.width;
        const list = this.list;
        const num = this.num;
        let baseAngle = Math.PI * 2 / num;
        for(let index = 0; index < num; index ++) {
            let angle = index * baseAngle;
            let imgSource = await this._getImageInstance(list[index].img);
            context.rotate(angle);
            context.drawImage(imgSource, 0, 0, 100, 100)
            context.save();//保存当前环境的状态
            context.restore();
        }
    }


    /*
    * 获取image对象
    * */
    _getImageInstance (src) {
        const that = this;
        const canvas = that.canvas;
        return new Promise(function (resolve, reject) {
            if (!src) {reject(new Error("图片路径不能为空"))}
            if (src.indexOf("https") !== 0) { //本地图片
                let image = canvas.createImage();
                image.src = src;
                image.onload = function () {
                    resolve(image)
                }
                image.onerror = function (err) {
                    reject(err)
                }
            } else {
                wx.getImageInfo({
                    src: src,
                    success: function (res) {
                        let image = canvas.createImage();
                        image.src = res.path;
                        image.onload = function () {
                            resolve(image)
                        }
                        image.onerror = function (err) {
                            reject(err)
                        }
                    },
                    fail: function (err) {
                        reject(err)
                    }
                })
            }
        })
    }

}