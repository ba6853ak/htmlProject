let filteredData = []; // 필터링된 데이터를 저장할 배열
let originalData = []; // 원본 데이터를 저장할 배열

// 데이터베이스에서 사용자 정보를 가져오는 함수
function fetchUsers() {
  return fetch("http://ip주소:포트번호/users") // 서버에서 사용자 데이터를 가져오는 API
    .then((response) => response.json())
    .then((fetchedData) => {
      originalData = fetchedData; // 가져온 데이터를 원본 배열에 저장
      filteredData = fetchedData; // 처음에는 필터링된 데이터도 동일하게 설정
      renderTable(filteredData); // 테이블에 데이터를 렌더링
      setupPagination(filteredData); // 페이지네이션 설정
    })
    .catch((error) => {
      console.error("데이터 로딩 중 오류:", error);
    });
}

// 필터링 함수
function filterUsersByKeyword(keyword, field) {
  if (keyword === "") {
    filteredData = originalData.slice(); // 전체 데이터
  } else {
    filteredData = originalData.filter((item) => {
      let content = "";
      if (field === "id") {
        content = item.ID; // 아이디 필드
      } else if (field === "name") {
        content = item.Name; // 이름 필드
      } else if (field === "email") {
        content = item.EMail; // 이메일 필드
      }

      if (field === "name") {
        const initials = extractInitials(content); // 초성 검색
        return initials.includes(keyword) || content.includes(keyword);
      } else {
        return content.includes(keyword); // 아이디와 이메일은 일반 검색
      }
    });
  }

  renderTable(filteredData); // 필터링된 데이터를 테이블에 렌더링
  setupPagination(filteredData); // 페이지네이션 갱신
}

// 테이블 렌더링 함수
function renderTable(data) {
  const tbody = document.getElementById("user-table-body");
  tbody.innerHTML = ""; // 기존 데이터를 모두 삭제
  // 데이터를 기반으로 테이블에 추가
  data.forEach((user, index) => {
    const genderText = user.Gender === 1 ? "남성" : "여성"; // 성별 값 변환
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${index + 1}</td>
            <td>${user.ID}</td>
            <td class="name-cell" data-id="${user.ID}" data-name="${
      user.Name
    }" data-birthday="${user.Birth}"
                data-gender="${genderText}" data-phone="${
      user.Phone
    }" data-email="${user.EMail}" 
                data-sc-id="${user.sc_id}"data-school="${user.schoolName}">${
      user.Name
    }</td> <!-- 여기에 SC_ID 추가 -->
            <td>${user.EMail}</td>
            <td>${user.Status || "활성"}</td>
            <td>

                <select class="role-select">
                    <option value="user" ${
                      user.Role === "user" ? "selected" : ""
                    }>일반 유저</option>
                    <option value="admin" ${
                      user.Role === "admin" ? "selected" : ""
                    }>관리자</option>
                </select>
            </td>
            <td>
                <button class="action-btn reset-btn">PW Reset</button>
                <button class="action-btn delete-btn">삭제</button>
            </td>
        `;
    tbody.appendChild(row);
  });

  // 권한이 변경되었을 때 서버로 권한 변경 요청 전송
  document.querySelectorAll(".role-select").forEach((select) => {
    select.addEventListener("change", function () {
      const userId =
        this.closest("tr").querySelector("td:nth-child(2)").textContent; // 수정된 부분
      const newRole = this.value;
      console.log(newRole);

      // 서버로 권한 변경 요청 전송
      fetch(`http://ip주소:포트번호/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      })
        .then((response) => {
          if (response.ok) {
            alert("권한이 성공적으로 변경되었습니다.");
          } else {
            alert("권한 변경 실패");
          }
        })
        .catch((error) => {
          console.error("권한 변경 중 오류 발생:", error);
        });
    });
  });

  // 프로필 보기 기능 (사용자 이름 클릭 시)
  document.querySelectorAll(".name-cell").forEach((cell) => {
    cell.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const name = this.getAttribute("data-name");
      const birthday = this.getAttribute("data-birthday");
      const gender = this.getAttribute("data-gender");
      const phone = this.getAttribute("data-phone");
      const email = this.getAttribute("data-email");
      const school = this.getAttribute("data-school"); // 학교 이름 가져오기

      // 모달창에 기본 사용자 정보 설정
      document.getElementById("modal-id").textContent = id;
      document.getElementById("modal-name").textContent = name;
      document.getElementById("modal-birthday").textContent = birthday;
      document.getElementById("modal-gender").textContent = gender;
      document.getElementById("modal-phone").textContent = phone;
      document.getElementById("modal-email").textContent = email;
      document.getElementById("modal-school").textContent = school; // 학교 이름 설정

      // 모달창을 화면에 표시
      document.getElementById("profile-modal").style.display = "flex";
    });
  });
}

