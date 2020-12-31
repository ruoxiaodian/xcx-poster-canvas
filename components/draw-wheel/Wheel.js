/*大转盘*/
export default class Bg {
    //constructor是一个构造方法，用来接收参数
    //num 扇形区域分几块
    constructor(data = {}) {
        const systemInfo = wx.getSystemInfoSync();
        const pixelRatio = systemInfo.pixelRatio;
        const {
            canvas = null, //canvas实例
            prizeList = [], //奖品列表
            width = 750, //画布宽度
            height = 750, //画布高度
            bgColor = "#ffb90d", //背景色
            sectorsColor = ["#fbf6d8", "#ffffff"], //扇区颜色设置
            lightsColor = ["#ffda51", "#ffffff"], //霓虹灯颜色
            lightsNum = 24, //霓虹灯数量
        } = data;
        this.canvas = canvas;
        this.prizeList = prizeList;
        this.num = prizeList.length;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.sectorsColor = sectorsColor;
        this.lightsColor = lightsColor;
        this.lightsNum = lightsNum;
        canvas.width = parseInt(width * pixelRatio);  //画布内容宽度
        canvas.height = parseInt(height * pixelRatio);  //画布内容高度
        this.context = canvas.getContext("2d");
        this._timeInterval = null;
        this.init ()
    }

    /*初始化*/
    async init () {
        const that = this;
        const context = this.context;
        const width = this.canvas.width;
        await this._getImgSource();
        let lightChange = false;
        context.translate(width / 2, width / 2);
        clearInterval(that._timeInterval);
            lightChange = !lightChange;
            context.clearRect(0, 0, width, width);
            that._drawBg();
            that._drawLights(8, lightChange);
            that._drawSectors();
            that._drawPrize();

    }

    /*
    * 获取图片资源
    * */
    async _getImgSource () {
        let list = this.prizeList;
        for (let i = 0; i < list.length; i ++) {
            let source = await this._getImageInstance(list[i].img);
            this.prizeList[i].imgSource = source;
            console.log(source)
        }
    }

    /*
    * 绘制背景
    * */
    _drawBg () {
        const context = this.context;
        const width = this.canvas.width;
        const bgColor = this.bgColor;
        context.save();
        context.beginPath(); //开始绘制
        context.fillStyle = bgColor;
        context.arc(0, 0, width / 2, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }

    /*
    * 绘制背景霓虹灯
    * */
    _drawLights (radius = 8, isChange = true) {
        const context = this.context;
        const width = this.canvas.width;
        const lightsNum = this.lightsNum;
        let lightsColor = this.lightsColor;
        lightsColor = isChange ? lightsColor : lightsColor.reverse();
        let padding = 30;
        let baseAngle = Math.PI * 2 / lightsNum;
        let r = width / 2 - (padding - radius * 2);
        let startColorIndex = 0;
        for(let index = 0; index < lightsNum; index ++) {
            let angle = index * baseAngle;
            let x = r * Math.cos(angle);
            let y = r * Math.sin(angle);
            context.save();
            context.beginPath();//开始绘制
            if (lightsColor[startColorIndex]) {
                context.fillStyle = lightsColor[startColorIndex];
                startColorIndex += 1;
            } else {
                context.fillStyle = lightsColor[0];
                startColorIndex = 1;
            }
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();//填充颜色
            context.restore();
        }
    }

    /*
    * 划分扇区
    * */
    _drawSectors (padding = 30) {
        const context = this.context;
        const width = this.canvas.width;
        const num = this.num;
        const sectorsColor = this.sectorsColor;
        let baseAngle = Math.PI * 2 / num;
        let colorStart = 0;
        for(let index = 0; index < num; index ++) {
            let angle = index * baseAngle;
            context.save();//保存当前环境的状态
            context.beginPath();//开始绘制
            context.fillStyle = sectorsColor[colorStart];//设置每个扇形区域的颜色
            colorStart = (colorStart === sectorsColor.length - 1) ? 0 : (colorStart + 1);
            context.arc(0, 0, width / 2 - padding, angle, angle + baseAngle, false);
            context.arc(0, 0, width / num, angle + baseAngle, angle, true);
            context.fill();//填充颜色
            context.restore();

        }
    }

    /*
    * 绘制奖品
    * */
    async _drawPrize () {
        try {
            const context = this.context;
            const list = this.prizeList;
            const num = this.num;
            let imgSize = 100;
            let baseAngle = Math.PI * 2 / num;
            for(let index = 0; index < num; index ++) {
                let angle = index * baseAngle;
                let imgSource = list[index].imgSource;
                let text = list[index].name;
                let textWidth = context.measureText(text).width;
                list[index].imgSource = imgSource;
                context.save();//保存当前环境的状态
                context.textAlign = "left";
                context.font = "22px Microsoft YaHei";
                context.fillStyle = "#e02739";
                context.translate(Math.cos(angle + baseAngle / 2) * 120, Math.sin(angle + baseAngle / 2) * 120);
                context.rotate(angle + baseAngle / 2 + Math.PI / 2);
                context.drawImage(imgSource, -imgSize / 2, -(imgSize + imgSize / 2), imgSize, imgSize);
                context.fillText(text, -textWidth, -imgSize/4);
                // context.drawImage(imgSource, -imgSize / 2, imgSize + imgSize / 2, imgSize, imgSize);
                context.restore();
            }
            this.prizeList = list; //保存资源
        } catch (e) {
            console.log(e)
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
                console.log(image)
                image.src = src;
                image.onload = function () {
                    resolve(image)
                }
                image.onerror = function (err) {
                    console.log(err)
                    reject(err)
                }
            } else {
                wx.getImageInfo({
                    src: src,
                    success: function (res) {
                        let image = canvas.createImage();
                        console.log(image)
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