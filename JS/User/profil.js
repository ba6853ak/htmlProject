const editButton = document.querySelector(".edit-button");
const saveButton = document.querySelector(".save-button");
const inputs = document.querySelectorAll(".profile-info input");
const name = document.getElementById("name");
const birth = document.getElementById("birthdate");
const school = document.getElementById("school");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const nameDisplay = document.getElementById("name-r");
const schoolDisplay = document.getElementById("school-r");
const emailDisplay = document.getElementById("email-r");
const phoneDisplay = document.getElementById("phone-r");
const userName = localStorage.getItem("Name");
const deleteAccountButton = document.getElementById("deleteAccountButton");
let obj = { userName: userName };
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
            <li><a href="#" class="side active">프로필 수정</a></li>
            <li><a href="mypagePW.html" class="side">비밀번호 변경</a></li>
          </ul>
      `;
      } else if (res.status == 200) {
        sidebar.innerHTML = `
        <ul>
          <li><a href="#" class="side active">프로필 수정</a></li>
          <li><a href="mypagePW.html" class="side">비밀번호 변경</a></li>
          <li>
            <a href="../Admin/adminPageUserManage.html" class="side"
              >관리자 기능(관리자 전용)</a
            >
          </li>
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

function set() {
  // 입력 필드의 값을 오른쪽 프로필 섹션에 업데이트
  nameDisplay.textContent = document.getElementById("name").value;
  schoolDisplay.textContent = document.getElementById("school").value;
  emailDisplay.textContent = document.getElementById("email").value;

  // 전화번호 포맷 적용
  const phoneNumber = document.getElementById("phone").value;
  phoneDisplay.textContent = formatPhoneNumber(phoneNumber);

  // 입력 필드를 비활성화
  inputs.forEach((input) => (input.disabled = true));

  // "학교" 필드만 다시 비활성화
  document.getElementById("school").disabled = true;

  saveButton.disabled = true; // 저장 버튼 비활성화
  editButton.disabled = false; // 수정 버튼 활성화
}

function save() {
  obj = {
    userName: userName,
    name: name.value,
    birth: birth.value,
    email: email.value,
    phone: phone.value,
  };

  $.ajax({
    url: "http://ip주소:포트번호/profil_save",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        obj = { userName: userName };
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function input() {
  inputs.forEach((input) => {
    if (input.id !== "school") {
      input.disabled = false; // "학교" 필드를 제외한 다른 필드 활성화
    }
  });
  saveButton.disabled = false; // 저장 버튼 활성화
  editButton.disabled = true; // 수정 버튼 비활성화
}

// 전화번호 포맷 함수
function formatPhoneNumber(number) {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return number;
}

function Date_Type(DateTime) {
  // Date 객체 생성
  const date = new Date(DateTime);

  // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
}

function setprofil() {
  name.value = resu[0].Name;
  birth.value = Date_Type(resu[0].Birth);
  school.value = resu[0].SC_Name;
  email.value = resu[0].EMail;
  phone.value = resu[0].Phone;
  set();
}
