window.addEventListener('load', function () {

  const docBody = document.getElementsByTagName('body');
  const betterBtn = document.querySelector('.btn_accent');
  const betterBtnSpan = betterBtn.querySelectorAll('span');
  const monthBlockDay = document.querySelectorAll('.month-list__cell:not(.month-list__cell_disabled)');
  const modalBlock = document.querySelector('.modal');
  const modalUnderlayer = document.querySelector('.modal-underlayer');
  let activeDays = [];

  if(localStorage.getItem('body-bg')) {
    docBody[0].classList.add(localStorage.getItem('body-bg'));
    betterBtnSpan.forEach(function (item) {
      item.classList.toggle('hidden');
    });
  }

  function bodyBgChange() {
    docBody[0].classList.toggle('body_better');
    betterBtnSpan.forEach(function (item) {
      item.classList.toggle('hidden');
    });
    if (docBody[0].classList.contains('body_better')) {
      localStorage.setItem('body-bg', 'body_better');
    } else {
      localStorage.removeItem('body-bg');
    }
  }

  betterBtn.addEventListener('click', bodyBgChange);

  Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  function dayMarking() {
    this.classList.toggle('month-list__cell_marked');
    if (this.classList.contains('month-list__cell_marked')) {
      activeDays.push(this.getAttribute('id'));
      for (let i = 0; i < activeDays.length; i++) {
        localStorage.setItem(`${activeDays[i]}`, activeDays[i]);
      }
    } else {
      activeDays.remove(this.getAttribute('id'));
      localStorage.removeItem(`${this.getAttribute('id')}`);
    }
  }

  function dayFocusing() {
    for (let sibling of this.parentNode.children) {
      if(!sibling.classList.contains('month-list__cell_marked')) {
        sibling.classList.add('month-list__cell_blured');
      }
    }
    this.classList.remove('month-list__cell_blured');
  }

  function dayBluring() {
    for (let sibling of this.parentNode.children) {
      sibling.classList.remove('month-list__cell_blured');
    }
  }

  monthBlockDay.forEach(function (item) {
    item.addEventListener('click', dayMarking);
    item.addEventListener('mouseenter', dayFocusing);
    item.addEventListener('mouseleave', dayBluring);
  });

  document.querySelector('#clear-btn').addEventListener('click', function () {
    monthBlockDay.forEach(function (item) {
      item.classList.remove('month-list__cell_marked');
      localStorage.clear();
    });
  });

  for(let i = 0; i < localStorage.length; i++) {
    let monthBlockDayMarked = document.getElementById(localStorage.getItem(localStorage.key(i)));
    if (localStorage.getItem(localStorage.key(i)) && localStorage.key(i) !== 'body-bg' && monthBlockDayMarked) {
      monthBlockDayMarked.classList.add('month-list__cell_marked');
    }
  }

});