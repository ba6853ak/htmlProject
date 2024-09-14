var ID_Input = document.getElementById("ID_Input");
var PW_Input = document.getElementById("PW_Input");
var toggleButton = document.getElementById("found");
let obj = {};
let resu = {};
autologin();

function getCookies(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function autologin() {
  if (getCookies("ID") != null && getCookies("ID") != "undefined") {
    ID_Input.value = getCookies("ID");
  }
  if (getCookies("pw") != null && getCookies("pw") != "undefined") {
    obj = {
      ID: getCookies("ID"),
      pw: getCookies("pw"),
    };
    //loginch();
  }
}

function togglePasswordVisibility() {
  if (PW_Input.type === "password") {
    PW_Input.type = "text";
    toggleButton.textContent = "숨기기";
  } else {
    PW_Input.type = "password";
    toggleButton.textContent = "보기";
  }
}

function Login_Button() {
  obj = {
    ID: ID_Input.value,
    pw: PW_Input.value,
  };
  loginch();
}

function loginch() {
  $.ajax({
    url: "http://218.158.137.183:8080/Login",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        loginsuc();
      } else if (res.status == 100) {
        logionfal();
      }
    },
  });
}

function loginsuc() {
  const remember = document.getElementById("remember-ID");
  const auto = document.getElementById("Auto-Login");

  if (remember.checked) {
    document.cookie = "ID=" + obj.ID + ";";
  }
  if (auto.checked) {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 5);
    let expires = " expires=" + date.toUTCString();

    document.cookie = "ID=" + obj.ID + ";" + expires;
    document.cookie = "pw=" + obj.pw + ";" + expires;
  }
  localStorage.setItem("SC_ID", resu[0]["SC_ID"]);
  localStorage.setItem("Name", resu[0]["Name"]);
  localStorage.setItem("Profile_Image", resu[0]["Profile_Image"]);

  location.href = "../../html/main/page.html";
}

function logionfal() {
  alert("로그인 실패");
  location.href = "Login.html";
}

function IDPW_Found() {
  location.href = "../Found/id.html";
}
