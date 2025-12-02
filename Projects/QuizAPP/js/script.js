// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// Helper function to show/hide elements
function showElement(element) {
  element.classList.remove("opacity-0", "pointer-events-none", "scale-95");
  element.classList.add("animate-slide-up");
}

function hideElement(element) {
  element.classList.add("opacity-0", "pointer-events-none", "scale-95");
  element.classList.remove("animate-slide-up");
}

// Start button clicked
start_btn.onclick = () => {
  document.querySelector(".start_btn").style.display = "none";
  showElement(info_box);
};

// Exit button clicked
exit_btn.onclick = () => {
  hideElement(info_box);
  document.querySelector(".start_btn").style.display = "block";
};

// Continue button clicked
continue_btn.onclick = () => {
  hideElement(info_box);
  showElement(quiz_box);
  showQuetions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

// Restart quiz button clicked
restart_quiz.onclick = () => {
  showElement(quiz_box);
  hideElement(result_box);
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("opacity-100", "pointer-events-auto", "scale-100");
  next_btn.classList.add("opacity-0", "pointer-events-none", "scale-95");
};

// Quit quiz button clicked
quit_quiz.onclick = () => {
  window.location.reload();
};

// Next button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove(
      "opacity-100",
      "pointer-events-auto",
      "scale-100"
    );
    next_btn.classList.add("opacity-0", "pointer-events-none", "scale-95");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

// Show questions and options
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  que_text.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`;

  option_list.innerHTML = "";

  questions[index].options.forEach((option) => {
    const div = document.createElement("div");
    div.className =
      "option bg-blue-50 border-3 border-blue-900 px-4 py-3 text-base cursor-pointer transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:bg-blue-100 flex items-center justify-between neo-shadow-sm hover:shadow-none";
    div.innerHTML = `<span>${option}</span>`;
    option_list.appendChild(div);

    // Add click event listener
    div.addEventListener("click", function () {
      optionSelected(this);
    });
  });
}

// When user selects an option
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent.trim();
  let correcAns = questions[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns == correcAns) {
    userScore += 1;
    answer.classList.remove(
      "bg-blue-50",
      "border-blue-900",
      "hover:bg-blue-100"
    );
    answer.classList.add("bg-green-100", "border-green-700", "text-green-800");
    answer.innerHTML +=
      '<div class="flex items-center justify-center w-7 h-7 bg-green-200 border-2 border-green-700 rounded-full"><i class="fas fa-check text-green-700"></i></div>';
  } else {
    answer.classList.remove(
      "bg-blue-50",
      "border-blue-900",
      "hover:bg-blue-100"
    );
    answer.classList.add("bg-red-100", "border-red-700", "text-red-800");
    answer.innerHTML +=
      '<div class="flex items-center justify-center w-7 h-7 bg-red-200 border-2 border-red-700 rounded-full"><i class="fas fa-times text-red-700"></i></div>';

    // Auto select correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent.trim() == correcAns) {
        option_list.children[i].classList.remove(
          "bg-blue-50",
          "border-blue-900"
        );
        option_list.children[i].classList.add(
          "bg-green-100",
          "border-green-700",
          "text-green-800"
        );
        option_list.children[i].innerHTML +=
          '<div class="flex items-center justify-center w-7 h-7 bg-green-200 border-2 border-green-700 rounded-full"><i class="fas fa-check text-green-700"></i></div>';
      }
    }
  }

  // Disable all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("pointer-events-none", "opacity-70");
  }

  // Show next button
  next_btn.classList.remove("opacity-0", "pointer-events-none", "scale-95");
  next_btn.classList.add("opacity-100", "pointer-events-auto", "scale-100");
}

// Show result
function showResult() {
  hideElement(quiz_box);
  showElement(result_box);

  const scoreText = result_box.querySelector(".score_text");
  const iconElement = result_box.querySelector(".icon");

  let scoreTag;
  if (userScore > 3) {
    scoreTag = `<span class="flex items-center gap-1">and congrats! 🎉 You got <p class="font-bold text-green-600">${userScore}</p> out of <p class="font-bold">${questions.length}</p></span>`;
    iconElement.classList.add("animate-wiggle");
  } else if (userScore > 1) {
    scoreTag = `<span class="flex items-center gap-1">and nice 😎 You got <p class="font-bold text-blue-600">${userScore}</p> out of <p class="font-bold">${questions.length}</p></span>`;
  } else {
    scoreTag = `<span class="flex items-center gap-1">and sorry 😐 You got only <p class="font-bold text-red-600">${userScore}</p> out of <p class="font-bold">${questions.length}</p></span>`;
  }

  scoreText.innerHTML = scoreTag;
}

// Start timer
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      timeCount.textContent = "0" + timeCount.textContent;
    }

    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      timeText.classList.add("text-red-600", "font-bold");

      const allOptions = option_list.children.length;
      let correcAns = questions[que_count].answer;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent.trim() == correcAns) {
          option_list.children[i].classList.remove(
            "bg-blue-50",
            "border-blue-900"
          );
          option_list.children[i].classList.add(
            "bg-green-100",
            "border-green-700",
            "text-green-800"
          );
          option_list.children[i].innerHTML +=
            '<div class="flex items-center justify-center w-7 h-7 bg-green-200 border-2 border-green-700 rounded-full"><i class="fas fa-check text-green-700"></i></div>';
        }
      }

      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add(
          "pointer-events-none",
          "opacity-70"
        );
      }

      next_btn.classList.remove("opacity-0", "pointer-events-none", "scale-95");
      next_btn.classList.add("opacity-100", "pointer-events-auto", "scale-100");
    }
  }
}

// Start timer line
function startTimerLine(time) {
  const totalTime = 15;
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    const percentage = (time / (totalTime * 34.48)) * 100; // 34.48 ticks per second for 15 seconds
    time_line.style.width = percentage + "%";

    if (time > totalTime * 34.48) {
      clearInterval(counterLine);
    }
  }
}

// Question counter
function queCounter(index) {
  bottom_ques_counter.innerHTML = `<span class="flex items-center gap-1"><p class="font-medium">Question</p><p class="font-bold">${index}</p><p class="font-medium">of</p><p class="font-bold">${questions.length}</p></span>`;
}
