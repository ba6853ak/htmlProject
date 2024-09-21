const titleInput = document.getElementById("title");
const titleCharCountSpan = document.getElementById("titleCharCount");
const cancelButton = document.getElementById("cancelButton");
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

// 글자 수 카운터
titleInput.addEventListener("input", updateTitleCharCount);

function updateTitleCharCount() {
  const charCount = titleInput.value.length;
  titleCharCountSpan.textContent = charCount;
}

// 모달 표시 함수
function showModal(modal) {
  modal.style.display = "block";
}

// 모달 숨기기 함수
function hideModal(modal) {
  modal.style.display = "none";
}

// 폼 리셋 함수
function resetForm() {
  postForm.reset();
  titleCharCountSpan.textContent = "0";
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

// 날짜 유효성 검사 및 자동 조정
function validateAndAdjustDates() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    endDateInput.value = startDateInput.value;
  }
}

startDateInput.addEventListener("change", function () {
  endDateInput.min = this.value;
  validateAndAdjustDates();
});

endDateInput.addEventListener("change", validateAndAdjustDates);

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

  // localStorage에서 SC_ID와 Name 값 가져오기
  const storedName = localStorage.getItem("Name") || "유근형"; // 기본 값 설정
  const schoolId = localStorage.getItem("SC_ID") || "110"; // 기본 값 설정

  // 폼 요소가 제대로 선택되었는지 확인
  if (!postForm) {
    console.error("폼이 선택되지 않았습니다. 선택자를 확인하세요.");
    return; // 폼이 없을 경우 함수를 중지
  } else {
    console.log("폼이 제대로 선택되었습니다.");
  }

  // 설문 데이터를 수집 (surveySection에서 각 질문을 가져옴)
  let surveyData = [];
  document.querySelectorAll(".survey-question").forEach((question, index) => {
    const questionText = question.querySelector("input").value;
    surveyData.push({
      index: index + 1,
      questionText: questionText,
    });
  });

  // FormData 내용을 콘솔에 출력 (디버깅용)
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // AJAX를 통해 서버로 데이터 전송
  $.ajax({
    url: "http://ip주소:포트번호/writePage3", // 서버 URL
    type: "POST", // 전송 방식
    data: JSON.stringify({
      title: formData.get("title"), // FormData에서 title 가져오기
      content: formData.get("content"), // FormData에서 content 가져오기
      startDate: formData.get("startDate"), // FormData에서 startDate 가져오기
      endDate: formData.get("endDate"), // FormData에서 endDate 가져오기
      sc_id: schoolId, // localStorage에서 가져온 SC_ID 전송
      name: storedName, // localStorage에서 가져온 Name 전송
      survey: surveyData, // 설문 데이터 전송
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
  window.location.href = "newThinkWrite.html";
});

successOk.addEventListener("click", function () {
  resetForm();
  hideModal(successModal);

  location.href = "../main/contentsearch.html";
});

// 설문 기능 (옵션 기능 삭제)
let questionCount = 0;
const surveySection = document.getElementById("surveySection");
const addQuestionButton = document.getElementById("addQuestionButton");

// 질문 추가 기능
addQuestionButton.addEventListener("click", function () {
  questionCount++;
  const newQuestion = document.createElement("div");
  newQuestion.classList.add("survey-question");
  newQuestion.innerHTML = `
<div id="merge"><label for="surveyQuestion${questionCount}">질문 ${questionCount}</label>
<input type="text" id="surveyQuestion${questionCount}" placeholder="설문 질문을 입력하세요" maxlength="200"></div>
<div id="merge">
  <button type="button" class="delete-question-button button button-Third">질문 삭제</button>
</div>
`;
  surveySection.appendChild(newQuestion);
});

// 첫 질문 자동 추가
function addFirstQuestion() {
  questionCount++;
  const newQuestion = document.createElement("div");
  newQuestion.classList.add("survey-question");
  newQuestion.innerHTML = `
<div id="merge"><label for="surveyQuestion${questionCount}" >질문 ${questionCount}</label>
<input type="text" id="surveyQuestion${questionCount}" placeholder="설문 질문을 입력하세요" maxlength="200"></div>
<div id="merge">
  <button type="button" class="delete-question-button button button-Third">질문 삭제</button>
</div>
`;
  surveySection.appendChild(newQuestion);
}

// 첫 질문 자동으로 추가
addFirstQuestion();

// 이벤트 위임을 통해 동적으로 추가된 질문 삭제 기능 구현
surveySection.addEventListener("click", function (event) {
  if (
    event.target &&
    event.target.classList.contains("delete-question-button")
  ) {
    const question = event.target.closest(".survey-question");
    if (question) {
      question.parentElement.removeChild(question);
    }
  }
});
