export default async function main() {
    
    let currentIndex = 0; //메뉴를 몇 번 선택했냐. 설정
    const menuitems = document.querySelectorAll(".menu-item");

    console.log(menuitems)

    menuitems[currentIndex].classList.add("select")

    window.addEventListener("keydown", (e) => {

        //console.log(e.key)//키 다운 시 호출

        if(e.key == "ArrowUp") {
            menuitems[currentIndex].classList.remove('select')
            console.log('up')
            currentIndex--

            if(currentIndex<0) {
                currentIndex=3
            }
        }
        else if(e.key == "ArrowDown") {
            menuitems[currentIndex].classList.remove('select')
            console.log('down')
            currentIndex++
            currentIndex %= 4
        }
        menuitems[currentIndex].classList.add("select")

        console.log(currentIndex)
    })
}