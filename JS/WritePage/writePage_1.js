// DOM 요소 참조
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

// 제목 입력 필드의 문자 수 업데이트
titleInput.addEventListener("input", updateTitleCharCount);

function updateTitleCharCount() {
  const charCount = titleInput.value.length;
  titleCharCountSpan.textContent = charCount;
}

// 모달 창 표시 함수
function showModal(modal) {
  modal.style.display = "block";
}

// 모달 창 숨기기 함수
function hideModal(modal) {
  modal.style.display = "none";
}

// 폼 초기화 함수
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

// 시작일과 종료일의 유효성 검사 및 자동 조정 함수
function validateAndAdjustDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    endDateInput.value = startDateInput.value;
  }
}

// 시작일 변경 이벤트 리스너
startDateInput.addEventListener("change", function () {
  endDateInput.min = this.value;
  validateAndAdjustDates();
});

// 종료일 변경 이벤트 리스너
endDateInput.addEventListener("change", validateAndAdjustDates);

// 빠른 선택 옵션 처리 이벤트 리스너
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

// 폼 제출 이벤트 처리
postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var Obj = {};

  // AJAX를 통해 서버로 데이터 전송
  $.ajax({
    url: "http://218.158.137.183:8080/writePage_1",
    type: "POST",
    data: formData,
    processData: false, // jQuery가 데이터를 처리하지 않도록 설정
    contentType: false, // jQuery가 콘텐츠 타입을 설정하지 않도록 설정
    success: function (res) {
      if (res.status == 200) {
        showModal(successModal);
      } else if (res.status == 100) {
        showModal(successModal);
      }
    },
    error: function (xhr, status, error) {
      // 오류 처리 로직
      console.error("Error sending data: ", error);
    },
  });
});

// 취소 버튼 이벤트 처리
cancelButton.addEventListener("click", function () {
  showModal(confirmModal);
});

// 모달 취소 버튼 이벤트 처리
confirmCancel.addEventListener("click", function () {
  hideModal(confirmModal);
});

// 모달 확인 버튼 이벤트 처리
confirmOk.addEventListener("click", function () {
  resetForm();
  hideModal(confirmModal);
  window.location.href = "newThinkWrite.html"; // 이동할 페이지 경로
});

// 성공 모달 확인 버튼 이벤트 처리
successOk.addEventListener("click", function () {
  hideModal(successModal);
});

// 파일 입력 변경 이벤트 처리
fileInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    fileInputName.textContent = this.files[0].name;
  } else {
    fileInputName.textContent = "선택된 파일 없음";
  }
});
