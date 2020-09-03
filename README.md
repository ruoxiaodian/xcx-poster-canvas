# xcx-poster-canvas
小程序海报生成器 --- 像在写css一样去配置

## 概述
在canvas中元素之间距离都是坐标系间的关系；假定每个元素都是绝对定位的block；那么left、top、right、bottom这些位置字段跟css中的思路就很接近了；
相对复杂的属性比如投影、渐变参考的是canvas原生写法；详见 [canvas 原生写法](https://airingursb.gitbooks.io/canvas/content/07.html)；
xcx-poster-canvas优势在于配置顺序与绘制顺序是一致的，从低到表；先绘制在最底层；与绝对定位下的css实现方式一致

## 使用说明
#### 方式一. npm 安装 （安装完成后--使用小程序开发工具构建npm 或者 手动拷贝）
注：组件使用es6的async、await同步操作 请使用小程序开发工具的增加编译功能； 小程序开发工具--点击右侧"详情"--勾选"增加编译"

    npm i xcx-poster-canvas -S --production

#### 方式二. 直接拉取拷贝/components/poster目录


## 尺寸说明
默认设定canvas css宽750rpx、高1334rpx、精度比pixelRatio = 2；小程序canvas在设置超过750rpx的css宽度，精度大于2时会报"native buffer exceed size limit"错误；
canvas尺寸越大、精度越高 则生成的图片体积越大、占用内存越高；容易造成生成图片失败；

## 示例效果
<img width="300" src="https://github.com/ruoxiaodian/xcx-poster-canvas/blob/master/images/demo.jpg"></img>

背景色是通过block配置渐变实现；

## 绘制数据（Array）；以下是每个数组项的配置字段
### Block块元素配置

| 字段名           | 类型              | 必填  | 描述                                    |
| --------------- | ---------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "block" |
| left            | Number(单位:rpx)  | 否   | 离画布左边距离 |
| top             | Number(单位:rpx)  | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false；是否跟随上一个元素之后；true则top为当前块与上一个块底部间距 |
| right           | Number(单位:rpx)  | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:rpx)  | 否   | 离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:rpx)  | 否   | 宽度 |
| height          | Number(单位:rpx)  | 否   | 高度 |
| borderRadius    | Number(单位:rpx)  | 否   | 圆角 |
| borderWidth     | Number(单位:rpx)  | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| backgroundColor | String           | 否   | 背景色 |
| backgroundImage | String           | 否   | 背景图片路径 |
| backgroundRepeat| String           | 否   | 背景图片覆盖方式 默认no-repeat |
| hollowWidth     | Int              | 否   | 镂空尺寸 |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 参考canvas属性|
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 参考canvas属性|
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 参考canvas属性|
| linearGradient  | String           | 否   | 线性渐变区间坐标(x0, y0, x1, y1)参考canvas属性|
| radialGradient  | String           | 否   | 镜像渐变区间坐标(x0, y0, r0, x1, y1, r0)参考canvas属性|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[1, "rgba(0, 0, 0, 0.5)"]] 参考canvas属性|
| opacity         | Number           | 否   | 默认值1.0 |

如果borderRadius的值大于最短边一半 则会绘制成圆形；也可以通过设置字段radius（int 半径大小）、num（int 边数）、rotate（int 旋转角度）来绘制圆形、正多边形

### 图片配置(Object)

| 字段名           | 类型              | 必填  | 描述                                    |
| --------------- | ---------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "image" |
| src             | String           | 是   | 图片地址 |
| left            | Number(单位:rpx)  | 否   | 图片离画布左边距离 |
| top             | Number(单位:rpx)  | 否   | 图片离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false；是否跟随上一个元素之后；true则top为当前块与上一个块底部间距 |
| right           | Number(单位:rpx)  | 否   | 图片画布右边距离 left存在则right无效 |
| bottom          | Number(单位:rpx)  | 否   | 图片离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:rpx)  | 是   | 图片宽度 |
| height          | Number(单位:rpx)  | 是   | 图片高度 |
| borderRadius    | Number(单位:rpx)  | 否   | 圆角 如果圆角大于最小边的一半 则为圆形|
| borderWidth     | Number(单位:rpx)  | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| opacity         | Number           | 否   | 默认值1.0 |

### 文本配置(Object)

| 字段名           | 类型              | 必填  | 描述                                   |
| --------------- | ---------------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 文本为name: "text" |
| text            | String           | 是   | 文本内容 |
| left            | Number(单位:rpx)  | 否   | 离画布左边距离 |
| top             | Number(单位:rpx)  | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false；是否跟随上一个元素之后；true则top为当前块与上一个块底部间距 |
| right           | Number(单位:rpx)  | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:rpx)  | 否   | 离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:rpx)  | 否   | 文本内容宽度  超出宽度则换行 |
| fontSize        | String / Number  | 否   | 字体大小 默认20 |
| fontColor       | String           | 否   | 字体颜色 默认 #000 |
| fontWeight      | String / Int     | 否   | 文本的粗细 默认normal|
| fontStyle       | String           | 否   | 文本样式 默认normal|
| fontFamily      | String           | 否   | 字体 |
| textAlign       | String           | 否   | 对齐方式 默认left|
| lineHeight      | Int              | 否   | 字体行高 默认20 |
| lineNum         | Int              | 否   | 文本内容显示行数限制 |
| borderWidth     | Number(单位:rpx)  | 否   | 描边宽度 |
| borderColor     | String           | 否   | 描边颜色 |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 参考canvas属性|
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 参考canvas属性|
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 参考canvas属性|
| linearGradient  | String           | 否   | 线性渐变区间坐标(x0, y0, x1, y1)参考canvas属性|
| radialGradient  | String           | 否   | 镜像渐变区间坐标(x0, y0, r0, x1, y1, r0)参考canvas属性|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[1, "rgba(0, 0, 0, 0.5)"]] 参考canvas属性|
| opacity         | Number           | 否   | 默认值1.0 |