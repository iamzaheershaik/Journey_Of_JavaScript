const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentSlide++;

  if (currentSlide === slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
});


