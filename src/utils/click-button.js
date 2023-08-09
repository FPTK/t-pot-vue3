/**
 * 点击按钮后恢复原色
 * @param event 鼠标点击事件
 * @constructor
 */
export const Click_button = (event) => {
    let target = event.target;
    if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = event.target.parentNode;
    }
    target.blur()
}