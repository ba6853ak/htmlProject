let search = window.location.search;
let sp = search.split("=");
const successModal = document.getElementById("successModal");
const warningModal = document.getElementById("warningModal");
const successOk = document.getElementById("successOk");
const warningOk = document.getElementById("warningOk");
const Good = document.getElementById("good");
const Bad = document.getElementById("Bad");
const to_list = document.getElementById("to_list");
const dat_list = document.getElementById("dat_list");
const User_Name = localStorage.getItem("Name");
let peo_count = 0;
let obj = { sp: sp[1], Name: User_Name };
let date;
let resu = {};
let pro_count = 0;

getlist();

// 모달 표시 함수
function showModal(modal) {
  modal.style.display = "block";
}

// 모달 숨기기 함수
function hideModal(modal) {
  modal.style.display = "none";
}

// 성공 모달 확인 버튼 처리
function submitVote() {
  input_to();
  hideModal(successModal);
}

// 경고 모달 확인 버튼 처리
warningOk.addEventListener("click", function () {
  hideModal(warningModal);
});

// 투표 결과 표시 함수
function showResults() {
  const voteContainer = document.querySelector(".votes-container-form");

  let resultsHTML = `
          <div class="vote-header-form">
              <img src="https://img.icons8.com/ios-filled/50/007bff/ballot.png" alt="투표 아이콘">
              <h2>투표 결과</h2>
          </div>

          <div class="vote-meta-form">
              <div>
                  <i class="fas fa-users"></i> 총 참여인원: &nbsp;<strong>${pro_count}명</strong>
              </div>
          </div>
      `;

  for (i = 0; i < resu.length; i++) {
    let count = resu[i].count_data;
    let percentage = ((count / pro_count) * 100).toFixed(2);
    resultsHTML += `
              <div class="vote-result-option">
                  <label>${resu[i].Content}</label>
                  <div class="progress-bar">
                      <div class="progress" style="width: ${percentage}%"></div>
                  </div>
                  <span>${count}명 (${percentage}%)</span>
              </div>
          `;
  }

  voteContainer.innerHTML = resultsHTML;
}

// // 기타 이벤트 리스너
// document.getElementById("star").addEventListener("click", function () {
//   this.querySelector("i").classList.toggle("clicked-star");
// });

// document.getElementById("heart").addEventListener("click", function () {
//   this.querySelector("i").classList.toggle("clicked-heart");
// });

// document.getElementById("comment").addEventListener("click", function () {
//   this.querySelector("i").classList.toggle("clicked-comment");
// });

const commentInput = document.querySelector(".comment-input");
const charCount = document.querySelector(".char-count");

commentInput.addEventListener("input", () => {
  charCount.textContent = `${commentInput.value.length}/1000`;
});

function Date_Type(DateTime) {
  // Date 객체 생성
  const date = new Date(DateTime);

  // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
}

function getlist() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_2",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        date = Date_Type(resu[0].StartD) + " ~ " + Date_Type(resu[0].EndD);
        writedPage_2_count();
        cheto();
        mainST();
        opinion();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function writedPage_2_count() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_2_count",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      console.log(res.list);
      if (res.status == 200) {
        peo_count = res.list;
        People_count.innerHTML = peo_count[0].answ + "명";
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}
function cheto() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_2_che",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        getto();
      } else if (res.status == 210) {
        list_to();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function list_to() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_2_che_li",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        list_count();
        showResults();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function list_count() {
  for (i = 0; i < resu.length; i++) {
    pro_count += resu[i].count_data;
  }
}

function getto() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_2_li",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        setto();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function setto() {
  to_list.innerHTML = "";
  for (let i = 0; i < resu.length; i++) {
    const cardHTML = `
    <div class="vote-option-form">
              <input type="radio" name="vote" id="option1" value=${resu[i].Content} />
              <label for="option1">${resu[i].Content}</label>
            </div>`;

    to_list.innerHTML += cardHTML;
  }
}

// 투표 제출 함수
function input_to() {
  const selectedVote = document.querySelector('input[name="vote"]:checked');
  console.log(selectedVote);
  obj = { sp: sp[1], answ: selectedVote.value, Name: User_Name };
  if (selectedVote) {
    $.ajax({
      url: "http://218.158.137.183:8080/writedPage_2_app",
      type: "get", //default는 get이기 때문에 생략 가능.
      data: obj,
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          resu = res.list;
          console.log(resu);
          obj = { sp: sp[1], Name: User_Name };
          list_to();
        } else if (res.status == 100) {
          alert("네트워크 오류");
        }
      },
    });
  } else {
    showModal(warningModal);
  }
}

function mainST() {
  Title.innerHTML = resu[0].Title;
  Name.innerHTML = resu[0].Name;
  date.innerHTML = Date_Type(resu[0].StartD);
  content.innerHTML = resu[0].Content;
  SEDate.innerHTML =
    "참여기간 : " + Date_Type(resu[0].StartD) + " ~ " + Date_Type(resu[0].EndD);

  Good.innerHTML = resu[0].Good;
  Bad.innerHTML = resu[0].Bad;
}

function goodbu() {
  let currentGood = parseInt(Good.innerHTML, 10);
  Good.innerHTML = currentGood + 1;
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_good",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        // Good.innerHTML = resu[0].Good;
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function badbu() {
  let currentBad = parseInt(Bad.innerHTML, 10);
  Bad.innerHTML = currentBad + 1;
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_bad",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        // Bad.innerHTML = resu[0].Bad;
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function opinion() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_opinion",
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

function setlist() {
  dat_list.innerHTML = "";
  for (let i = 0; i < resu.length; i++) {
    const cardHTML = `
    <div class="comment">
          <div>
            <span class="comment-author">${resu[i].Name}</span>
            <span class="comment-date">${Date_Type(resu[i].Date)}</span>
          </div>
          <div class="comment-content">
          ${resu[i].Opinion}
          </div>
          <div class="comment-actions">
            <button onclick="del(${resu[i].index_num})">삭제</button>
          </div>
        </div>`;

    dat_list.innerHTML += cardHTML;
  }
}

function del(index_num) {
  obj = { index_num: index_num };
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_opinion_del",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        dat_text.value = "";
        obj = { sp: sp[1], Name: User_Name };
        opinion();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function input() {
  obj = { sp: sp[1], dat_text: dat_text.value, Name: User_Name };
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_opinion_add",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        dat_text.value = "";
        obj = { sp: sp[1], Name: User_Name };
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}
