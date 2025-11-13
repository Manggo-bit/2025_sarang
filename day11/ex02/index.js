export default async function main() {

    console.log('hello es6')

    var a = 1

    console.log(`a : ${a}`)
    a = a + 1
    console.log(`a : ${a}`)

    let b = 1
    b += 5
    console.log(`b : ${b}`)

    const c = 1
    // c += 1 상수라 그냥 쓰는 변수. 자바에서는 var, let, const 세 가지만 알면 된다!(var은 쓰지 마라! 아예 쓰지 마라!)
    console.log(`c : ${c}`)

    let a1 = 1
    console.log(`a1 : ${a1}`)
    {
        let a1 = 3
        a1 += 1
        console.log(`a1 : ${a1}`)
    }
    console.log(`a1 : ${a1}`)
}