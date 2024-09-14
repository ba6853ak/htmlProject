const monthSelect = document.getElementById("birth-month");
const daySelect = document.getElementById("birth-day");
const buttons = document.querySelectorAll('.toggle-button') 
const Name = document.getElementById('Name');
let ID_SUC = 'none';
const ID = document.getElementById('ID');
const pw = document.getElementById('pw');
const pwConfirm = document.getElementById('pw-confirm');
const EMail = document.getElementById('EMail');
const Phone = document.getElementById('Phone');
var SC_ID = 0;
let ID_obj = { };
let obj = { };

function selectGender(gender) {;
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}


function updateDays() {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);

    if (!selectedYear || !selectedMonth) {
        daySelect.innerHTML = '<option value="">일</option>'; // 기본 상태로 초기화
        return;
    }

    // 월별로 최대 일수를 계산
    let daysInMonth;
    if (selectedMonth === 2) {
        // 2월: 윤년이면 29일, 아니면 28일
        daysInMonth = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(selectedMonth)) {
        // 4월, 6월, 9월, 11월: 30일
        daysInMonth = 30;
    } else {
        // 그 외 달: 31일
        daysInMonth = 31;
    }

    // 일 옵션을 업데이트
    daySelect.innerHTML = '<option value="">일</option>'; // 기존 일 옵션 제거
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day + "일";
        daySelect.appendChild(option);
    }
}

function ID_Check() {
    ID_obj = {
        'ID': ID.value
    }
    ID_DB_Check();
}

function ID_DB_Check() {
    $.ajax({
        url: 'http://218.158.137.183:8080/ID_Check',
        type: 'get',    //default는 get이기 때문에 생략 가능.
        data: ID_obj,
        dataType: 'json',
        success: function(res) {
            if(res.status == 200) {
                IDsuc()
                
            }
            else if(res.status == 100) {
                IDfal()
            }
        },
    })
}

function IDsuc() {
    ID_SUC = ID.value;
    alert('ID 중복 확인을 성공했습니다.')
}

function IDfal() {
    alert('이미 존재하는 ID입니다.')
}

// 년도와 월이 변경될 때 일자를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 유효성 검사 함수들
function validateName() {
    const NameRegex = /^[가-힣]+$/; // 한글 이름만 허용
    if (!NameRegex.test(Name.value)) {
        alert("이름은 한글만 입력 가능합니다.");
        Name.focus();
        return false;
    }
    return true;
}

function validateID() {
    const IDRegex = /^[a-z0-9]{4,12}$/; // 영어 소문자와 숫자, 4~12자
    if (!IDRegex.test(ID.value)) {
        alert("아이디는 영어 소문자와 숫자만 4~12자로 입력해야 합니다.");
        ID.focus();
        return false;
    }
    if (ID.value != ID_SUC) {
        alert("ID 중복 확인을 해주시길 바랍니다.");
        ID.focus();
        return false;
    }
    return true;
}

function validatepw() {
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;
    if (!pwRegex.test(pw.value)) {
        alert("비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해 10~20자로 입력하세요.");
        pw.focus();
        return false;
    }
    return true;
}

function validatepwConfirm() {
    if (pw.value !== pwConfirm.value) {
        alert("비밀번호가 일치하지 않습니다.");
        pwConfirm.focus();
        return false;
    }
    return true;
}

function validateEMail() {
    const EMailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMailRegex.test(EMail.value)) {
        alert("유효하지 않은 이메일 형식입니다.");
        EMail.focus();
        return false;
    }
    return true;
}

function validatePhone() {
    const PhoneRegex = /^\d{10,11}$/; // 10~11자리 숫자만
    if (!PhoneRegex.test(Phone.value.replace(/-/g, ''))) { // 하이픈 제거 후 검사
        alert("휴대전화 번호는 하이픈(-) 없이 10~11자리 숫자만 입력하세요.");
        Phone.focus();
        return false;
    }
    return true;
}

function validateBirthdate() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    if (!year || !month || !day) {
        alert("생년월일을 모두 선택해주세요.");
        yearSelect.focus();
        return false;
    }
    return true;
}

function validateGender() {
    let genderSelected = false;
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            genderSelected = true;
        }
    });
    if (!genderSelected) {
        alert("성별을 선택해주세요.");
        return false;
    }
    return true;
}

// Updated SignUp function to include gender and birthdate
function SignUp() {
    if (
        validateName() &&
        validateID() &&
        validatepw() &&
        validatepwConfirm() &&
        validateEMail() &&
        validatePhone() &&
        validateBirthdate() &&
        validateGender()
    ) {
        // Creating a Date object for birthdate
        const birthdate = new Date(yearSelect.value, monthSelect.value - 1, daySelect.value);

        // Determining gender from active button class
        let gender = null;
        buttons.forEach(button => {
            if (button.classList.contains('active')) {
                gender = button.id === 'maleButton' ? 0 : 1; // Assuming buttons have IDs 'maleButton' and 'femaleButton'
            }
        });

        obj = {
            'Name': Name.value,
            'ID': ID.value,
            'pw': pw.value,
            'EMail': EMail.value,
            'Phone': Phone.value,
            'SC_ID' : SC_ID,
            'Birthdate': birthdate,
            'Gender': gender
        };

        // Proceed with registration
        register();
    }
}

function register() {
    $.ajax({
        url: 'http://218.158.137.183:8080/register',
        type: 'get',    //default는 get이기 때문에 생략 가능.
        data: obj,
        dataType: 'json',
        success: function(res) {
            if(res.status == 200) {
                registerSuc()
                
            }
            else if(res.status == 100) {
                registerfal()
            }
        },
    })
}

function registerSuc() {
    alert('회원가입 성공')
    location.href='../../html/main/page.html';
}

function registerfal() {
    alert('회원가입 실패')
}

document.getElementById('SC_FD').addEventListener('click', function() {
    const searchTerm = document.getElementById('SC_TE').value;
    const popup = window.open(`./SE_FE.html?term=${encodeURIComponent(searchTerm)}`, '_blank', 'width=450,height=650');

    // 팝업 창이 닫힐 때 값을 받아오기 위한 이벤트 리스너
    window.addEventListener('message', function(event) {
        if (event.origin === window.location.origin) {
            console.log('학교 id: ', event.data.scId)
            SC_ID = event.data.scId;
            document.getElementById('SC_TE').value = event.data.value;
        }
    });
});