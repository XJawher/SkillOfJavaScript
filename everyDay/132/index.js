/**
 * 实现一个可以拖拽的 dialog
 * 第一步先实现一个可以展示的 modal, 包括 title; 遮罩, footer, content
 * 这其中需要创建
 */

class Dialog {
    constructor(initData) {
        this.title = initData.title;
        this.content = initData.content;
        this.footer = initData.footer;
        this.initPositionX = 0;
        this.initPositionY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.isMoveing = false;
        this.dialog;
        this.init();
    }
    init() {
        // dialog 父元素
        let model = document.createElement('div');
        model.style = `
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        display:flex;
        justify-content: center;
        align-items: center;
       `
        model.textContent = this.title;
        model.className = 'model-class';
        document.body.appendChild(model);
        const dialog = document.createElement('div')
        dialog.className = 'model-dialog';
        dialog.style = `
        padding: 20px;
        background-color: white`
        dialog.innerText = this.content;
        dialog.addEventListener('click', e => {e.stopPropagation()}); // 阻止冒泡,在 Windows 上是 cancelBubble 在 其他的上是 stopPropagation()
        dialog.addEventListener('mousedown', this.handleMousedown.bind(this)); // 鼠标停止事件,
        document.addEventListener('mousemove', this.handleMousemove.bind(this))
        document.addEventListener('mouseup', this.handleMouseup.bind(this))
        this.dialog = dialog;
        model.appendChild(dialog)
    }

    /**
     * 在这里计算出第一次鼠标点击的时候整个 model 的初始位置
     * @param {*} e
     */
    handleMousedown(e) {
        this.isMoveing = true;
    }

    /**
     * 处理鼠标在移动的时候发生的事件,这里需要的话可以做防抖或者节流
     * 在这里做位置的处理,
     *
     * @param {*} event
     */
    handleMousemove(e) {
        if (this.isMoveing) {
            // this.dialog.style.transform = `translate(${e.clientX - this.initPositionX + this.lastX}px,${e.clientY - this.initPositionY + this.lastY}px)`
            this.dialog.style = `
            position: absolute;
            width: 100px;
            height: 20px;
            padding: 20px;
            background-color: red;
            left: ${e.x < 0 ? 0 : e.x > 1439 ? 1439 - 100 : e.x}px;
            top: ${e.y < 0 ? 0 : e.screenY - e.y > 0 ? e.y : e.screenY}px;
            `
        }
    }

    handleMouseup(event) {
        this.isMoveing = false;
        this.closeModel()
    }

    closeModel() {
        this.dialog.removeEventListener('mousedown', this.handleMousedown);
        document.removeEventListener('mousemove', this.handleMousemove);
        document.removeEventListener('mouseup', this.handleMouseup);
        document.body.removeChild(document.querySelector('.model-dialog'))
    }
}

new Dialog({title: 'this is title', content: 'this is content', footer: {ok: 'ok', cancel: 'cancel'}});