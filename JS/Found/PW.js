const inputField = document.getElementById("input-field");
const findPwButton = document.getElementById("find-pw-button");
const errorMessage = document.getElementById("error-message");

function redirectToFindId() {
  window.location.href = "id.html";
}

document
  .getElementById("find-id-tab")
  .addEventListener("click", redirectToFindId);

findPwButton.addEventListener("click", () => {
  const input = inputField.value.trim();

  if (input === "") {
    errorMessage.textContent = "아이디를 입력해 주세요";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    alert("비밀번호 찾기 버튼이 클릭되었습니다!");
    // 비밀번호 찾기 관련 로직을 여기에 추가하세요.
  }
});
