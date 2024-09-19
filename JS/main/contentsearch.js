let resu = {};
const cards = [];
const SC_ID = localStorage.getItem("SC_ID");

function getlist() {
  obj = { SC_ID: SC_ID };
  $.ajax({
    url: "http://218.158.137.183:8080/contentSerch",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        setlist();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

// 각각의 섹션에 클릭 이벤트 리스너 추가
document.querySelectorAll(".settings-row").forEach((row, index) => {
  row.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      let section = "";
      if (index === 1) section = "참여유형";
      else if (index === 2) section = "등록자";
      else if (index === 3) section = "상태";
      console.log(`${section}에서 ${button.textContent} 버튼이 눌렸습니다.`);
    });
  });
});

// 날짜 계산 함수
function setStartDate(daysAgo) {
  // 종료일을 기준으로 daysAgo 만큼 전의 날짜를 구함
  const endDate = new Date(document.getElementById("endDate").value);
  if (isNaN(endDate.getTime())) {
    alert("유효한 종료 날짜를 선택해 주세요.");
    return;
  }

  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - daysAgo);

  // 계산한 시작 날짜를 startDate input에 반영
  document.getElementById("startDate").valueAsDate = startDate;
}

// 종료 날짜 변경 시, 시작 날짜 업데이트
function updateStartDate() {
  const selectedPeriod = document.querySelector('input[name="period"]:checked');
  if (selectedPeriod) {
    const daysAgo = parseInt(selectedPeriod.value);
    setStartDate(daysAgo);
  }
}
// 각 그룹별로 하나의 버튼만 선택되도록 설정하는 함수
function handleGroupSelection(clickedBtn, group) {
  // 해당 그룹 내에서 모든 버튼의 active 클래스를 제거
  const buttons = document.querySelectorAll(`[data-group="${group}"] .btn`);
  buttons.forEach((button) => button.classList.remove("active"));

  // 클릭된 버튼에만 active 클래스를 추가
  clickedBtn.classList.add("active");
}

document.querySelector(".settings-btn").addEventListener("click", function () {
  var advancedSettings = document.querySelector(".advanced-settings");

  if (advancedSettings.classList.contains("open")) {
    advancedSettings.style.maxHeight = advancedSettings.scrollHeight + "px"; // 현재 높이로 설정
    setTimeout(function () {
      advancedSettings.classList.remove("open");
      advancedSettings.style.maxHeight = "0"; // 접을 때 높이를 0으로 부드럽게
    }, 10);
  } else {
    advancedSettings.style.display = "block"; // 먼저 보여지게 하고
    setTimeout(function () {
      advancedSettings.classList.add("open");
      advancedSettings.style.maxHeight = advancedSettings.scrollHeight + "px"; // 높이를 콘텐츠에 맞게 조정
    }, 10); // 애니메이션 적용을 위한 약간의 지연 시간
  }
});

// 카드 데이터 (100개 예시)
let ty = "";
function setlist() {
  for (let i = 0; i < resu.length; i++) {
    switch (resu[i].Type_ID) {
      case 1:
        ty = "설문";
        break;
      case 2:
        ty = "투표";
        break;
      case 3:
        ty = "대화";
        break;
      default:
        break;
    }

    cards.push({
      index: resu[i].Notice_ID,
      title: resu[i].Title,
      author: resu[i].Name,
      date: resu[i].EndD,
      type: ty,
      participants: resu[i].People,
      likes: resu[i].Good,
      dislikes: resu[i].Bad,
      comments: resu[i].opinion,
    });
  }
  updateDisplay();
}

const itemsPerPage = 12; // 한 페이지에 보여줄 카드 개수
const paginationSize = 5; // 페이지네이션에 보여줄 페이지 번호 개수 (추가된 부분)
let currentPage = 1;

