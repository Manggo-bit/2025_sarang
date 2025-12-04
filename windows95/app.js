// 요소 가져오기
const splash = document.getElementById('splash');
const desktop = document.getElementById('desktop');
const audio = document.getElementById('startupAudio');

// 웰컴창 관련 요소
const welcomeWrap = document.getElementById('welcomeWrap');
const xBtn = document.querySelector('.x-btn');
const okBtn = document.querySelector('.ok-btn');

// 🎬 스플래시 클릭 → 부팅 사운드 재생
splash.addEventListener('click', async () => {
  try {
    await audio.play();
  } catch {
    alert("브라우저 자동재생이 차단되었습니다. 다시 클릭해주세요.");
  }
});


// 🎵 사운드 끝 → 데스크탑 보이기 + 웰컴창 표시
audio.addEventListener('ended', () => {
  splash.classList.add('hidden');
  desktop.classList.remove('hidden');
  welcomeWrap.classList.remove('hidden'); // 웰컴창 표시
});

// ❌ X 또는 OK 클릭 → 웰컴창 닫기
xBtn.addEventListener('click', () => {
  welcomeWrap.classList.add('hidden');
});

okBtn.addEventListener('click', () => {
  welcomeWrap.classList.add('hidden');
});

// 시계 요소
const clockText = document.getElementById('clockText');

// ======================
// ⏰ 작업표시줄 시계 기능
// ======================
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  
  // "HH:MM" 형식으로 표시
  clockText.textContent = `${hours}:${minutes}`;
}

// 1초마다 시간 갱신
setInterval(updateClock, 1000);
// 새로고침하자마자 한 번 실행
updateClock();

// ======================
// 📁 폴더 창 열기 / 닫기 (1번 프로젝트와 동일하게)
// ======================
// 폴더 창 요소
const folderWindowWrap = document.getElementById('folderWindowWrap');   // 폴더 창 전체
const folderCloseBtn = document.querySelector('.folder-close-btn');    // X 버튼 영역
const folderIcon = document.getElementById('folderIcon');   // 폴더 아이콘

// 지렁이 게임 창 요소
const wormGameWindowWrap = document.getElementById('wormGameWindowWrap');  // 지렁이 게임 창
const wormIcon = document.getElementById('wormIcon');  // 지렁이 아이콘


// 폴더 아이콘 클릭 → 폴더 창 열기
folderIcon.addEventListener('click', () => {
  // 폴더 창이 이미 열려 있는지 확인
  if (!folderWindowWrap.classList.contains('visible')) {
    folderWindowWrap.classList.remove('hidden');
    folderWindowWrap.classList.add('visible');
  }
});

// 폴더 창 X 버튼 클릭 → 폴더 창 닫기
folderCloseBtn.addEventListener('click', () => {
  folderWindowWrap.classList.remove('visible');
  folderWindowWrap.classList.add('hidden');
});


// 지렁이 아이콘 클릭 → 지렁이 게임 창 열기
wormIcon.addEventListener('click', () => {
  // 지렁이 게임 창이 이미 열려 있는지 확인
  if (!wormGameWindowWrap.classList.contains('visible')) {
    wormGameWindowWrap.classList.remove('hidden');
    wormGameWindowWrap.classList.add('visible');
    // 게임 창이 열릴 때 스페이스바 시작 리스너 추가
    window.addEventListener('keydown', startGameWithSpace);
  }
});

// 지렁이 게임 창 X 버튼 클릭 → 게임 창 닫기
const wormGameCloseBtn = document.querySelector('.worm-game-close-btn');
wormGameCloseBtn.addEventListener('click', () => {
  wormGameWindowWrap.classList.remove('visible');
  wormGameWindowWrap.classList.add('hidden');
  // 게임 창이 닫힐 때 스페이스바 시작 리스너 제거
  window.removeEventListener('keydown', startGameWithSpace);
});

//===============================
// 🐍 지렁이 게임 기능
// ===============================
const gameStartText = document.getElementById('gameStartText');

