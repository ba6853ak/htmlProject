function togglePasswordVisibility() {
  var passwordInput = document.getElementById("userPassword");
  var toggleButton = document.getElementById("found");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "숨기기";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "보기";
  }
}