function displayCards(page) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.style.opacity = 0;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, cards.length);
  cardContainer.innerHTML = ""; // 기존 카드 제거
  for (let i = startIndex; i < endIndex; i++) {
    const cardHTML = `
    <div class="card" data-index="${cards[i].index}">
        <div class="card-header">
            <span class="type-tag">${cards[i].type}</span>
            <span class="new-content" style="color: #4CAF50; font-weight: 500;">New</span>
        </div>
        <div class="card-body">
            <h3 class="card-title">${cards[i].title}</h3>
            <p class="author">${cards[i].author}</p>
            <p class="date">${cards[i].date}</p>
        </div>
        <div class="card-footer">
            <span class="participants">
                <i class="fa fa-user"></i>
                <span>${cards[i].participants}</span>
            </span>
            <span class="likes">
                <i class="fa fa-thumbs-up"></i>
                <span>${cards[i].likes}</span>
            </span>
            <span class="dislikes">
                <i class="fa fa-thumbs-down"></i>
                <span>${cards[i].dislikes}</span>
            </span>
            <span class="comments">
                <i class="fa fa-comment"></i>
                <span>${cards[i].comments}</span>
            </span>
        </div>
    </div>
`;
    cardContainer.innerHTML += cardHTML;
  }

  // 카드에 클릭 이벤트 리스너 추가
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardIndex = this.getAttribute("data-index") - 1;
      const index = cards[cardIndex].index;
      switch (cards[cardIndex].type) {
        case "설문":
          location.href = `../../html/writePage/writedPage_3.html?key=${cards[cardIndex].index}`;
          break;
        case "투표":
          location.href = `../../html/writePage/writedPage_2.html?key=${cards[cardIndex].index}`;
          break;
        case "대화":
          location.href = `../../html/writePage/writedPage_1.html?key=${cards[cardIndex].index}`;
          break;
        default:
          break;
      }
      // 원하는 다른 동작을 여기에 추가하세요.
    });
  });

  setTimeout(() => {
    cardContainer.style.opacity = 1;
  }, 100); // 애니메이션 효과
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // 기존 페이지네이션 버튼 제거

  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const currentPageGroup = Math.floor((currentPage - 1) / paginationSize);

  // 처음으로 가기 버튼
  const firstPageBtn = document.createElement("li");
  firstPageBtn.innerHTML = `<button ${
    currentPage === 1 ? 'class="disabled"' : ""
  }>처음</button>`;
  firstPageBtn.addEventListener("click", () => {
    currentPage = 1;
    updateDisplay();
  });
  pagination.appendChild(firstPageBtn);

  // 이전 페이지 버튼
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

  // 현재 페이지 그룹의 페이지 번호 버튼들
  const startPage = currentPageGroup * paginationSize + 1;
  const endPage = Math.min(startPage + paginationSize - 1, totalPages);
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("li");
    pageBtn.innerHTML = `<button ${
      i === currentPage ? 'class="active"' : ""
    }>${i}</button>`;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      updateDisplay();
    });
    pagination.appendChild(pageBtn);
  }

  // 다음 페이지 버튼
  const nextBtn = document.createElement("li");
  nextBtn.innerHTML = `<button ${
    currentPage === totalPages ? 'class="disabled"' : ""
  }>&raquo;</button>`;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });
  pagination.appendChild(nextBtn);

  // 마지막으로 가기 버튼
  const lastPageBtn = document.createElement("li");
  lastPageBtn.innerHTML = `<button ${
    currentPage === totalPages ? 'class="disabled"' : ""
  }>마지막</button>`;
  lastPageBtn.addEventListener("click", () => {
    currentPage = totalPages;
    updateDisplay();
  });
  pagination.appendChild(lastPageBtn);

  // 현재 페이지 정보 업데이트
  document.getElementById("current-page-info"); // .innerText = `현재 페이지: ${currentPage} / ${totalPages}`;
}

function updateDisplay() {
  displayCards(currentPage);
  displayPagination();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const topBtn = document.getElementById("topBtn");
  if (window.pageYOffset > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

// 초기 로드 시 실행
getlist();
