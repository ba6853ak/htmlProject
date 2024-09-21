const itemsPerPage = 5;
let currentPage = 1;
let currentSearchField = ""; // 현재 검색 필드
let currentSearchTerm = ""; // 현재 검색어

// 서버에서 공지사항 불러오기
async function fetchNotices(searchField = "", searchTerm = "") {
  try {
    let url = "http://ip주소:포트번호/api/notices";

    // 검색어가 있으면 쿼리 파라미터 추가
    if (searchTerm) {
      url += `?field=${encodeURIComponent(
        searchField
      )}&term=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const notices = await response.json();
    return notices;
  } catch (error) {
    console.error("공지사항 불러오기 오류:", error);
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear(); // 년도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
  const day = date.getDate(); // 일

  let hours = date.getHours(); // 시
  const minutes = date.getMinutes(); // 분
  const ampm = hours >= 12 ? "오후" : "오전"; // 오전/오후 구분

  // 12시간제로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시일 경우 12시로 표시

  // 최종 포맷팅
  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시 ${minutes}분`;
}

// 페이지가 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  const originalDateElement = document.querySelector(".original-date");
  const formattedDateElement = document.querySelector(".formatted-date");

  // 날짜 포맷팅
  const formattedDate = formatDate(originalDateElement.textContent);
  formattedDateElement.textContent = formattedDate;
});

// 공지사항 목록 표시
// 공지사항 목록 표시
function displayNotices(notices, page) {
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const visibleNotices = notices.slice(start, end);

  const noticeList = document.getElementById("notice-list");
  noticeList.innerHTML = "";

  visibleNotices.forEach((notice) => {
    // 날짜 변환
    const formattedDate = formatDate(notice.date); // 날짜 변환 함수 호출

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <a href="noticePage.html?id=${notice.n_id}">
                <img src="https://cdn-icons-png.flaticon.com/512/565/565547.png" alt="알림 아이콘">
                ${notice.title} <span>${formattedDate}</span> <!-- 변환된 날짜 사용 -->
            </a>`;
    noticeList.appendChild(listItem);
  });
}

// 페이지네이션 설정
function setupPagination(notices) {
  const pageCount = Math.ceil(notices.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // 처음으로 가기 버튼
  const firstPageBtn = document.createElement("li");
  const firstButton = document.createElement("button");
  firstButton.textContent = "처음";
  firstButton.disabled = currentPage === 1;
  firstButton.addEventListener("click", () => {
    currentPage = 1;
    updateDisplay(currentSearchField, currentSearchTerm); // 검색어 유지
  });
  firstPageBtn.appendChild(firstButton);
  pagination.appendChild(firstPageBtn);

  // 이전 페이지 버튼
  const prevBtn = document.createElement("li");
  const prevButton = document.createElement("button");
  prevButton.textContent = "«";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay(currentSearchField, currentSearchTerm); // 검색어 유지
    }
  });
  prevBtn.appendChild(prevButton);
  pagination.appendChild(prevBtn);

  // 페이지 번호 버튼들
  const pageGroupSize = 5;
  const currentPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentPageGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, pageCount);

  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      updateDisplay(currentSearchField, currentSearchTerm); // 검색어 유지
    });
    if (i === currentPage) {
      button.classList.add("active");
    }
    li.appendChild(button);
    pagination.appendChild(li);
  }

  // 다음 페이지 버튼
  const nextBtn = document.createElement("li");
  const nextButton = document.createElement("button");
  nextButton.textContent = "»";
  nextButton.disabled = currentPage === pageCount;
  nextButton.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage++;
      updateDisplay(currentSearchField, currentSearchTerm); // 검색어 유지
    }
  });
  nextBtn.appendChild(nextButton);
  pagination.appendChild(nextBtn);

  // 마지막으로 가기 버튼
  const lastPageBtn = document.createElement("li");
  const lastButton = document.createElement("button");
  lastButton.textContent = "마지막";
  lastButton.disabled = currentPage === pageCount;
  lastButton.addEventListener("click", () => {
    currentPage = pageCount;
    updateDisplay(currentSearchField, currentSearchTerm); // 검색어 유지
  });
  lastPageBtn.appendChild(lastButton);
  pagination.appendChild(lastPageBtn);
}

// 검색 버튼 클릭 시 실행
document.querySelector("#noticeSearch").addEventListener("click", function () {
  const searchField = document.querySelector(".search-bar select").value;
  const searchTerm = document.querySelector(".search-bar input").value.trim();

  currentPage = 1; // 검색 시 첫 페이지로 이동
  currentSearchField = searchField; // 현재 검색 필드 저장
  currentSearchTerm = searchTerm; // 현재 검색어 저장

  if (searchTerm) {
    updateDisplay(searchField, searchTerm);
  } else {
    updateDisplay(); // 검색어가 없으면 전체 목록 표시
  }
});

// 업데이트 디스플레이 함수에 검색 필드와 검색어 전달
async function updateDisplay(searchField = "", searchTerm = "") {
  const notices = await fetchNotices(searchField, searchTerm);
  displayNotices(notices, currentPage);
  setupPagination(notices);
}

// 초기 표시 (검색어 없이 전체 목록 표시)
updateDisplay();
