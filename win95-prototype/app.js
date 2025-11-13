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
