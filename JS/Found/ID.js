const inputField = document.getElementById("input-field");
const checkEmailButton = document.getElementById("check-email-button");
const errorMessage = document.getElementById("error-message");
const newFieldContainer = document.getElementById("new-field-container");
const timerElement = document.getElementById("timer");

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

    if (!document.getElementById("new-field")) {
      const newField = document.createElement("div");
      newField.classList.add("input-group");
      newField.innerHTML =
        '<input type="text" id="new-field" placeholder="새로운 입력란">';
      newFieldContainer.appendChild(newField);

      startTimer(180); // 3분 타이머 시작
    }
    alert("메일함을 확인해 주세요");
  }
});

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
      document.getElementById("new-field").disabled = true;
    }
  }, 1000);
}
