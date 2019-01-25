class particles {

    constructor() {
        this.instance = null
        this.el = null
        this.elArr = []
        this.shock = false      // 是否震动
        this.color = null
        this.colorful = false   // 每个粒子颜色是否一样
        this.canvas = document.createElement('canvas')
        this.cxt = this.canvas.getContext('2d')
        /**
         *  @param width  粒子宽度
         *  @param height 粒子高度
         *  @param radius 粒子半径
         *  @param particleArr 粒子数组
         *  @param particleShape 粒子形状  circle square
         */
        //设置粒子参数
        this.width = 3
        this.height = 3
        this.radius = 2
        this.particleShape = null
        this.particleNum = 0
        this.particleArr = []

        this.init()
    }

    static getInstance(el, shape = 'square', shock = false, colorful = false) {
        if (!this.instance)
            this.instance = new particles()
        if (this.instance.isEl(el)) {
            this.instance.elArr.push(el)
        } else {
            let textareaArr = this.instance.nodelistToArray(el.querySelectorAll('textarea'))
            let inputArr = this.instance.nodelistToArray(el.querySelectorAll('input'))
            this.instance.elArr.push.apply(this.instance.elArr, textareaArr.concat(inputArr))
        }
        this.instance.particleShape = shape
        this.instance.shock = shock
        this.instance.colorful = colorful
        this.instance.listener()
        return this.instance
    }

    init() {
        this.canvas.id = 'particleCanvas'
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999'
        document.body.appendChild(this.canvas)
        requestAnimationFrame(() => this.createPartocle())
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
        })
    }

    listener() {
        for (let i = 0, len = this.elArr.length; i < len; i++) {
            if (this.isEl(this.elArr[i])) {
                this.elArr[i].addEventListener('focus', () => this.el = this.elArr[i])
                this.elArr[i].addEventListener('input', () => this.createPartocleParam())
            }
        }
    }

    createPartocle() {
        requestAnimationFrame(() => this.createPartocle())
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0, len = this.particleArr.length; i < len; i++) {
            let item = this.particleArr[i]
            if (item.alpha <= 0.2)
                continue
            item.velocity.y += 0.075
            item.x += item.velocity.x
            item.y += item.velocity.y
            item.alpha *= 0.96
            this.cxt.globalAlpha = item.alpha
            this.cxt.fillStyle = item.color
            switch (this.particleShape) {
                case 'square':
                    this.cxt.fillRect(Math.round(item.x - 1.5), Math.round(item.y - 1.5), this.width, this.height)
                    break
                case 'circle':
                    this.cxt.beginPath()
                    this.cxt.arc(Math.round(item.x - 1.5), Math.round(item.y - 1.5), this.radius, 0, Math.PI * 2)
                    this.cxt.fill()
                    break
            }
        }
    }

    createPartocleParam() {
        this.color = null
        let num = 10 + Math.round(this.random(10))
        while (num--) {
            let position = this.getPosition()
            position.alpha = 1
            position.velocity = { x: -1 + Math.random() * 2, y: -3.5 + Math.random() * 2 }
            this.particleArr[this.particleNum] = position
            this.particleNum = (this.particleNum + 1) % 500
        }
        if (this.shock) {
            let range = this.random(3, 1)
            let left = this.random() > 0.5 ? range : -range
            let right = this.random() > 0.5 ? range : -range
            document.body.style.marginLeft = `${left}px`
            document.body.style.marginRight = `${right}px`
            setTimeout(() => {
                document.body.style.marginLeft = ''
                document.body.style.marginRight = ''
            }, 75)
        }
    }

    getPosition() {
        let cursorPosition = this.computeCursorPosition()
        let elPagePosition = this.el.getBoundingClientRect()
        return { x: cursorPosition.left + elPagePosition.left, y: cursorPosition.top + elPagePosition.top, color: this.getColor() }
    }

    computeCursorPosition() {
        let cssStyle = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize']
        let mirror = document.querySelector('#caret-position-mirror')
        if (mirror) mirror.parentNode.removeChild(mirror)
        let div = document.createElement('div')
        div.id = 'caret-position-mirror'
        document.body.appendChild(div)
        let divStyle = div.style
        let elStyle = window.getComputedStyle ? getComputedStyle(this.el) : this.el.currentStyle
        divStyle.whiteSpace = 'pre-wrap'
        divStyle.position = 'absolute'
        divStyle.visibility = 'hidden'
        if (this.el.nodeName !== 'INPUT')
            divStyle.wordWrap = 'break-word'
        cssStyle.forEach(item => { divStyle[item] = elStyle[item] })
        if (window.mozInnerScreenX) {
            let height = elStyle.height ? elStyle.height.replace('px','') : 0
            if (this.el.scrollHeight > Number(height))
                divStyle.overflowY = 'scroll'
        } else {
            divStyle.overflow = 'hidden'
        }
        div.textContent = this.el.value.substring(0, this.el.selectionStart)
        if (this.el.nodeName === 'INPUT')
            div.textContent = div.textContent.replace(/\s/g, "\u00a0")
        let span = document.createElement('span')
        span.textContent = this.el.value.substring(this.el.selectionStart) || '.'
        div.appendChild(span)
        let borderTopWidth = elStyle.borderTopWidth ? elStyle.borderTopWidth.replace('px','') : 0
        let borderLeftWidth = elStyle.borderTopWidth ? elStyle.borderTopWidth.replace('px','') : 0
        let result = { top: span.offsetTop + Number(borderTopWidth), left: span.offsetLeft + Number(borderLeftWidth) }
        document.body.removeChild(div)
        return result
    }

    nodelistToArray(nodelist) {
        let arr = null
        try {
            arr = Array.prototype.slice.call(nodelist, 0)
        } catch (e) {
            arr = new Array()
            for (let i = 0, len = nodelist.length; i < len; i++) {
                arr.push(nodelist[i])
            }
        }
        return arr
    }

    isEl(el) {
        let tag = ['text', 'password', 'number', 'search', 'email', 'url', 'tel', 'datetime']
        if (el.nodeName === 'TEXTAREA' || (el.nodeName === 'INPUT' && tag.indexOf(el.type) > -1))
            return true
        return false
    }

    getColor() {
        if (this.colorful || !this.color) {
            let randomNum = this.random(360)
            this.color = `hsla(${this.random(randomNum + 10, randomNum - 10)}, 100%, ${this.random(80, 50)}%, 1)`
        }
        return this.color
    }

    random(max = 1, min = 0) {
        return Math.random() * (max - min) + min
    }

}

export default particles