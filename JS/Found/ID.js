const inputField = document.getElementById("input-field");
const checkEmailButton = document.getElementById("check-email-button");
const errorMessage = document.getElementById("error-message");
const newFieldContainer = document.getElementById("new-field-container");
const timerElement = document.getElementById("timer");
let obj = {};
let resu;

function redirectToFindPw() {
  window.location.href = "pw.html";
}

document
  .getElementById("find-pw-tab")
  .addEventListener("click", redirectToFindPw);

checkEmailButton.addEventListener("click", () => {
  const emailValue = inputField.value.trim();

  if (emailValue === "") {
    errorMessage.textContent = "이메일을 입력해 주세요";
    errorMessage.style.display = "block";
  } else if (!emailValue.includes("@")) {
    errorMessage.textContent = "유효한 이메일 주소를 입력해 주세요";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    inputField.disabled = true;
    checkEmailButton.style.display = "none";
    obj = { email: emailValue };
    $.ajax({
      url: "http://218.158.137.183:8080/Email_Check",
      type: "get", //default는 get이기 때문에 생략 가능.
      data: obj,
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          resu = res.security;
          emailsuc();
        } else if (res.status == 100) {
          emailfal();
        }
      },
    });
  }
});

function emailsuc() {
  if (!document.getElementById("check_cord")) {
    const newField = document.createElement("div");
    newField.classList.add("input-group");
    newField.innerHTML =
      '<input type="text" id="check_cord" placeholder="새로운 입력란">';
    newFieldContainer.appendChild(newField);

    startTimer(600); // 10분 타이머 시작
    localStorage.setItem("email_Ckeck", resu);
  }
  alert("메일함을 확인해 주세요");
}

function emailfal() {
  alert("E-Mail인증에 실패했습니다.");
}

function startTimer(duration) {
  let timeRemaining = duration;
  const timerInterval = setInterval(() => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerElement.textContent = `남은 시간: ${minutes}:${seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "시간이 만료되었습니다.";
      document.getElementById("check_cord").disabled = true;
    }
  }, 1000);
}

function id_found() {
  const emailValue = inputField.value.trim();
  const check_cord = document.getElementById("check_cord").value; // 여기를 수정
  const email_Ckeck = localStorage.getItem("email_Ckeck");

  obj = { email: emailValue, check: check_cord, sec: email_Ckeck };
  $.ajax({
    url: "http://218.158.137.183:8080/id_Found",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.ID;
        checksuc();
      } else if (res.status == 100) {
        emailfal();
      }
    },
  });
}

function checksuc() {
  alert("인증에 성공했습니다.\n ID : " + resu);
  location.href = "../../html/main/page.html";
}

function emailfal() {
  alert("인증에 실패했습니다.");
}