// 스페이스바를 눌러 게임을 시작하는 함수
function startGameWithSpace(event) {
  if (event.code === 'Space') {
    // 리스너를 제거하여 게임이 다시 시작되지 않도록 함
    window.removeEventListener('keydown', startGameWithSpace);
    init();
  }
}

// 게임 설정 변수
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // 게임 맵에서 1칸 크기 (10px)
const rows = canvas.height / scale; // 세로 칸 수
const columns = canvas.width / scale; // 가로 칸 수

let snake; // 뱀
let food; // 먹이
let score = 0; // 점수
let gameOver = false; // 게임 오버 여부

// 게임 시작 시 뱀과 먹이 초기화
function init() {
  snake = new Snake();
  food = new Food();
  score = 0;
  gameOver = false;
  window.addEventListener('keydown', changeDirection);
  window.requestAnimationFrame(gameLoop);
  gameStartText.style.display = 'none'; // "Game Start" 텍스트 숨기기
}

// 게임 루프
function gameLoop() {
  if (gameOver) return showGameOver();

  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 지우기
    food.draw();
    snake.update();
    snake.draw();
    ctx.fillStyle = 'white';
    ctx.font = '18px monospace';
    ctx.fillText(`Score: ${score}`, 10, 20);
    window.requestAnimationFrame(gameLoop);
  }, 1000 / 10); // 10 FPS
}

// 뱀 객체
function Snake() {
  // 초기 위치를 게임 창 중앙에 배치
  this.body = [{ x: Math.floor(columns / 2), y: Math.floor(rows / 2) }];
  this.direction = 'RIGHT';

  // 머리 위치 업데이트 및 충돌 검사
  this.update = () => {
    const head = { ...this.body[0] };

    // 현재 방향에 따라 머리의 위치를 변경
    if (this.direction === 'UP')    head.y -= 1;
    if (this.direction === 'DOWN')  head.y += 1;
    if (this.direction === 'LEFT')  head.x -= 1;
    if (this.direction === 'RIGHT') head.x += 1;

    // 벽과 충돌하면 게임 오버
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
      gameOver = true;
      return;
    }

    // 먹이를 먹었는지 확인
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      food = new Food();
    } else {
      // 이동 시 꼬리 한 칸 제거
      this.body.pop();
    }

    // 새로운 머리 삽입
    this.body.unshift(head);

    // 몸통에 부딪혔는지 검사
    if (this.collision(head)) {
      gameOver = true;
    }
  };

  // 뱀을 그리는 함수
  this.draw = () => {
    ctx.fillStyle = 'green';
    this.body.forEach(segment => {
      ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
  };

  // 방향 전환 함수
  this.changeDirection = (event) => {
    const key = event.keyCode;
    if (key === 37 && this.direction !== 'RIGHT') this.direction = 'LEFT';
    if (key === 38 && this.direction !== 'DOWN')  this.direction = 'UP';
    if (key === 39 && this.direction !== 'LEFT')  this.direction = 'RIGHT';
    if (key === 40 && this.direction !== 'UP')    this.direction = 'DOWN';
  };

  // 자기 몸통에 부딪혔는지 확인하는 함수
  this.collision = (head) => {
    return this.body.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
  };
}

// 먹이 객체
function Food() {
  // 게임 맵 내에서 랜덤 위치
  this.x = Math.floor(Math.random() * columns); 
  this.y = Math.floor(Math.random() * rows);

  this.draw = function() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
  }
}

// 게임 오버 화면 표시
function showGameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '15px monospace';
  ctx.fillText(`Game Over`, canvas.width / 4, canvas.height / 2 - 30);
  ctx.fillText(`Final Score: ${score}`, canvas.width / 4, canvas.height / 2);
  ctx.fillText('Press R to Restart', canvas.width / 4, canvas.height / 2 + 30);
  
  window.addEventListener('keydown', restartGame);
}

// 게임 재시작
function restartGame(event) {
  if (event.keyCode === 82) { // R 키를 눌렀을 때
    init();
  }
}

// 방향키 입력 받기
function changeDirection(event) {
  snake.changeDirection(event);
}