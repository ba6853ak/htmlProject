const totalQuestions = 0;
let currentQuestion = 1;
let search = window.location.search;
let sp = search.split("=");
const User_Name = localStorage.getItem("Name");
let obj = { sp: sp[1], Name: User_Name };
let resu = {};
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

serch();
function serch() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_3_1",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        // 초기 상태 설정
        showQuestion(currentQuestion);
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function showQuestion(questionNumber) {
  console.log(questionNumber);
  // 진행률 업데이트
  const progressPercentage = ((questionNumber - 1) / resu.length) * 100;
  progressBar.style.width = progressPercentage + "%";
  progressText.textContent = Math.round(progressPercentage) + "%";

  question1.innerHTML = "";
  const cardHTML = `
      <div class="question-number">질문 ${questionNumber} / ${resu.length}</div>
            <h3>${resu[questionNumber - 1].Content}</h3>
            <div class="survey-options">
              <input type="text" name="answ" id="answ" placeholder="답변을 입력해 주세요" />
            </div>
            <div class="error-message" id="error"></div>`;

  question1.innerHTML += cardHTML;

  // 이전 버튼 활성화/비활성화
  if (questionNumber === 1) {
    prevButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
  }

  // 다음 버튼 텍스트 변경
  if (questionNumber === resu.length) {
    nextButton.textContent = "완료";
  } else {
    nextButton.textContent = "다음";
  }
}

function validateQuestion() {
  const answer = document.querySelector(`input[name="answ"]`).value.trim();
  return answer != "";
}

function showError(questionNumber, message) {
  document.getElementById("error").textContent = message;
}

function clearError(questionNumber) {
  document.getElementById("error").textContent = "";
}

function nextQuestion() {
  if (!validateQuestion()) {
    showError(currentQuestion, "답변을 입력해 주세요.");
    return;
  }
  clearError(currentQuestion);
  input();
  if (currentQuestion < resu.length) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    // 설문 완료 처리
    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    // 설문 모달 숨기고 완료 메시지 모달 표시
    document.getElementById("surveyModal").classList.add("hidden");
    document.getElementById("completionModal").classList.remove("hidden");
  }
}

function prevQuestion() {}

function closeSurvey() {
  // 완료 메시지 모달 숨기기
  document.getElementById("completionModal").classList.add("hidden");
  // 페이지 새로고침 또는 다른 동작 수행
  // location.reload(); // 페이지 새로고침
  // 또는 모달 완전히 제거
  document.getElementById("completionModal").remove();
  document.getElementById("surveyModal").remove();
  // 또는 필요한 경우 추가 작업 수행
  window.location.href = `writedPage_3.html?key=${sp[1]}`;
}

function input() {
  obj = {
    sp: sp[1],
    index: currentQuestion,
    Content: answ.value,
    Name: User_Name,
  };
  console.log(obj);
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_3_1_input",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        console.log(res.status);
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}
