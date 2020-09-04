
const Poster = {
    getComponentId: function (id = "#poster", that) {
        const pages = getCurrentPages();
        let ctx = pages[pages.length - 1];
        if (that) ctx = that
        return ctx.selectComponent(id);
    },
    getCanvasSizeRpx: function (id, that) {
        const poster = this.getComponentId(id, that);
        if (!poster) {
            console.error('请设置组件的id="poster"!!!');
        } else {
            return {
                canvasWidth: poster.data.width,
                canvasHeight: poster.data.height
            };
        }
    },
    create: function (data, that, id) {
        const poster = this.getComponentId(id, that);
        if (!poster) {
            console.error('请设置组件的id="poster"!!!');
        } else {
            return poster.create(data);
        }
    }
}

export default Poster;
