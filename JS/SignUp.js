function selectGender(gender) {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}
const monthSelect = document.getElementById("birth-month");
const daySelect = document.getElementById("birth-day");

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

// 년도와 월이 변경될 때 일자를 업데이트
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);