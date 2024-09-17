const errorMessage = document.getElementById("error-message");
const changePw = document.getElementById("changePw");

changePw.addEventListener("click", () => {
  let NP = document.getElementById("new-password").value;
  let CP = document.getElementById("confirm-password").value;

  if (NP.trim() == "") {
    errorMessage.textContent = "비밀번호를 입력해 주세요";
    errorMessage.style.display = "block";
  } else if (NP != CP) {
    errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
    errorMessage.style.display = "block";
  } else {
    let search = window.location.search;
    let sp = search.split("=");
    obj = { email: sp[1], pw: NP.trim() };
    $.ajax({
      url: "http://218.158.137.183:8080/pw_change",
      type: "get", //default는 get이기 때문에 생략 가능.
      data: obj,
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          checksuc();
        } else if (res.status == 100) {
          emailfal();
        }
      },
    });
  }
});

function checksuc() {
  alert("비밀번호가 변경되었습니다");
  location.href = "../../html/main/page.html";
}

function emailfal() {
  alert("비밀번호변경에 실패했습니다.");
}
