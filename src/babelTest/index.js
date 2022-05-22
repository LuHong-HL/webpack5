// 补齐 api 语法转换
// const fn =  async () => {
//     return await Promise.resolve(true)
//   }

const fn = () => {
    Promise.resolve('fn1').then(res => {
        console.log(res)
    })
}

fn()

const fn2 = async () => {
    return await Promise.resolve('fn2')
}

console.log(fn2())