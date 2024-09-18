const titleInput = document.getElementById("title");
const titleCharCountSpan = document.getElementById("titleCharCount");
const cancelButton = document.getElementById("cancelButton");
const fileInput = document.getElementById("file");
const fileInputName = document.querySelector(".file-input-name");
const confirmModal = document.getElementById("confirmModal");
const successModal = document.getElementById("successModal");
const confirmCancel = document.getElementById("confirmCancel");
const confirmOk = document.getElementById("confirmOk");
const successOk = document.getElementById("successOk");
const postForm = document.getElementById("postForm");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const quickSelectInputs = document.querySelectorAll(
  'input[name="quickSelect"]'
);
var obj = {};

titleInput.addEventListener("input", updateTitleCharCount);

function updateTitleCharCount() {
  const charCount = titleInput.value.length;
  titleCharCountSpan.textContent = charCount;
}

function showModal(modal) {
  modal.style.display = "block";
}

function hideModal(modal) {
  modal.style.display = "none";
}

function resetForm() {
  postForm.reset();
  titleCharCountSpan.textContent = "0";
  fileInputName.textContent = "선택된 파일 없음";
  startDateInput.value = new Date().toISOString().split("T")[0];
  endDateInput.value = "";
  quickSelectInputs.forEach((input) => (input.checked = false));
}

// 오늘 날짜 설정
const today = new Date();
const todayString = today.toISOString().split("T")[0];
startDateInput.min = todayString;
endDateInput.min = todayString;
startDateInput.value = todayString;

// 날짜 유효성 검사 및 자동 조정 함수
function validateAndAdjustDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    endDateInput.value = startDateInput.value;
  }
}

// 시작일 변경 이벤트
startDateInput.addEventListener("change", function () {
  endDateInput.min = this.value;
  validateAndAdjustDates();
});

// 종료일 변경 이벤트
endDateInput.addEventListener("change", validateAndAdjustDates);

// 빠른 선택 옵션 처리
quickSelectInputs.forEach((input) => {
  input.addEventListener("change", function () {
    const startDate = new Date(startDateInput.value);
    let endDate = new Date(startDate);

    switch (this.value) {
      case "2weeks":
        endDate.setDate(startDate.getDate() + 13); // 14일째 되는 날
        break;
      case "1month":
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(startDate.getDate() - 1); // 1달 후 하루 전
        break;
      case "2months":
        endDate.setMonth(startDate.getMonth() + 2);
        endDate.setDate(startDate.getDate() - 1); // 2달 후 하루 전
        break;
    }

    startDateInput.value = startDate.toISOString().split("T")[0];
    endDateInput.value = endDate.toISOString().split("T")[0];
  });
});

postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // FormData 생성
  const formData = new FormData(this);

  // name 값을 formData에 추가
  formData.append("name", localStorage.getItem("Name"));
  formData.append("SC_ID", localStorage.getItem("SC_ID"));

  // FormData를 JSON 객체로 변환
  const formDataObj = Object.fromEntries(formData.entries());

  // JSON으로 변환
  const jsonData = JSON.stringify(formDataObj);

  // JSON 데이터 콘솔에 출력
  console.log("JSON 데이터:", jsonData);

  // JSON 문자열을 객체로 파싱하여 name 값을 출력
  const parsedData = JSON.parse(jsonData);
  console.log(parsedData);

  $.ajax({
    url: "http://218.158.137.183:8080/writePage",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: parsedData,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.ID;
        showModal(successModal);
      } else if (res.status == 100) {
        emailfal();
      }
    },
  });
});

cancelButton.addEventListener("click", function () {
  showModal(confirmModal);
});

confirmCancel.addEventListener("click", function () {
  hideModal(confirmModal);
});

confirmOk.addEventListener("click", function () {
  resetForm();
  hideModal(confirmModal);

  window.location.href = "newThinkWrite.html"; // 이동할 페이지의 경로
});

successOk.addEventListener("click", function () {
  resetForm();
  hideModal(successModal);
});

fileInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    fileInputName.textContent = this.files[0].name;
  } else {
    fileInputName.textContent = "선택된 파일 없음";
  }
});
