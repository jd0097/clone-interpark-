window.addEventListener("load", function () {
  function parseBooks(_menu) {
    if (_menu === "MD's Pick") {
      fetch("data/books.json")
        .then((res) => res.json())
        .then((result) => makeList(result))
        .catch((err) => console.log(err));
    } else if (_menu === "베스트셀러") {
      fetch("data/books1.json")
        .then((res) => res.json())
        .then((result) => makeList(result))
        .catch((err) => console.log(err));
    } else if (_menu === "신간추천") {
      fetch("data/books2.json")
        .then((res) => res.json())
        .then((result) => makeList(result))
        .catch((err) => console.log(err));
    } else if (_menu === "특가할인") {
      fetch("data/books3.json")
        .then((res) => res.json())
        .then((result) => makeList(result))
        .catch((err) => console.log(err));
    }
  }

  parseBooks("MD's Pick");

  let btns = this.document.querySelectorAll(".books .btns a");
  let cateName = ["MD's Pick", "베스트셀러", "신간추천", "특가할인"];
  for (let i = 0; i < cateName.length; i++) {
    btns[i].onclick = function (event) {
      event.preventDefault();
      parseBooks(cateName[i]);
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove("btns-active");
      }

      this.classList.add("btns-active");
    };
  }

  let booksSwiper;
  function makeList(_idx) {
    let html = ``;
    for (let i = 0; i < _idx.books_count; i++) {
      let obj = _idx[`books_${i + 1}`];
      let temp = `
          <div class="swiper-slide">
              <a href="${obj.link}" class="books-link">
              <div class="books-img">
                  <img src="images/${obj.img}" alt="${obj.alt}" />
              </div>
              <div class="books-info">
                  <p class="books-info-title">${obj.title}</p>
                  <p class="books-info-price"><em>${obj.price}</em>원</p>
              </div>
              </a>
          </div>
        `;
      html += temp;
    }

    let swWrap = document.querySelector(".sw-books .swiper-wrapper");
    swWrap.innerHTML = html;

    if (booksSwiper) {
      booksSwiper.destroy();
    }
    booksSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
});
