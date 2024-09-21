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
    obj = { ID: input };
    $.ajax({
      url: "http://ip주소:포트번호/PW_ID_Check",
      type: "get", //default는 get이기 때문에 생략 가능.
      data: obj,
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          ID_Check_suc();
        } else if (res.status == 100) {
          ID_Check_fal();
        }
      },
    });
    // 비밀번호 찾기 관련 로직을 여기에 추가하세요.
  }
});

function ID_Check_suc() {
  alert("ID확인했습니다.");
  location.href = `../../html/Found/eMailChack.html`;
}

function ID_Check_fal() {
  alert("입력한 ID는 없는 ID입니다.");
}
