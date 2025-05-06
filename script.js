const options = document.querySelectorAll(".option");
const question = document.getElementById("question");
const questions = document.getElementById("questions");
const welcomePage = document.getElementById("welcomePage");
const allRoadMaps = document.getElementById("allRoadMaps");
let k = 0;
let i = 0;
let o = 0;
let s = 0;
const skills = {
  0: "Drawing",
  1: "Cooking",
  2: "Coding",
  3: "Communication_Skills",
  4: "Poetry",
};
const total = {
  Drawing: 0,
  Cooking: 0,
  Coding: 0,
  Communication_Skills: 0,
  Poetry: 0,
};
let ansCount = 0;
const answer = [2, 3, 0, 1, 3, 2, 0, 3, 1, 3, 3, 0, 1, 0, 2];
let questionData = {};
initQuestions();
function initQuestions() {
  fetch("skillQuestions.json")
    .then((response) => response.json())
    .then((data) => {
      questionData = data;
    });
}

function questionPage() {
  welcomePage.style.display = "none";
  questions.style.display = "Block";
  nextQuestion();
}
function nextQuestion() {
  if (i == 5 && k == 0) {
    resultPage();
    return;
  }
  question.innerText = questionData[skills[i]][k].question;
  for (let j = 0; j < 4; j++) {
    options[j].innerText = `${j + 1}.) ${
      questionData[skills[i]][k].options[j]
    }`;
  }
  if (i != 0 || k != 0) {
    scoreCalc();
  }

  if (k < 2) {
    k++;
  } else {
    i++;
    k = 0;
  }
}

function resultPage() {
  const result = document.getElementById("result");
  const ans = document.getElementById("ans");
  const map = document.getElementById("roadMap");
  result.style.display = "block";
  map.style.display = "block";
  questions.style.display = "none";
  const maxVal = Object.entries(total).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max;
    },
    ["", -Infinity]
  );
  ans.innerText = maxVal[0];
  roadMap(maxVal);
}

function scoreCalc() {
  const selected = document.querySelector('input[name="Answer"]:checked');
  console.log(ansCount);
  console.log("Expected answer:", answer[ansCount]);
  if (answer[ansCount] == Number(selected.value)) {
    switch (o) {
      case 0:
        total.Drawing += 1;
        break;
      case 1:
        total.Cooking += 1;
        break;
      case 2:
        total.Coding += 1;
        break;
      case 3:
        total.Communication_Skills += 1;
        break;
      case 4:
        total.Poetry += 1;
        break;
    }
  }
  ansCount++;
  console.log(total);
  if (s < 2) {
    s++;
  } else {
    o++;
    s = 0;
  }
  setInterval(() => {
    selected.checked = false;
  }, 180);
}

function roadMap(maxVal) {
  const roadline = document.querySelectorAll(".roadline");
  const anss = document.getElementById("anss");
  anss.innerText = maxVal[0];
  let line = 0;
  fetch("roadMap.json")
    .then((response) => response.json())
    .then((data) => {
      for (let cont = 0; cont < 5; cont++) {
        roadline[line].innerText = data[maxVal[0]][cont].step;
        line++;
        roadline[line].innerText = data[maxVal[0]][cont].source;
        roadline[line].href = data[maxVal[0]][cont].source;
        line++;
      }
    });
}

function loadRoadmap() {
  welcomePage.style.display = "none";
  allRoadMaps.style.display = "Block";
}

function showRoadMap(skill) {
  const roadlines = document.querySelectorAll(".roadlines");
  const showroadmap = document.getElementById("showroadmap");
  const ansss = document.getElementById("ansss");
  allRoadMaps.style.display = "none";
  showroadmap.style.display = "block";
  ansss.innerText = skill;
  let line = 0;
  fetch("roadMap.json")
    .then((response) => response.json())
    .then((data) => {
      for (let cont = 0; cont < 5; cont++) {
        roadlines[line].innerText = data[skill][cont].step;
        line++;
        roadlines[line].innerText = data[skill][cont].source;
        roadlines[line].href = data[skill][cont].source;
        line++;
      }
    });
}
