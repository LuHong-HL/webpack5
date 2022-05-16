import './index.css'
import './index.scss'

export function Head() {
    const divElement = document.createElement('div')
    divElement.innerHTML = '我是头部'
    divElement.setAttribute("class", 'head')
    divElement.classList.add("scss")
    return divElement
}