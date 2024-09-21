const changePwButton = document.getElementById("changePw");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const errorMessage = document.getElementById("error-message");
const nameDisplay = document.getElementById("name");
const schoolDisplay = document.getElementById("school");
const emailDisplay = document.getElementById("email");
const phoneDisplay = document.getElementById("phone");
const userName = localStorage.getItem("Name");
let obj = { userName: userName };

document.addEventListener("DOMContentLoaded", function () {
  // 비밀번호 변경 버튼 클릭 시
  changePwButton.addEventListener("click", function (event) {
    // 기본 폼 제출 방지
    event.preventDefault();

    let errorText = "";

    // 입력 필드 확인
    if (!newPasswordInput.value) {
      errorText += "비밀번호를 입력해 주세요.\n";
    }
    if (newPasswordInput.value !== confirmPasswordInput.value) {
      errorText += "비밀번호가 일치하지 않습니다.\n";
    }

    // 에러 메시지 처리
    if (errorText) {
      errorMessage.textContent = errorText;
      errorMessage.style.display = "block";
    } else {
      obj = { userName: userName, pw: newPasswordInput.value };
      $.ajax({
        url: "http://ip주소:포트번호/profil_PW",
        type: "get", //default는 get이기 때문에 생략 가능.
        data: obj,
        dataType: "json",
        success: function (res) {
          if (res.status == 200) {
            // 비밀번호 변경 성공 처리
            alert("비밀번호가 변경되었습니다.");
            obj = { userName: userName };
            newPasswordInput.value = "";
            confirmPasswordInput.value = "";
          } else if (res.status == 100) {
            alert("네트워크 오류");
          }
        },
      });

      // 에러 메시지 숨기기
      errorMessage.style.display = "none";

      // 필요한 추가 비밀번호 변경 처리 로직 추가 (예: 폼 제출, 서버 요청 등)
    }
  });
});

sidemenu();
getprofil();

function sidemenu() {
  sidebar.innerHTML = "";
  $.ajax({
    url: "http://ip주소:포트번호/admin_check",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 100) {
        sidebar.innerHTML = `
          <ul>
          <li><a href="Profil.html" class="side">프로필 수정</a></li>
          <li><a href="#" class="side active">비밀번호 변경</a></li>
        </ul>
      `;
      } else if (res.status == 200) {
        sidebar.innerHTML = `
        <ul>
          <li><a href="Profil.html" class="side">프로필 수정</a></li>
          <li><a href="#" class="side active">비밀번호 변경</a></li>
          <li><a href="../Admin/adminPageUserManage.html" class="side">관리자 기능(관리자 전용)</a></li>
        </ul>`;
      }
    },
  });
}

function getprofil() {
  $.ajax({
    url: "http://ip주소:포트번호/profil",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        setprofil();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function setprofil() {
  nameDisplay.value = resu[0].Name;
  schoolDisplay.value = resu[0].SC_Name;
  emailDisplay.value = resu[0].EMail;
  phoneDisplay.value = resu[0].Phone;
  set();
}

function set() {
  // 입력 필드의 값을 오른쪽 프로필 섹션에 업데이트
  nameDisplay.textContent = document.getElementById("name").value;
  schoolDisplay.textContent = document.getElementById("school").value;
  emailDisplay.textContent = document.getElementById("email").value;

  // 전화번호 포맷 적용
  const phoneNumber = document.getElementById("phone").value;
  phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
}

function formatPhoneNumber(number) {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return number;
}

function del() {
  // 확인 대화상자 표시
  const confirmation = confirm("정말로 회원을 탈퇴하시겠습니까?");

  if (confirmation) {
    $.ajax({
      url: "http://ip주소:포트번호/profil_del",
      type: "get", //default는 get이기 때문에 생략 가능.
      data: obj,
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          localStorage.clear(); // 로컬 스토리지 클리어
          alert("회원탈퇴가 완료되었습니다");
          location.href = "../../html/main/page.html";
        } else if (res.status == 100) {
          alert("네트워크 오류");
        }
      },
    });
  }
}
