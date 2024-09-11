const searchTerm = document.getElementById('searchInput');
var obj = {  };

function performSearch() {
    const resultsContainer = document.getElementById('resultsList');
    const resultsDiv = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화
    obj = { 'SC': searchTerm.value}
    getlist();
    // 예제 데이터
    const allResults = [
    ];
    
    // 검색어와 유사한 결과 필터링
    const filteredResults = allResults.filter(result => result.toLowerCase().includes(searchTerm));
    
    if (filteredResults.length > 0) {
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.style.display = 'none';
    }

    // 결과 표시
    filteredResults.forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'result-box';
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'searchResult';
        radioInput.id = `result${index}`;
        radioInput.value = result;
        
        const label = document.createElement('label');
        label.setAttribute('for', `result${index}`);
        label.textContent = result;
        
        listItem.appendChild(radioInput);
        listItem.appendChild(label);
        resultsContainer.appendChild(listItem);
    });
}

function getlist() {
    //어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임 어케 된거임
    $.ajax({
        url: 'http://localhost:3000/SE_SC',
        type: 'get',    //default는 get이기 때문에 생략 가능.
        data: obj,
        dataType: 'json',
        success: function(res) {
            if(res.status == 200) {
                resu = res.list;
                loginsuc()
                
            }
            else if(res.status == 100) {
                logionfal()
            }
        },
    })
}

document.getElementById('searchButton').addEventListener('click', function() {
    searchTerm.value.toLowerCase();
    performSearch();
});

document.getElementById('confirmButton').addEventListener('click', function() {
    const selectedValue = document.querySelector('input[name="searchResult"]:checked');
    if (selectedValue) {
        window.opener.postMessage(selectedValue.value, window.location.origin);
        window.close(); // 창을 닫음
    }
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('term') ? urlParams.get('term').toLowerCase() : '';
    document.getElementById('searchInput').value = searchTerm;
    if (searchTerm) {
        performSearch(searchTerm);
    }
};