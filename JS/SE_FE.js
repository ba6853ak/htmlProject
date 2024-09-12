const searchTerm = document.getElementById('searchInput');
var SC_li = [];

// 페이지가 로드될 때 URL에서 검색어를 가져와서 입력 필드에 설정
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const term = urlParams.get('term');
    if (term) {
        searchTerm.value = term.toLowerCase();
        getlist(term);
    }
    
};

// 검색 버튼 클릭 이벤트 리스너 설정
document.getElementById('searchButton').addEventListener('click', function() {
    const term = searchTerm.value.toLowerCase();
    getlist(term);
});

// 확인 버튼 클릭 이벤트 리스너 설정
document.getElementById('confirmButton').addEventListener('click', function() {
    const selectedValue = document.querySelector('input[name="searchResult"]:checked');
    if (selectedValue) {
        window.opener.postMessage(selectedValue.value, window.location.origin);
        window.close(); // 창을 닫음
    }
});

// 서버로부터 데이터를 가져오는 함수
function getlist(searchTerm) {
    $.ajax({
        url: 'http://localhost:3000/SE_SC',
        type: 'get',
        data: { 'SC': searchTerm },
        dataType: 'json',
        success: function(res) {
            if (res.status == 200) {
                SC_li = res.list; // 데이터 저장
                displayResults(SC_li); // 검색 결과 화면에 표시
            } else if (res.status == 100) {
                alert('검색 결과가 없습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error("An error occurred: " + error); // 에러 로깅
        }
    });
}

function displayResults(allResults) {
    const resultsContainer = document.getElementById('resultsList');
    const resultsDiv = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화
    resultsDiv.style.display = 'none';

    const searchTermValue = searchTerm.value.toLowerCase();
    // SC_Name 속성을 참조하여 검색어 포함 여부 검사
    const filteredResults = allResults.filter(result => result.SC_Name && result.SC_Name.toLowerCase().includes(searchTermValue));
    
    if (filteredResults.length > 0) {
        resultsDiv.style.display = 'block';
    }

    filteredResults.forEach((result, index) => {
        if (!result.SC_Name) return; // 'SC_Name' 속성이 없는 경우 추가하지 않음

        const listItem = document.createElement('li');
        listItem.className = 'result-box';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'searchResult';
        radioInput.id = `result${index}`;
        radioInput.value = result.SC_Name; // 객체의 'SC_Name' 속성 사용
        
        const label = document.createElement('label');
        label.setAttribute('for', `result${index}`);
        label.textContent = result.SC_Name; // 객체의 'SC_Name' 속성 사용
        
        listItem.appendChild(radioInput);
        listItem.appendChild(label);
        resultsContainer.appendChild(listItem);
    });
}

