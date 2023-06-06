document.addEventListener("DOMContentLoaded", () => {

  const xl = window.matchMedia('(max-width: 1024px)');

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { myFunction() };

  // Get the header
  var stickyhead = document.getElementById("stickyhead");

  // Get the offset position of the navbar
  var sticky = stickyhead.offsetTop;

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (currentScroll > sticky) {
      stickyhead.classList.add("--sticky");
    } else {
      stickyhead.classList.remove("--sticky");
    }
  }

  myFunction();

  class Menu {
    constructor(menuElement, buttonElement, header) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement
      this.buttons = this.menu.querySelectorAll('.closeMenuButtons');
      this.overlay = document.createElement('div');
      this.overlay.hidden = true
      this.header = header
      this._init();
    }

    _init() {
      this.header.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
      if (this.buttons.length) {
        this.buttons.forEach(el => {
          el.addEventListener('click', this.closeMenu.bind(this));
        });
      }
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('menu--open');
      this.button.classList.remove('menu-button--active');
      this.overlay.hidden = true

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      document.documentElement.style.overflow = 'hidden';
    }

    enableScroll() {
      document.documentElement.style.overflow = null;
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');
  const header = document.querySelector('.header');

  if (menu && menuButton && header) {
    new Menu(menu, menuButton, header);
  }

  const swipers = document.querySelectorAll('.sertificates__swiper');
  if (swipers.length) {
    swipers.forEach(el => {
      const numberOfSlides = el.querySelector('.swiper-slide');

      new Swiper(el, {
        loop: numberOfSlides > 3,
        speed: 400,
        slidesPerView: 'auto',
        spaceBetween: 0,
        navigation: {
          nextEl: el.parentElement.querySelector('.next'),
          prevEl: el.parentElement.querySelector('.prev'),
        },
      })
    })
  }

  const swipers2 = document.querySelectorAll('.specialists__swiper');
  if (swipers2.length) {
    swipers2.forEach(el => {
      new Swiper(el, {
        loop: true,
        speed: 400,
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        navigation: {
          nextEl: el.parentElement.querySelector('.next'),
          prevEl: el.parentElement.querySelector('.prev'),
        },
        pagination: {
          el: el.parentElement.querySelector('.swiper-pagination'),
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="actions-bullet swiper-pagination-bullet"></span>`;
          },
        },

        breakpoints: {

          501: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }
      })
    })
  }

  const swipers3 = document.querySelectorAll('.reviews__swiper');
  if (swipers3.length) {
    swipers3.forEach(el => {
        new Swiper(el, {
        loop: true,
        speed: 400,
        slidesPerView: 'auto',
        spaceBetween: 0,
        slidesPerGroup: 1,
        navigation: {
          nextEl: el.parentElement.querySelector('.next'),
          prevEl: el.parentElement.querySelector('.prev'),
        },
        pagination: {
          el: el.parentElement.querySelector('.swiper-pagination'),
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="actions-bullet swiper-pagination-bullet"></span>`;
          },
        },
        on: {
          transitionEnd: function () {
            const buttons = document.querySelectorAll('.reviews__swiper .swiper-slide');
            if (buttons.length) {
              buttons.forEach(el => el.classList.remove('hover'));
            }
          }
        },

        breakpoints: {

          1024: {
            slidesPerView: 'auto',
            slidesPerGroup: 3,
          },

          501: {
            slidesPerView: 'auto',
            slidesPerGroup: 2,
          },
        }
      })

    })
  }



  const buttons = document.querySelectorAll('.reviews__swiper .swiper-slide');

  function removeHover() {
    if (!event.target.closest('.hover')) {
      buttons.forEach(el => el.classList.remove('hover'));
      document.removeEventListener('click', removeHover);
    }

  }

  if (buttons.length) {
    buttons.forEach(el => {
      el.addEventListener('click', function () {
        if (!this.classList.contains('hover')) {
          buttons.forEach(el => el.classList.remove('hover'));
          this.classList.add('hover');
          document.addEventListener('click', removeHover);
        } else {
          buttons.forEach(el => el.classList.remove('hover'));
          document.removeEventListener('click', removeHover);
        }
      })
    })
  }


  const radioContainers = document.querySelectorAll('.radio-container');

  if (radioContainers.length) {
    radioContainers.forEach(function (radioContainer) {
      radioContainer.addEventListener('click', function () {
        radioContainers.forEach(function (container) {
          if (container !== radioContainer) {
            container.querySelector('input').checked = false;
          }
        });
      });
    });
  }

  let acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10);
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null);
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition);
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal');

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this);
        }
      });
      const closeButton = el.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          modalHandler.apply(el);
        });
      }
    });
  }

  const buttonsModal = document.querySelectorAll('[data-modal]');

  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  if (buttonsModal.length) {
    buttonsModal.forEach(el => el.addEventListener('click', modalHandler));

  }

  function addMask() {
    [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        this.parentElement.classList.remove('error');
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);

    });

  }
  addMask();

  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }



  const menuButtons = document.querySelectorAll('.menu__bot-list > li, .services-price__item');

  function removeOpen() {
    if (!event.target.closest('.open')) {
      buttons.forEach(el => el.classList.remove('open'));
      document.removeEventListener('click', removeOpen);
    }

  }

  if (menuButtons.length) {
    menuButtons.forEach(el => {
      el.addEventListener('click', function () {
        if (!this.classList.contains('open')) {
          menuButtons.forEach(el => el.classList.remove('open'));
          this.classList.add('open');
          document.addEventListener('click', removeOpen);
        } else {
          menuButtons.forEach(el => el.classList.remove('open'));
          document.removeEventListener('click', removeOpen);
        }
      })
    })
  }

  
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl, sel;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        sel = this.parentNode.previousSibling.classList.add('select-selected--active')
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  const priceButtons = document.querySelectorAll('.price-button');

  if (priceButtons.length) {
    priceButtons.forEach(el => {
      el.addEventListener('click', function () {
        this.classList.toggle('active');
      })
    })
  }

  let videoItems = document.querySelectorAll('.casePage-cure__videoContainer')

  videoItems.forEach(e => {
    const video = e.querySelector('video');
    video.addEventListener('click', () => {
      video.setAttribute('controls', 'true');
      e.classList.add('clicked');
    });
  
    video.addEventListener('ended', () => {
      e.classList.remove('clicked');
    });
  });

});








