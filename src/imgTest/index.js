import small from './small.png'
import big from './big.png'

export function AddImg() {
    const div = document.createElement('div')
    const smallImg = document.createElement('img')
    smallImg.src = small
    const bigImg = document.createElement('img')
    bigImg.src = big
    div.appendChild(smallImg)
    div.appendChild(bigImg)
    return div
}