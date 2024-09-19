Login();
function Login() {
  const userName = localStorage.getItem("Name"); // 로컬 스토리지에서 유저 이름 가져오기

  if (userName) {
    // 로그인 상태일 때 메뉴 변경
    const topMenu = document.getElementById("topMenu");
    topMenu.innerHTML = `
        <div class="top-menu-link logo-left">
          <a href="/html/main/page.html">
            <img
              src="/Media/Index/studentThinkLogo.png"
              alt="학생 생각함 로고"
              class="logo"
            />
          </a>
        </div>
        <div class="top-menu-links">
          <div class="top-menu-link">
            <img src="../../Media/profile/1234.jpg" alt="Profile" style="width: 30px; height: 30px; border-radius: 50%;">
        </div>
        <div class="top-menu-link">
            <a href="../../html/User/Profil.html">${userName}님 환영합니다.</a>
        </div>
        <div class="top-menu-link">
            <a href="#" onclick="logout()">로그아웃</a>
        </div>
        `;
  }
}
function logout() {
  localStorage.clear(); // 로컬 스토리지 클리어
  window.location.reload(); // 페이지 새로고침
  location.href = "../../html/main/page.html";
}
