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

const quickSelectInputs = document.querySelectorAll('input[name="quickSelect"]');


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

  e.preventDefault(); // 폼 기본 제출 기능 중지

  // FormData 객체 생성
  var formData = new FormData(postForm);

  const schoolId = localStorage.setItem("SC_ID", resu[0]["SC_ID"]);
  const storedName = localStorage.getItem("Name");
  /// const storedName = "유근형";
  /// const schoolId = 110;
  // 폼 요소가 제대로 선택되었는지 확인
  if (!postForm) {
    console.error("폼이 선택되지 않았습니다. 선택자를 확인하세요.");
  } else {
    console.log("폼이 제대로 선택되었습니다.");
  }

  // FormData 내용을 콘솔에 출력 (디버깅용)
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

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
    url: "http://localhost:3000/writePage_1", // 서버 URL
    type: "POST", // 전송 방식
    data: JSON.stringify({
      title: formData.get("title"),
      content: formData.get("content"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      sc_id: schoolId,
      name: storedName, // localStorage에서 가져온 Name을 전송
    }),
    contentType: "application/json", // JSON 데이터로 전송
    processData: false, // 데이터 처리하지 않음
    success: function (res) {
      if (res.status == 200) {
        showModal(successModal); // 성공 모달 표시
      } else {
        console.error("게시물 작성 실패:", res);
      }
    },
    error: function (xhr, status, error) {
      // 오류 처리 로직
      console.error("데이터 전송 중 오류 발생:", error);
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
