const itemsPerPage = 10;
let currentPage = 1;
const paginationSize = 5;
let originalData = []; // 원본 데이터를 저장하는 배열
let filteredData = []; // 필터링된 데이터를 저장하는 배열

// 데이터베이스에서 로그인/로그아웃 기록을 가져오는 함수
function fetchLogs(page) {
  return fetch("http://ip주소:포트번호/logs") // 서버에서 데이터 가져오기
    .then((response) => response.json())
    .then((fetchedData) => {
      originalData = fetchedData; // 가져온 데이터를 원본 배열에 할당
      filteredData = fetchedData; // 처음에는 필터링된 데이터도 동일하게 설정

      // 페이지를 유지하면서 데이터 갱신
      updateDisplay(page || 1); // page 값이 없으면 첫 페이지로
    })
    .catch((error) => {
      console.error("데이터 로딩 중 오류:", error);
    });
}

// 테이블 데이터를 페이지에 맞게 표시하는 함수
function displayTableData(page) {
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  filteredData.slice(start, end).forEach((item, index) => {
    // Date 객체를 사용해 ISO 시간을 원하는 포맷으로 변환
    const formattedTime = new Date(item.timestamp).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const row = `<tr>
            <td>${item.log_id}</td>
            <td>${item.id}</td>
            <td>${item.username}</td>
            <td>${item.log_type}</td>
            <td>${formattedTime}</td>
            <td>${item.ip_address}</td>
            <td>
                <button class="action-btn delete-btn" data-id="${item.log_id}">삭제</button>
            </td>
        </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // 삭제 버튼에 이벤트 리스너 추가
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const logId = this.getAttribute("data-id");
      deleteLog(logId); // 로그 삭제 요청 함수 호출
    });
  });
}

// 로그 삭제 요청 함수
function deleteLog(logId) {
  if (confirm("정말 이 로그를 삭제하시겠습니까?")) {
    fetch(`http://ip주소:포트번호/logs/${logId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 삭제되면 다시 데이터 로드
          alert("로그 삭제 성공!");
          fetchLogs(currentPage); // currentPage를 유지하면서 데이터 갱신
        } else {
          alert("로그 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("로그 삭제 중 오류:", error);
      });
  }
}

// 페이지네이션 설정 함수
function setupPagination() {
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const currentPageGroup = Math.floor((currentPage - 1) / paginationSize);
  const startPage = currentPageGroup * paginationSize + 1;
  const endPage = Math.min(startPage + paginationSize - 1, pageCount);

  // 처음으로 이동 버튼
  const firstPageBtn = document.createElement("li");
  firstPageBtn.innerHTML = `<button ${
    currentPage === 1 ? 'class="disabled"' : ""
  }>« 처음</button>`;
  firstPageBtn.addEventListener("click", () => {
    currentPage = 1;
    updateDisplay();
  });
  pagination.appendChild(firstPageBtn);

  // 이전 페이지 그룹으로 이동 버튼
  const prevBtn = document.createElement("li");
  prevBtn.innerHTML = `<button ${
    currentPage === 1 ? 'class="disabled"' : ""
  }>&laquo;</button>`;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });
  pagination.appendChild(prevBtn);

  // 페이지 번호 버튼들
  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.toggle("active", i === currentPage);
    button.addEventListener("click", () => {
      currentPage = i;
      updateDisplay();
    });
    li.appendChild(button);
    pagination.appendChild(li);
  }

  // 다음 페이지 그룹으로 이동 버튼
  const nextBtn = document.createElement("li");
  nextBtn.innerHTML = `<button ${
    currentPage === pageCount ? 'class="disabled"' : ""
  }>&raquo;</button>`;
  nextBtn.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage++;
      updateDisplay();
    }
  });
  pagination.appendChild(nextBtn);

  // 마지막 페이지로 이동 버튼
  const lastPageBtn = document.createElement("li");
  lastPageBtn.innerHTML = `<button ${
    currentPage === pageCount ? 'class="disabled"' : ""
  }>마지막 »</button>`;
  lastPageBtn.addEventListener("click", () => {
    currentPage = pageCount;
    updateDisplay();
  });
  pagination.appendChild(lastPageBtn);
}

// 테이블 및 페이지네이션 갱신
function updateDisplay(page) {
  currentPage = page; // currentPage 값 업데이트
  displayTableData(currentPage); // 현재 페이지에 맞는 데이터 표시
  setupPagination(); // 페이지네이션 설정
}

// 페이지가 로드되면 서버에서 데이터를 가져와 테이블에 표시
window.onload = function () {
  fetchLogs(); // 서버에서 로그인/로그아웃 기록 불러오기
};

// 검색 및 필터링 기능
document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filter = document.getElementById("filter").value;

  // 필터 및 검색 조건에 맞는 데이터 필터링
  filteredData = originalData.filter((item) => {
    const usernameMatch = item.username.toLowerCase().includes(searchInput);
    const ipMatch = item.ip_address.includes(searchInput);
    const idMatch = item.id.toString().includes(searchInput); // 유저 아이디 검색 추가
    const actionMatch = filter === "all" || item.log_type === filter;
    return (usernameMatch || ipMatch || idMatch) && actionMatch; // 유저 아이디도 포함
  });

  currentPage = 1; // 검색 시 첫 페이지로 이동
  updateDisplay(currentPage); // currentPage를 명시적으로 전달
});
