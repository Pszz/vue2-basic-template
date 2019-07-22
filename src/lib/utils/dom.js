export default {
    /**
	 * 获取标签的真实属性值 包含小数
	 * tag 标签对象
	 * attr 要获取的属性值
	 * isNumber 是否转换为number类型
	 */
    getTagComputedStyle (tag, attr, isNumber) {
        if (!tag || !tag.nodeName || typeof tag !== 'object') {
            return isNumber ? 0 : ''
        }
        let attrValue = window.getComputedStyle(tag)[attr]
        if (attrValue.indexOf('px') !== -1) {
            attrValue = attrValue.substring(0, attrValue.length - 2)
        }
        return isNumber ? Number(attrValue) : attrValue
    },
    getStyle (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr]
        } else {
            return document.defaultView.getComputedStyle(obj, null)[attr]
        }
    },
    setBodyFontSize (p) {
        var width = window.innerWidth

        var px = width / 120

        var body = document.getElementsByTagName('body')[0]

        body.style.fontSize = px + 'px'
    },
    offsetTop ($event) {
        let target = $event.nodeName ? $event : $event.target
        let offsetTop = 0
        while (target.previousElementSibling !== null) {
            target = target.previousElementSibling
            offsetTop += target.offsetHeight
            if (target.style.marginTop !== '') {
                offsetTop += parseFloat(target.style.marginTop)
            }
            if (target.style.marginBottom !== '') {
                offsetTop += target.style.marginBottom
            }
        }
        return offsetTop
    },
    //
    offset ($event) {
        let target = $event.nodeName ? $event : $event.target
        let site = {
            left: target.offsetLeft + 'px',
            top: target.offsetTop + 'px'
        }
        return site
    },
	/**
	 * 
	 */
    position ($event) {
        let target = $event.nodeName ? $event : $event.target
        let stTarget = $event.nodeName ? $event : $event.target
        let scrollTop = 0
        let site = {
            left: target.offsetLeft,
            top: target.offsetTop - scrollTop
        }
        while (target.offsetParent) {
            target = target.offsetParent
            site.left += target.offsetLeft
            site.top += target.offsetTop
        }
        while (stTarget.parentNode && stTarget.parentNode.nodeName.toLowerCase() !== 'body') {
            stTarget = stTarget.parentNode
            scrollTop += stTarget.scrollTop
        }
        site.top -= scrollTop
        return site
    }
}
