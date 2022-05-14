
function component () {
    const divElement = document.createElement('div')
    divElement.innerHTML = '我是文本'
    return divElement
}


document.body.appendChild(component()) // 在body元素上添加一个孩子元素