// 페이지네이션 설정 함수
function setupPagination(data) {
  const itemsPerPage = 10;
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // 페이지네이션 초기화

  const pageCount = Math.ceil(data.length / itemsPerPage); // 페이지 수 계산
  if (pageCount === 0) return;

  let currentPage = 1; // 현재 페이지를 초기화

  function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    renderTable(data.slice(start, end)); // 현재 페이지에 맞는 데이터만 표시
  }

  function createPageButton(page) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = page;
    button.addEventListener("click", () => {
      currentPage = page;
      displayPage(currentPage);
    });
    li.appendChild(button);
    pagination.appendChild(li);
  }

  for (let i = 1; i <= pageCount; i++) {
    createPageButton(i);
  }

  displayPage(currentPage); // 첫 페이지 표시
}

// 필터 필드와 검색어에 맞게 필터링
document.getElementById("search-input").addEventListener("input", function () {
  const keyword = this.value.trim();
  const filterField = document.getElementById("filter-field").value; // 선택한 필터 필드
  filterUsersByKeyword(keyword, filterField); // 필터링 실행
});

// 페이지 로드 시 사용자 데이터를 가져오고 테이블에 표시
window.onload = function () {
  fetchUsers(); // 서버에서 사용자 데이터 가져오기
};

// 모달 닫기 기능
document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("profile-modal").style.display = "none";
});

// 삭제 버튼 로직 (이벤트 위임 방식 사용)
document
  .getElementById("user-table-body")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      // 클릭한 요소가 delete-btn 클래스인지 확인
      const row = event.target.closest("tr");
      const statusCell = row.querySelector("td:nth-child(5)"); // 상태가 있는 셀 (5번째 열)
      const status = statusCell.textContent.trim();

      if (status === "활성") {
        alert("활성 상태의 사용자는 삭제할 수 없습니다.");
      } else {
        const userId = row.querySelector("td:nth-child(2)").textContent; // 아이디가 있는 2번째 열에서 아이디 가져오기

        // 비활성 상태일 때 삭제 로직 수행
        if (confirm("정말 이 사용자를 삭제하시겠습니까?")) {
          fetch(`http://ip주소:포트번호/users/${userId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                alert("사용자 삭제 성공!");
                row.remove(); // 테이블에서 해당 행 제거
              } else {
                alert("사용자 삭제 실패");
              }
            })
            .catch((error) => {
              console.error("사용자 삭제 중 오류 발생:", error);
            });
        }
      }
    }
  });

// 랜덤한 8자리 비밀번호 생성 함수 (영어 소문자와 숫자 조합)
function generateRandomPassword() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// PW Reset 버튼 로직 (이벤트 위임 방식)
document
  .getElementById("user-table-body")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("reset-btn")) {
      // 클릭한 요소가 reset-btn 클래스인지 확인
      const row = event.target.closest("tr");
      const userId = row.querySelector("td:nth-child(2)").textContent; // 사용자 ID 가져오기

      // 랜덤한 비밀번호 생성
      const newPassword = generateRandomPassword();

      // 사용자에게 확인 메시지 출력
      if (
        confirm(
          `비밀번호를 재설정하시겠습니까? 새로운 비밀번호는 "${newPassword}" 입니다.`
        )
      ) {
        // 서버로 새로운 비밀번호 전송
        fetch(`http://ip주소:포트번호/users/${userId}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        })
          .then((response) => {
            if (response.ok) {
              alert("비밀번호가 성공적으로 재설정되었습니다.");
            } else {
              alert("비밀번호 재설정 실패");
            }
          })
          .catch((error) => {
            console.error("비밀번호 재설정 중 오류 발생:", error);
          });
      }
    }
  });
