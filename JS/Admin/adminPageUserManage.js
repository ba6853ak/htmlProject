        // 프로필 보기 기능 (사용자 이름 클릭 시)
        document.querySelectorAll('.name-cell').forEach(cell => {
            cell.addEventListener('click', function () {
                const id = this.getAttribute("data-id");
                const name = this.getAttribute("data-name");
                const birthday = this.getAttribute("data-birthday");
                const gender = this.getAttribute("data-gender");
                const phone = this.getAttribute("data-phone");
                const email = this.getAttribute("data-email");

                document.getElementById("modal-id").textContent = id;
                document.getElementById("modal-name").textContent = name;
                document.getElementById("modal-birthday").textContent = birthday;
                document.getElementById("modal-gender").textContent = gender;
                document.getElementById("modal-phone").textContent = phone;
                document.getElementById("modal-email").textContent = email;

                document.getElementById("profile-modal").style.display = "flex";
            });
        });

        // 모달 닫기 기능
        document.getElementById("close-modal").addEventListener("click", function () {
            document.getElementById("profile-modal").style.display = "none";
        });





        let filteredData = Array.from(document.querySelectorAll('#user-table-body tr')); // 초기 데이터 저장
        const originalData = filteredData.slice(); // 원본 데이터 복사
    
        // 한글 초성 검색 함수
        function extractInitials(str) {
            const initials = [];
            const offset = 44032; // 한글의 시작 유니코드 값
            const initialConsonants = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    
            for (let i = 0; i < str.length; i++) {
                const code = str.charCodeAt(i) - offset;
                if (code >= 0 && code <= 11171) {
                    initials.push(initialConsonants[Math.floor(code / 588)]);
                } else {
                    initials.push(str[i]);
                }
            }
            return initials.join("");
        }
    
        // 검색 및 필터링 함수
        function filterUsersByKeyword(keyword, field) {
            const rows = originalData; // 원본 데이터 사용
            
            // 검색어가 비어있으면 전체 데이터를 보여줍니다.
            if (keyword === '') {
                filteredData = originalData.slice(); // 전체 데이터
            } else {
                filteredData = rows.filter(row => {
                    let cell;
                    // 필드에 맞는 셀 선택 (아이디, 이름, 이메일에 따라 다르게 처리)
                    if (field === "id") {
                        cell = row.querySelector("td:nth-child(2)"); // 아이디는 2번째 컬럼
                    } else if (field === "name") {
                        cell = row.querySelector("td.name-cell"); // 이름은 클래스가 name-cell
                    } else if (field === "email") {
                        cell = row.querySelector("td:nth-child(4)"); // 이메일은 4번째 컬럼
                    }
    
                    const content = cell ? cell.textContent.trim() : '';
    
                    if (field === "name") {
                        const initials = extractInitials(content); // 이름은 초성 검색
                        return initials.includes(keyword) || content.includes(keyword);
                    } else {
                        return content.includes(keyword); // 아이디나 이메일은 일반 검색
                    }
                });
            }
    
            // 테이블 초기화 및 다시 표시
            renderTable(filteredData);
            setupPagination(filteredData); // 페이지네이션 갱신
        }
    
        // 테이블 데이터 렌더링 함수
        function renderTable(data) {
            const tbody = document.getElementById('user-table-body');
            tbody.innerHTML = ''; // 기존 데이터를 모두 삭제
            
            // 필터링된 데이터를 기준으로 테이블에 추가
            data.forEach(row => {
                tbody.appendChild(row); // 필터링된 데이터 표시
            });
        }
    
        // 페이지네이션 버튼 생성 함수
        function setupPagination(data) {
            const itemsPerPage = 10;
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = ''; // 페이지네이션 초기화
    
            const pageCount = Math.ceil(data.length / itemsPerPage); // 페이지 수 계산
            if (pageCount === 0) return;
    
            let currentPage = 1; // 현재 페이지를 초기화
    
            function displayPage(page) {
                const start = (page - 1) * itemsPerPage;
                const end = page * itemsPerPage;
                renderTable(data.slice(start, end)); // 현재 페이지에 맞는 데이터만 표시
            }
    
            function createPageButton(page) {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = page;
                button.addEventListener('click', () => {
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
    
        // 페이지네이션 초기화
        setupPagination(originalData);