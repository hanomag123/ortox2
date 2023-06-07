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

function hideaftertransition() {
  this.hidden = true
  this.removeEventListener('transitionend', hideaftertransition);
}

function doAPIcall(type, data='', url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
      var data = xmlhttp.responseText;
      if (callback) callback(data);
    }
  };
  xmlhttp.open(type, url, true);
  if (data) {
    xmlhttp.send(data);
    return
  }
  xmlhttp.send(data)
}


for (const form of document.forms) {
  form.addEventListener('submit', function () {
    if (this.dataset.id) {
      if (this.dataset.id === 'search') {
        return
      }
    }

    event.preventDefault();
    const formData = new FormData(this);
    doAPIcall('POST', formData, '/send.php', function(data) {
      console.log(data)
    })
    const parent = this.closest('.regModal');
    const feedback = document.querySelector('#feedback');

    for (const key of formData.entries()) {
      console.log(key);
    }

    this.reset();

    if (parent) {
      modalHandler.apply(parent);
    } else {
    }

    if (feedback) {
      modalHandler.apply(feedback);
    }
  });
}