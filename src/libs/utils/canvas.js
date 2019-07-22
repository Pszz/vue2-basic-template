export default {
	/**
     * canvas 画图方法
     */
    drawImg: (ctx, option) => {
        let image = new window.Image()
        image.src = option.src
        ctx.drawImage(image, option.sx, option.sy, option.sw, option.sh, option.x, option.y, option.w, option.h)
    },
    /**
     * canvas 画图方法 用户画布中画canvas
     */
    drawCanvas: (ctx, canvas, option) => {
        ctx.drawImage(canvas, option.sx, option.sy, option.sw, option.sh, option.x, option.y, option.w, option.h)
    },	
    /**
     * canvas 画圆方法
     */
    drawCircular (ctx, option) {
       	ctx.beginPath()
	   	/**
    	  * 设置弧线的颜色
		  * @type {[type]}
	      */
        ctx.strokeStyle = option.strokeStyle
        /**
          * 设置背景颜色rgba(141, 141, 141, 1)
          * @type {[type]}
          */
        ctx.fillStyle = option.fillStyle
        /**
          * option.x,    圆心的x轴坐标值
          * option.y,    圆心的y轴坐标值
    	  * option.r     圆的半径
          */
        let sAngle = option.sAngle || 0
        let eAngle = option.eAngle || 2
        ctx.arc(option.x, option.y, option.r, sAngle * Math.PI, eAngle * Math.PI)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    /**
     * 画圆角矩形
     * @type {[type]}
     */
     drawRoundedRect: (ctx, temp) => {
         let roundedRect = (ctx, x, y, w, h, radius) => {
             if (w > 0) {
                 ctx.moveTo(x + radius, y)
             } else {
                 ctx.moveTo(x - radius, y)
             }
             ctx.arcTo(x + w, y, x + w, y + h, radius)
             ctx.arcTo(x + w, y + h, x, y + h, radius)
             ctx.arcTo(x, y + h, x, y, radius)
             if (w > 0) {
                 ctx.arcTo(x, y, x + radius, y, radius)
             } else {
                 ctx.arcTo(x, y, x - radius, y, radius)
             }
         }
         ctx.beginPath()
         roundedRect(ctx, temp.x, temp.y, temp.w, temp.h, temp.radius)
         ctx.strokeStyle = temp.strokeStyle
         ctx.fillStyle = temp.fillStyle
         ctx.stroke()
         ctx.fill()
     },
    /**
     * canvas 写文字方法
     */
    fillText: (ctx, option, text, x, y) => {
        ctx.font = option.font
        ctx.fillStyle = option.fillStyle
        if (option.textAlign) {
            ctx.textAlign = option.textAlign
        } else {
            ctx.textAlign = 'start'
        }
        if (option.textBaseline) {
            ctx.textBaseline = option.textBaseline
        } else {
            ctx.textBaseline = 'top'
        }
        ctx.fillText(text, x, y)
    },
    /**
     * canvas 画线
     */
    drawLine: (ctx, option) => {
        /**
         * 设置填充颜色
         * @type {String}
         */
        ctx.strokeStyle = option.fillStyle
        ctx.lineWidth = option.lineWidth ? option.lineWidth : 1
        ctx.beginPath()
        /**
         * 将画笔移到x0,y0处
         */
        ctx.moveTo(option.x0, option.y0)
        /**
         * 从x0,y0到x1,y1画一条线
         */
        ctx.lineTo(option.x1, option.y1)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    /**
     * canvas 画横向带箭头的线
     */
    drawArrowLine: (ctx, option) => {
        /**
         * 设置填充颜色
         * @type {String}
         */
        ctx.strokeStyle = option.fillStyle
        ctx.lineWidth = option.lineWidth
        ctx.fillStyle = option.fillStyle
        ctx.beginPath()
        /**
         * 将画笔移到x0,y0处
         */
        ctx.moveTo(option.x0, option.y0)
        /**
         * 从x0,y0到x1,y1画一条线
         */
        ctx.lineTo(option.x1 - 1, option.y1)
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        /**
         * 从x1,y1画两5像素的条线形成箭头
         */
        ctx.lineTo(option.x1 - option.r, option.y1 + option.r * 2 / 3)
        ctx.lineTo(option.x1 - 1, option.y1)
        ctx.lineTo(option.x1 - option.r, option.y1 - option.r * 2 / 3)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    },
    /**
	 * 缩放
	 */
	resizeImage (image, width, height) {
		var canvas = document.createElement('canvas')
		var ctx = canvas.getContext('2d')
		canvas.width = width
		canvas.height = height
		ctx.drawImage(image, 0, 0, width, height)
		var dataUrl = canvas.toDataURL('image/jpeg')
		var dest = new window.Image()
		dest.src = dataUrl
		return dest
	},
	/**
	 * 压缩
	 */
	compressImage (image) {
		var maxWidth = 1024
		var maxHeight = 1536
		var scale = 0
		var nwidth = image.width
		var nheight = image.height
		// 压缩
		if (image.width > maxWidth) {
			nwidth = maxWidth
			scale = image.width / image.height
			nheight = parseInt(nwidth / scale)
			image = this.resizeImage(image, nwidth, nheight)
		}
		if (image.height > maxHeight) {
			nheight = maxHeight
			scale = image.height / image.width
			nwidth = parseInt(nheight / scale)
			image = this.resizeImage(image, nwidth, nheight)
		}
		var size = image.width * image.height
		if (size > 1024 * 300) {
			var canvas = document.createElement('canvas')
			var ctx = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			ctx.drawImage(image, 0, 0, image.width, image.height)
			var dataUrl = canvas.toDataURL('image/jpeg', 0.9)
			image.src = dataUrl
		}
		return image
	}
}