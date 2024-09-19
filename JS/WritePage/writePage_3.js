const titleInput = document.getElementById('title');
const titleCharCountSpan = document.getElementById('titleCharCount');
const cancelButton = document.getElementById('cancelButton');
const fileInput = document.getElementById('file');
const fileInputName = document.querySelector('.file-input-name');
const confirmModal = document.getElementById('confirmModal');
const successModal = document.getElementById('successModal');
const confirmCancel = document.getElementById('confirmCancel');
const confirmOk = document.getElementById('confirmOk');
const successOk = document.getElementById('successOk');
const postForm = document.getElementById('postForm');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const quickSelectInputs = document.querySelectorAll('input[name="quickSelect"]');

// 글자 수 카운터
titleInput.addEventListener('input', updateTitleCharCount);

function updateTitleCharCount() {
  const charCount = titleInput.value.length;
  titleCharCountSpan.textContent = charCount;
}

// 모달 표시 함수
function showModal(modal) {
  modal.style.display = 'block';
}

// 모달 숨기기 함수
function hideModal(modal) {
  modal.style.display = 'none';
}

// 폼 리셋 함수
function resetForm() {
  postForm.reset();
  titleCharCountSpan.textContent = '0';
  fileInputName.textContent = '선택된 파일 없음';
  startDateInput.value = new Date().toISOString().split('T')[0];
  endDateInput.value = '';
  quickSelectInputs.forEach(input => input.checked = false);
}

// 오늘 날짜 설정
const today = new Date();
const todayString = today.toISOString().split('T')[0];
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

startDateInput.addEventListener('change', function () {
  endDateInput.min = this.value;
  validateAndAdjustDates();
});

endDateInput.addEventListener('change', validateAndAdjustDates);

quickSelectInputs.forEach(input => {
  input.addEventListener('change', function () {
    const startDate = new Date(startDateInput.value);
    let endDate = new Date(startDate);
    switch (this.value) {
      case '2weeks':
        endDate.setDate(startDate.getDate() + 13); // 14일째 되는 날
        break;
      case '1month':
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(startDate.getDate() - 1); // 1달 후 하루 전
        break;
      case '2months':
        endDate.setMonth(startDate.getMonth() + 2);
        endDate.setDate(startDate.getDate() - 1); // 2달 후 하루 전
        break;
    }

    startDateInput.value = startDate.toISOString().split('T')[0];
    endDateInput.value = endDate.toISOString().split('T')[0];
  });
});

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // 폼 데이터 생성
  const formData = new FormData(postForm);

  // 설문 데이터 수집
  const surveyData = [];
  const questions = document.querySelectorAll('.survey-question');

  questions.forEach((questionElement, questionIndex) => {
    const questionText = questionElement.querySelector('input').value;

    // 해당 질문에 맞는 옵션들만 선택하도록 querySelector 범위를 questionElement로 한정
    const options = Array.from(questionElement.querySelectorAll('.survey-option input'))
      .map(option => option.value); // 옵션 텍스트 수집

    // 질문 및 옵션 저장
    surveyData.push({
      question: questionText,
      options: options
    });
  });

  // surveyData를 문자열로 변환하여 formData에 추가
  formData.append('surveyData', JSON.stringify(surveyData));

  console.log('폼 데이터:', Object.fromEntries(formData));
  console.log('설문 데이터:', surveyData);

  // 성공 메시지 모달 표시
  showModal(successModal);
});

cancelButton.addEventListener('click', function () {
  showModal(confirmModal);
});

confirmCancel.addEventListener('click', function () {
  hideModal(confirmModal);
});

confirmOk.addEventListener('click', function () {
  resetForm();
  hideModal(confirmModal);
  window.location.href = "newThinkWrite.html";
});

successOk.addEventListener('click', function () {
  resetForm();
  hideModal(successModal);
});

fileInput.addEventListener('change', function () {
  if (this.files && this.files[0]) {
    fileInputName.textContent = this.files[0].name;
  } else {
    fileInputName.textContent = '선택된 파일 없음';
  }
});

// 설문 기능
let questionCount = 0;
const surveySection = document.getElementById('surveySection');
const addQuestionButton = document.getElementById('addQuestionButton');

// 질문 추가 기능
addQuestionButton.addEventListener('click', function () {
  questionCount++;
  const newQuestion = document.createElement('div');
  newQuestion.classList.add('survey-question');
  newQuestion.innerHTML = `
    <label for="surveyQuestion${questionCount}">질문 ${questionCount}</label>
    <input type="text" id="surveyQuestion${questionCount}" placeholder="설문 질문을 입력하세요" maxlength="200">
    <div id="optionsContainer${questionCount}">
      <div class="survey-option">
        <input type="text" name="surveyOptions${questionCount}[]" placeholder="옵션 1을 입력하세요">
        <button type="button" class="remove-option">삭제</button>
      </div>
    </div>
    <button type="button" id="addOptionButton${questionCount}" class="add-option-button">옵션 추가</button>
  `;

  surveySection.appendChild(newQuestion);

  // 새로 추가된 질문에 대한 옵션 추가 기능
  document.getElementById(`addOptionButton${questionCount}`).addEventListener('click', function () {
    const optionsContainer = document.querySelector(`#optionsContainer${questionCount}`);
    const optionCount = optionsContainer.querySelectorAll('.survey-option').length + 1;
    const newOption = document.createElement('div');
    newOption.classList.add('survey-option');
    newOption.innerHTML = `
      <input type="text" name="surveyOptions${questionCount}[]" placeholder="옵션 ${optionCount}을 입력하세요">
      <button type="button" class="remove-option">삭제</button>
    `;
    optionsContainer.appendChild(newOption);

    // 옵션 삭제 기능 추가
    newOption.querySelector('.remove-option').addEventListener('click', function () {
      optionsContainer.removeChild(newOption);
    });
  });
});

// 첫 질문 자동 추가
function addFirstQuestion() {
  questionCount++;
  const newQuestion = document.createElement('div');
  newQuestion.classList.add('survey-question');
  newQuestion.innerHTML = `
    <label for="surveyQuestion${questionCount}">질문 ${questionCount}</label>
    <input type="text" id="surveyQuestion${questionCount}" placeholder="설문 질문을 입력하세요" maxlength="200">
    <div id="optionsContainer${questionCount}">
      <div class="survey-option">
        <input type="text" name="surveyOptions${questionCount}[]" placeholder="옵션 1을 입력하세요">
        <button type="button" class="remove-option">삭제</button>
      </div>
    </div>
    <button type="button" id="addOptionButton${questionCount}" class="add-option-button">옵션 추가</button>
  `;

  surveySection.appendChild(newQuestion);

  // 새로 추가된 첫 질문에 대한 옵션 추가 기능
  document.getElementById(`addOptionButton${questionCount}`).addEventListener('click', function () {
    const optionsContainer = document.querySelector(`#optionsContainer${questionCount}`);
    const optionCount = optionsContainer.querySelectorAll('.survey-option').length + 1;
    const newOption = document.createElement('div');
    newOption.classList.add('survey-option');
    newOption.innerHTML = `
      <input type="text" name="surveyOptions${questionCount}[]" placeholder="옵션 ${optionCount}을 입력하세요">
      <button type="button" class="remove-option">삭제</button>
    `;
    optionsContainer.appendChild(newOption);

    // 옵션 삭제 기능 추가
    newOption.querySelector('.remove-option').addEventListener('click', function () {
      optionsContainer.removeChild(newOption);
    });
  });
}

// 첫 질문 자동으로 추가
addFirstQuestion();