let search = window.location.search;
let sp = search.split("=");
let obj = { sp: sp[1] };
const User_Name = localStorage.getItem("Name");
const dat_list = document.getElementById("dat_list");
const Title = document.getElementById("Title");
const Name = document.getElementById("Name");
const date = document.getElementById("date");
const content = document.getElementById("content");
const SEDate = document.getElementById("SEDate");
const Good = document.getElementById("good");
const Bad = document.getElementById("Bad");
const dat_text = document.getElementById("dat_text");
let resu = {};

getlist();
// 기타 이벤트 리스너
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

function getlist() {
  $.ajax({
    url: "http://218.158.137.183:8080/writedPage_3",
    type: "get", //default는 get이기 때문에 생략 가능.
    data: obj,
    dataType: "json",
    success: function (res) {
      if (res.status == 200) {
        resu = res.list;
        mainST();
        opinion();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}

function Date_Type(DateTime) {
  // Date 객체 생성
  const date = new Date(DateTime);

  // Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
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
              <button>수정</button>
              <button>삭제</button>
              <button>신고</button>
            </div>
          </div>`;

    dat_list.innerHTML += cardHTML;
  }
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
        obj = { sp: sp[1] };
        opinion();
      } else if (res.status == 100) {
        alert("네트워크 오류");
      }
    },
  });
}
