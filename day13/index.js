export default async function main() {

    const menuitems = document.querySelectorAll(".menu-item");

    //페이지 도큐먼트 오브잭트
    const menu = document.getElementById("main-menu");
    const creditPage = document.getElementById("credit-screen");
    const optionPage = document.getElementById("option-screen");
    const gameScreen = document.getElementById("game-screen");

    let currentPage = "menu"

    let currentIndex = 0;

    menuitems.forEach((item, index) => {
        if (currentIndex == index)
            item.classList.add('selected')
        else
            item.classList.remove('selected')
    });

    // 방향키 / 엔터 처리
    window.addEventListener("keydown", (e) => {

        if (currentPage == "menu") {
            switch (e.key) {
                case "ArrowDown":

                    menuitems[currentIndex].classList.remove('selected')
                    currentIndex = (currentIndex + 1) % menuitems.length;
                    menuitems[currentIndex].classList.add('selected')

                    e.preventDefault();
                    break;

                case "ArrowUp":
                    menuitems[currentIndex].classList.remove('selected')
                    currentIndex = (currentIndex - 1 + menuitems.length) % menuitems.length;
                    menuitems[currentIndex].classList.add('selected')
                    e.preventDefault();
                    break;

                case "Enter":
                    // 선택된 메뉴 클릭 동작 연결 (필요 없으면 삭제)
                    const selected = menuitems[currentIndex];
                    console.log(selected)
                    console.log(selected.dataset.action)

                    if (selected.dataset.action == 'option') {
                        menu.classList.add('hide')
                        optionPage.classList.remove('hide')
                        currentPage = "option"
                    }
                    else if(selected.dataset.action == 'start') {
                        menu.classList.add('hide')
                        gameScreen.classList.remove('hide')
                        currentPage = "game"
                    }
                    e.preventDefault();
                    break;
            }
        }
        else if(currentPage=="option") {

            console.log('now option page key : ' + e.key)
            
            if(e.key == 'Enter') {
                menu.classList.remove('hide')
                optionPage.classList.add('hide')
                currentPage = "menu"
            }
        }
        else if(currentPage == "game") {
            console.log('now option page key : ' + e.key)
            
            if(e.key == 'Enter') {
                menu.classList.remove('hide')
                optionPage.classList.add('hide')
                currentPage = "menu"
            }
        }

    });



    console.log("hello es6");
}