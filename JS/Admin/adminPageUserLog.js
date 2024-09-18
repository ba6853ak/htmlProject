const data = [
    { id: 1, username: '홍길동', action: '로그인', time: '2024-09-15 10:15', ip: '192.168.0.1' },
    { id: 2, username: '김철수', action: '로그아웃', time: '2024-09-15 12:00', ip: '192.168.0.2' },
    { id: 3, username: '이영희', action: '로그인', time: '2024-09-15 09:00', ip: '192.168.0.3' },
    { id: 4, username: '박민수', action: '로그아웃', time: '2024-09-15 11:30', ip: '192.168.0.4' },
    { id: 5, username: '최은지', action: '로그인', time: '2024-09-15 13:45', ip: '192.168.0.5' },
    { id: 6, username: '정지훈', action: '로그아웃', time: '2024-09-15 14:00', ip: '192.168.0.6' },
    { id: 7, username: '오준호', action: '로그인', time: '2024-09-15 10:00', ip: '192.168.0.7' },
    { id: 8, username: '이소라', action: '로그아웃', time: '2024-09-15 14:25', ip: '192.168.0.8' },
    { id: 9, username: '한승우', action: '로그인', time: '2024-09-15 08:50', ip: '192.168.0.9' },
    { id: 10, username: '이하늘', action: '로그아웃', time: '2024-09-15 16:10', ip: '192.168.0.10' },
    { id: 11, username: '장미', action: '로그인', time: '2024-09-15 11:25', ip: '192.168.0.11' },
    { id: 12, username: '조은지', action: '로그아웃', time: '2024-09-15 09:45', ip: '192.168.0.12' },
    { id: 13, username: '배수지', action: '로그인', time: '2024-09-15 15:30', ip: '192.168.0.13' },
    { id: 14, username: '이강인', action: '로그아웃', time: '2024-09-15 17:20', ip: '192.168.0.14' },
    { id: 15, username: '박지성', action: '로그인', time: '2024-09-15 14:45', ip: '192.168.0.15' },
    { id: 16, username: '손흥민', action: '로그아웃', time: '2024-09-15 18:00', ip: '192.168.0.16' },
    { id: 17, username: '김유신', action: '로그인', time: '2024-09-15 12:20', ip: '192.168.0.17' },
    { id: 18, username: '윤지후', action: '로그아웃', time: '2024-09-15 19:30', ip: '192.168.0.18' },
    { id: 19, username: '송해', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.19' },
    { id: 20, username: '유재석', action: '로그아웃', time: '2024-09-15 13:40', ip: '192.168.0.20' },
    { id: 21, username: '정국', action: '로그인', time: '2024-09-15 14:10', ip: '192.168.0.21' },
    { id: 22, username: 'RM', action: '로그아웃', time: '2024-09-15 16:20', ip: '192.168.0.22' },
    { id: 23, username: '뷔', action: '로그인', time: '2024-09-15 17:50', ip: '192.168.0.23' },
    { id: 24, username: '지민', action: '로그아웃', time: '2024-09-15 18:30', ip: '192.168.0.24' },
    { id: 25, username: '슈가', action: '로그인', time: '2024-09-15 12:40', ip: '192.168.0.25' },
    { id: 26, username: '제이홉', action: '로그아웃', time: '2024-09-15 11:50', ip: '192.168.0.26' },
    { id: 27, username: '아이유', action: '로그인', time: '2024-09-15 16:15', ip: '192.168.0.27' },
    { id: 28, username: '장기용', action: '로그아웃', time: '2024-09-15 19:00', ip: '192.168.0.28' },
    { id: 29, username: '박보검', action: '로그인', time: '2024-09-15 13:30', ip: '192.168.0.29' },
    { id: 30, username: '정해인', action: '로그아웃', time: '2024-09-15 18:45', ip: '192.168.0.30' },
    { id: 31, username: '김고은', action: '로그인', time: '2024-09-15 15:55', ip: '192.168.0.31' },
    { id: 32, username: '전지현', action: '로그아웃', time: '2024-09-15 19:10', ip: '192.168.0.32' },
    { id: 33, username: '수지', action: '로그인', time: '2024-09-15 14:00', ip: '192.168.0.33' },
    { id: 34, username: '유인나', action: '로그아웃', time: '2024-09-15 16:30', ip: '192.168.0.34' },
    { id: 35, username: '이동욱', action: '로그인', time: '2024-09-15 17:10', ip: '192.168.0.35' },
    { id: 36, username: '이승기', action: '로그아웃', time: '2024-09-15 13:15', ip: '192.168.0.36' },
    { id: 37, username: '박서준', action: '로그인', time: '2024-09-15 18:50', ip: '192.168.0.37' },
    { id: 38, username: '강다니엘', action: '로그아웃', time: '2024-09-15 14:40', ip: '192.168.0.38' },
    { id: 39, username: '조인성', action: '로그인', time: '2024-09-15 16:25', ip: '192.168.0.39' },
    { id: 40, username: '원빈', action: '로그아웃', time: '2024-09-15 19:45', ip: '192.168.0.40' },
    { id: 41, username: '배용준', action: '로그인', time: '2024-09-15 13:55', ip: '192.168.0.41' },
    { id: 42, username: '이병헌', action: '로그아웃', time: '2024-09-15 16:50', ip: '192.168.0.42' },
    { id: 43, username: '송혜교', action: '로그인', time: '2024-09-15 17:45', ip: '192.168.0.43' },
    { id: 45, username: '강소라', action: '로그인', time: '2024-09-15 14:25', ip: '192.168.0.45' },
    { id: 46, username: '김태희', action: '로그아웃', time: '2024-09-15 15:00', ip: '192.168.0.46' },
    { id: 47, username: '정우성', action: '로그인', time: '2024-09-15 13:20', ip: '192.168.0.47' },
    { id: 48, username: '하정우', action: '로그아웃', time: '2024-09-15 14:10', ip: '192.168.0.48' },
    { id: 49, username: '이정재', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.49' },
    { id: 1, username: '홍길동', action: '로그인', time: '2024-09-15 10:15', ip: '192.168.0.1' },
    { id: 2, username: '김철수', action: '로그아웃', time: '2024-09-15 12:00', ip: '192.168.0.2' },
    { id: 3, username: '이영희', action: '로그인', time: '2024-09-15 09:00', ip: '192.168.0.3' },
    { id: 4, username: '박민수', action: '로그아웃', time: '2024-09-15 11:30', ip: '192.168.0.4' },
    { id: 5, username: '최은지', action: '로그인', time: '2024-09-15 13:45', ip: '192.168.0.5' },
    { id: 6, username: '정지훈', action: '로그아웃', time: '2024-09-15 14:00', ip: '192.168.0.6' },
    { id: 7, username: '오준호', action: '로그인', time: '2024-09-15 10:00', ip: '192.168.0.7' },
    { id: 8, username: '이소라', action: '로그아웃', time: '2024-09-15 14:25', ip: '192.168.0.8' },
    { id: 9, username: '한승우', action: '로그인', time: '2024-09-15 08:50', ip: '192.168.0.9' },
    { id: 10, username: '이하늘', action: '로그아웃', time: '2024-09-15 16:10', ip: '192.168.0.10' },
    { id: 11, username: '장미', action: '로그인', time: '2024-09-15 11:25', ip: '192.168.0.11' },
    { id: 12, username: '조은지', action: '로그아웃', time: '2024-09-15 09:45', ip: '192.168.0.12' },
    { id: 13, username: '배수지', action: '로그인', time: '2024-09-15 15:30', ip: '192.168.0.13' },
    { id: 14, username: '이강인', action: '로그아웃', time: '2024-09-15 17:20', ip: '192.168.0.14' },
    { id: 15, username: '박지성', action: '로그인', time: '2024-09-15 14:45', ip: '192.168.0.15' },
    { id: 16, username: '손흥민', action: '로그아웃', time: '2024-09-15 18:00', ip: '192.168.0.16' },
    { id: 17, username: '김유신', action: '로그인', time: '2024-09-15 12:20', ip: '192.168.0.17' },
    { id: 18, username: '윤지후', action: '로그아웃', time: '2024-09-15 19:30', ip: '192.168.0.18' },
    { id: 19, username: '송해', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.19' },
    { id: 20, username: '유재석', action: '로그아웃', time: '2024-09-15 13:40', ip: '192.168.0.20' },
    { id: 21, username: '정국', action: '로그인', time: '2024-09-15 14:10', ip: '192.168.0.21' },
    { id: 22, username: 'RM', action: '로그아웃', time: '2024-09-15 16:20', ip: '192.168.0.22' },
    { id: 23, username: '뷔', action: '로그인', time: '2024-09-15 17:50', ip: '192.168.0.23' },
    { id: 24, username: '지민', action: '로그아웃', time: '2024-09-15 18:30', ip: '192.168.0.24' },
    { id: 25, username: '슈가', action: '로그인', time: '2024-09-15 12:40', ip: '192.168.0.25' },
    { id: 26, username: '제이홉', action: '로그아웃', time: '2024-09-15 11:50', ip: '192.168.0.26' },
    { id: 27, username: '아이유', action: '로그인', time: '2024-09-15 16:15', ip: '192.168.0.27' },
    { id: 28, username: '장기용', action: '로그아웃', time: '2024-09-15 19:00', ip: '192.168.0.28' },
    { id: 29, username: '박보검', action: '로그인', time: '2024-09-15 13:30', ip: '192.168.0.29' },
    { id: 30, username: '정해인', action: '로그아웃', time: '2024-09-15 18:45', ip: '192.168.0.30' },
    { id: 31, username: '김고은', action: '로그인', time: '2024-09-15 15:55', ip: '192.168.0.31' },
    { id: 32, username: '전지현', action: '로그아웃', time: '2024-09-15 19:10', ip: '192.168.0.32' },
    { id: 33, username: '수지', action: '로그인', time: '2024-09-15 14:00', ip: '192.168.0.33' },
    { id: 34, username: '유인나', action: '로그아웃', time: '2024-09-15 16:30', ip: '192.168.0.34' },
    { id: 35, username: '이동욱', action: '로그인', time: '2024-09-15 17:10', ip: '192.168.0.35' },
    { id: 36, username: '이승기', action: '로그아웃', time: '2024-09-15 13:15', ip: '192.168.0.36' },
    { id: 37, username: '박서준', action: '로그인', time: '2024-09-15 18:50', ip: '192.168.0.37' },
    { id: 38, username: '강다니엘', action: '로그아웃', time: '2024-09-15 14:40', ip: '192.168.0.38' },
    { id: 39, username: '조인성', action: '로그인', time: '2024-09-15 16:25', ip: '192.168.0.39' },
    { id: 40, username: '원빈', action: '로그아웃', time: '2024-09-15 19:45', ip: '192.168.0.40' },
    { id: 41, username: '배용준', action: '로그인', time: '2024-09-15 13:55', ip: '192.168.0.41' },
    { id: 42, username: '이병헌', action: '로그아웃', time: '2024-09-15 16:50', ip: '192.168.0.42' },
    { id: 43, username: '송혜교', action: '로그인', time: '2024-09-15 17:45', ip: '192.168.0.43' },
    { id: 45, username: '강소라', action: '로그인', time: '2024-09-15 14:25', ip: '192.168.0.45' },
    { id: 46, username: '김태희', action: '로그아웃', time: '2024-09-15 15:00', ip: '192.168.0.46' },
    { id: 47, username: '정우성', action: '로그인', time: '2024-09-15 13:20', ip: '192.168.0.47' },
    { id: 48, username: '하정우', action: '로그아웃', time: '2024-09-15 14:10', ip: '192.168.0.48' },
    { id: 49, username: '이정재', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.49' },
                { id: 1, username: '홍길동', action: '로그인', time: '2024-09-15 10:15', ip: '192.168.0.1' },
    { id: 2, username: '김철수', action: '로그아웃', time: '2024-09-15 12:00', ip: '192.168.0.2' },
    { id: 3, username: '이영희', action: '로그인', time: '2024-09-15 09:00', ip: '192.168.0.3' },
    { id: 4, username: '박민수', action: '로그아웃', time: '2024-09-15 11:30', ip: '192.168.0.4' },
    { id: 5, username: '최은지', action: '로그인', time: '2024-09-15 13:45', ip: '192.168.0.5' },
    { id: 6, username: '정지훈', action: '로그아웃', time: '2024-09-15 14:00', ip: '192.168.0.6' },
    { id: 7, username: '오준호', action: '로그인', time: '2024-09-15 10:00', ip: '192.168.0.7' },
    { id: 8, username: '이소라', action: '로그아웃', time: '2024-09-15 14:25', ip: '192.168.0.8' },
    { id: 9, username: '한승우', action: '로그인', time: '2024-09-15 08:50', ip: '192.168.0.9' },
    { id: 10, username: '이하늘', action: '로그아웃', time: '2024-09-15 16:10', ip: '192.168.0.10' },
    { id: 11, username: '장미', action: '로그인', time: '2024-09-15 11:25', ip: '192.168.0.11' },
    { id: 12, username: '조은지', action: '로그아웃', time: '2024-09-15 09:45', ip: '192.168.0.12' },
    { id: 13, username: '배수지', action: '로그인', time: '2024-09-15 15:30', ip: '192.168.0.13' },
    { id: 14, username: '이강인', action: '로그아웃', time: '2024-09-15 17:20', ip: '192.168.0.14' },
    { id: 15, username: '박지성', action: '로그인', time: '2024-09-15 14:45', ip: '192.168.0.15' },
    { id: 16, username: '손흥민', action: '로그아웃', time: '2024-09-15 18:00', ip: '192.168.0.16' },
    { id: 17, username: '김유신', action: '로그인', time: '2024-09-15 12:20', ip: '192.168.0.17' },
    { id: 18, username: '윤지후', action: '로그아웃', time: '2024-09-15 19:30', ip: '192.168.0.18' },
    { id: 19, username: '송해', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.19' },
    { id: 20, username: '유재석', action: '로그아웃', time: '2024-09-15 13:40', ip: '192.168.0.20' },
    { id: 21, username: '정국', action: '로그인', time: '2024-09-15 14:10', ip: '192.168.0.21' },
    { id: 22, username: 'RM', action: '로그아웃', time: '2024-09-15 16:20', ip: '192.168.0.22' },
    { id: 23, username: '뷔', action: '로그인', time: '2024-09-15 17:50', ip: '192.168.0.23' },
    { id: 24, username: '지민', action: '로그아웃', time: '2024-09-15 18:30', ip: '192.168.0.24' },
    { id: 25, username: '슈가', action: '로그인', time: '2024-09-15 12:40', ip: '192.168.0.25' },
    { id: 26, username: '제이홉', action: '로그아웃', time: '2024-09-15 11:50', ip: '192.168.0.26' },
    { id: 27, username: '아이유', action: '로그인', time: '2024-09-15 16:15', ip: '192.168.0.27' },
    { id: 28, username: '장기용', action: '로그아웃', time: '2024-09-15 19:00', ip: '192.168.0.28' },
    { id: 29, username: '박보검', action: '로그인', time: '2024-09-15 13:30', ip: '192.168.0.29' },
    { id: 30, username: '정해인', action: '로그아웃', time: '2024-09-15 18:45', ip: '192.168.0.30' },
    { id: 31, username: '김고은', action: '로그인', time: '2024-09-15 15:55', ip: '192.168.0.31' },
    { id: 32, username: '전지현', action: '로그아웃', time: '2024-09-15 19:10', ip: '192.168.0.32' },
    { id: 33, username: '수지', action: '로그인', time: '2024-09-15 14:00', ip: '192.168.0.33' },
    { id: 34, username: '유인나', action: '로그아웃', time: '2024-09-15 16:30', ip: '192.168.0.34' },
    { id: 35, username: '이동욱', action: '로그인', time: '2024-09-15 17:10', ip: '192.168.0.35' },
    { id: 36, username: '이승기', action: '로그아웃', time: '2024-09-15 13:15', ip: '192.168.0.36' },
    { id: 37, username: '박서준', action: '로그인', time: '2024-09-15 18:50', ip: '192.168.0.37' },
    { id: 38, username: '강다니엘', action: '로그아웃', time: '2024-09-15 14:40', ip: '192.168.0.38' },
    { id: 39, username: '조인성', action: '로그인', time: '2024-09-15 16:25', ip: '192.168.0.39' },
    { id: 40, username: '원빈', action: '로그아웃', time: '2024-09-15 19:45', ip: '192.168.0.40' },
    { id: 41, username: '배용준', action: '로그인', time: '2024-09-15 13:55', ip: '192.168.0.41' },
    { id: 42, username: '이병헌', action: '로그아웃', time: '2024-09-15 16:50', ip: '192.168.0.42' },
    { id: 43, username: '송혜교', action: '로그인', time: '2024-09-15 17:45', ip: '192.168.0.43' },
    { id: 45, username: '강소라', action: '로그인', time: '2024-09-15 14:25', ip: '192.168.0.45' },
    { id: 46, username: '김태희', action: '로그아웃', time: '2024-09-15 15:00', ip: '192.168.0.46' },
    { id: 47, username: '정우성', action: '로그인', time: '2024-09-15 13:20', ip: '192.168.0.47' },
    { id: 48, username: '하정우', action: '로그아웃', time: '2024-09-15 14:10', ip: '192.168.0.48' },
    { id: 49, username: '이정재', action: '로그인', time: '2024-09-15 10:50', ip: '192.168.0.49' },
    { id: 50, username: '박해일', action: '로그아웃', time: '2024-09-15 18:00', ip: '192.168.0.50' }
];

const itemsPerPage = 10;
let currentPage = 1;
const paginationSize = 5;

function displayTableData(page) {
    start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.slice(start, end).forEach((item, index) => {
        const row = `<tr>
            <td>${start + index + 1}</td>
            <td>${item.id}</td>
            <td>${item.username}</td>
            <td>${item.action}</td>
            <td>${item.time}</td>
            <td>${item.ip}</td>
            <td>
                <button class="action-btn delete-btn">삭제</button>
            </td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function setupPagination() {
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const currentPageGroup = Math.floor((currentPage - 1) / paginationSize);
    const startPage = currentPageGroup * paginationSize + 1;
    const endPage = Math.min(startPage + paginationSize - 1, pageCount);

    // 처음으로 이동 버튼
    const firstPageBtn = document.createElement('li');
    firstPageBtn.innerHTML = `<button ${currentPage === 1 ? 'class="disabled"' : ''}>« 처음</button>`;
    firstPageBtn.addEventListener('click', () => {
        currentPage = 1;
        updateDisplay();
    });
    pagination.appendChild(firstPageBtn);

    // 이전 페이지 그룹으로 이동 버튼
    const prevBtn = document.createElement('li');
    prevBtn.innerHTML = `<button ${currentPage === 1 ? 'class="disabled"' : ''}>&laquo;</button>`;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });
    pagination.appendChild(prevBtn);

    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            updateDisplay();
        });
        li.appendChild(button);
        pagination.appendChild(li);
    }

    // 다음 페이지 그룹으로 이동 버튼
    const nextBtn = document.createElement('li');
    nextBtn.innerHTML = `<button ${currentPage === pageCount ? 'class="disabled"' : ''}>&raquo;</button>`;
    nextBtn.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            updateDisplay();
        }
    });
    pagination.appendChild(nextBtn);

    // 마지막 페이지로 이동 버튼
    const lastPageBtn = document.createElement('li');
    lastPageBtn.innerHTML = `<button ${currentPage === pageCount ? 'class="disabled"' : ''}>마지막 »</button>`;
    lastPageBtn.addEventListener('click', () => {
        currentPage = pageCount;
        updateDisplay();
    });
    pagination.appendChild(lastPageBtn);
}

function updateDisplay() {
    displayTableData(currentPage);
    setupPagination();
}

document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filter = document.getElementById('filter').value;
    const filteredData = data.filter(item => {
        const usernameMatch = item.username.toLowerCase().includes(searchInput);
        const ipMatch = item.ip.includes(searchInput);
        const actionMatch = filter === 'all' || item.action === filter;
        return (usernameMatch || ipMatch) && actionMatch;
    });

    data.length = 0;
    data.push(...filteredData);

    currentPage = 1;
    updateDisplay();
});

updateDisplay();