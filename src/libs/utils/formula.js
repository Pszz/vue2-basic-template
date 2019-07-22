export default {
	/**
	 * 计算2点之间直线中所有的坐标, 
	 * len 是取其中多少的坐标数
	 * order 取值的顺序 true:升序 false:降序
	 */
    getCoordinates (a, b) {
    	let dx
	    let dy
	    let h
	    let x
	    let y
	    let t
	    let ret = []
	    if (a.x > b.x) {
	        a.x = [b.x, b.x = a.x][0]
	        a.y = [b.y, b.y = a.y][0]
	    }
	    dx = b.x - a.x
	    dy = b.y - a.y
	    x = a.x
	    y = a.y
	    if (!dx) {
	        t = (a.y > b.y) ? -1 : 1
	        while (y !== b.y) {
	            ret.push([x, y])
	            y += t
	        }
	        return ret.slice(0)
	    }
	    if (!dy) {
	        while (x !== b.x) {
	            ret.push([x, y])
	            x++
	        }
	        return ret.slice(0)
	    }
	    if (dy > 0) {
	        if (dy <= dx) {
	            h = 2 * dy - dx
	            ret.push([x, y])
	            while (x !== b.x) {
	                if (h < 0) {
	                    h += 2 * dy
	                } else {
	                    y++
	                    h += 2 * (dy - dx)
	                }
	                x++
	                ret.push([x, y])
	            }
	        } else {
	            h = 2 * dx - dy
	            ret.push([x, y])
	            while (y !== b.y) {
	                if (h < 0) {
	                    h += 2 * dx
	                } else {
	                    ++x
	                    h += 2 * (dx - dy)
	                }
	                y++
	                ret.push([x, y])
	            }
	        }
	    } else {
	        t = -dy
	        if (t <= dx) {
	            h = 2 * dy + dx
	            ret.push([x, y])
	            while (x !== b.x) {
	                if (h < 0) {
	                    h += 2 * (dy + dx)
	                    y--
	                } else {
	                    h += 2 * dy
	                }
	                x++
	                ret.push([x, y])
	            }
	        } else {
	            dy = -dy
	            dx = -dx
	            y = b.y
	            x = b.x
	            ret.push([x, y])
	            h = 2 * dx + dy
	            while (y !== a.y) {
	                if (h < 0) {
	                    h += 2 * (dx + dy)
	                    x--
	                } else {
	                    h += 2 * dx
	                }
	                y++
	                ret.push([x, y])
	            }
	        }
	    }
	    return ret.slice(0)
　　 	},
	/**
	 * 获取两点之间的直线的角度
	 */
	getAngle (a, b) {
		// 两点的x、y值
	    let x = b.x - a.x
	    let y = b.y - a.y
	    let hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
	    // 斜边长度
	    let cos = x / hypotenuse
	    let radian = Math.acos(cos)
	    // 求出弧度
	    let angle = 180 / (Math.PI / radian)
	    // 用弧度算出角度
	    if (y < 0) {
            angle = -angle
	    } else if ((y === 0) && (x < 0)) {
            angle = 180
	    }
	    return angle
	},
	// 判断线段是否和矩形相交
    isLineIntersectRectangle (line, graphics) {
        let lineHeight = line.y0 - line.y1
        let lineWidth = line.x1 - line.x0  // 计算叉乘
        let c = line.x0 * line.y1 - line.x1 * line.y0
        if ((lineHeight * graphics.leftTopX + lineWidth * graphics.leftTopY + c >= 0 && lineHeight * graphics.rightBottomX + lineWidth * graphics.rightBottomY + c <= 0) ||
            (lineHeight * graphics.leftTopX + lineWidth * graphics.leftTopY + c <= 0 && lineHeight * graphics.rightBottomX + lineWidth * graphics.rightBottomY + c >= 0) ||
            (lineHeight * graphics.leftTopX + lineWidth * graphics.rightBottomY + c >= 0 && lineHeight * graphics.rightBottomX + lineWidth * graphics.leftTopY + c <= 0) ||
            (lineHeight * graphics.leftTopX + lineWidth * graphics.rightBottomY + c <= 0 && lineHeight * graphics.rightBottomX + lineWidth * graphics.leftTopY + c >= 0)) {
            if (graphics.leftTopX > graphics.rightBottomX) {
                let temp = graphics.leftTopX
                graphics.leftTopX = graphics.rightBottomX
                graphics.rightBottomX = temp
            }
            if (graphics.leftTopY < graphics.rightBottomY) {
                let temp = graphics.leftTopY
                graphics.leftTopY = graphics.rightBottomY
                graphics.rightBottomY = temp
            }
            if ((line.x0 < graphics.leftTopX && line.x1 < graphics.leftTopX) ||
                (line.x0 > graphics.rightBottomX && line.x1 > graphics.rightBottomX) ||
                (line.y0 > graphics.leftTopY && line.y1 > graphics.leftTopY) ||
                (line.y0 < graphics.rightBottomY && line.y1 < graphics.rightBottomY)) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    },
    // 判断图形是否相交
    graphicsIntersection (graphics1, graphics2) {
        if (graphics1.x > graphics2.x + graphics2.w || graphics2.x > graphics1.x + graphics1.w || graphics1.y > graphics2.y + graphics2.h || graphics2.y > graphics1.y + graphics1.h) {
            return false
        } else {
            return true
        }
    },
    // 判断坐标是在特定范围内
    coordinateInScope (coordinate, graphics) {
        if (coordinate.x >= graphics.x && coordinate.x <= graphics.x + graphics.w && coordinate.y >= graphics.y && coordinate.y <= graphics.y + graphics.h) {
            return true
        } else {
            return false
        }
    },
    /**
     * 计算当前坐标是否在圆的范围内
     * coordinate 坐标 x y
     * circular 圆的心坐标 x y 半径 r
     */
    coordinateInCircular (coordinate, circular) {
    	if ((circular.x - coordinate.x) * (circular.x - coordinate.x) + (circular.y - coordinate.y) * (circular.y - coordinate.y) < circular.r * circular.r) {
    		return true
    	}
    	return false
    },
    /**
     * 通过直线的开始和结束点的左边计算中心点的坐标
     */
    getLineCenterCoordinate (start, end) {
    	return {
    		x: (start.x + end.x) / 2,
    		y: (start.y + end.y) / 2
    	}
    }
}