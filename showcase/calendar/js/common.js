"use strict";

function MakeItOnLoad() {
  var docBody = document.body;
  var betterBtn = document.getElementById('better-btn');
  var betterBtnSpan = betterBtn.querySelectorAll('#better-btn span');
  var monthBlockDay = document.querySelectorAll('.month-list__cell:not(.month-list__cell_disabled)');
  var clearBtn = document.getElementById('clear-btn');
  var everyMonthDay = document.querySelectorAll('.month-list__cell'); // Применение стилей или localStorage

  if (localStorage.getItem('body-bg')) {
    docBody.classList.add(localStorage.getItem('body-bg'));
    betterBtnSpan.forEach(function (item) {
      item.classList.toggle('hidden');
    });
  } // Смена фона у тела документа


  function bodyBgChange() {
    docBody.classList.toggle('body_better');
    betterBtnSpan.forEach(function (item) {
      item.classList.toggle('hidden');
    });

    if (docBody.classList.contains('body_better')) {
      localStorage.setItem('body-bg', 'body_better');
    } else {
      localStorage.removeItem('body-bg');
    }
  }

  betterBtn.addEventListener('click', bodyBgChange); // Смена цвета у дней недели при клике на него

  function dayMarking() {
    var thisId = this.getAttribute('id');
    this.classList.toggle('month-list__cell_marked');

    if (this.classList.contains('month-list__cell_marked')) {
      localStorage.setItem(thisId, thisId);
    } else {
      localStorage.removeItem(thisId);
    }
  } // Фокусировка на дне недели при наведении


  function dayFocusing() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.parentNode.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sibling = _step.value;

        if (!sibling.classList.contains('month-list__cell_marked')) {
          sibling.classList.add('month-list__cell_blured');
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.classList.remove('month-list__cell_blured');
  } // Размытие всех дней недели, кроме того, на который наведён курсор


  function dayBluring() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.parentNode.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var sibling = _step2.value;
        sibling.classList.remove('month-list__cell_blured');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } // Сброс всех настроек (пометки дней и фон)


  function clearAll() {
    monthBlockDay.forEach(function (item) {
      item.classList.remove('month-list__cell_marked');
      localStorage.clear();
    });

    if (docBody.classList.contains('body_better')) {
      betterBtnSpan.forEach(function (item) {
        item.classList.toggle('hidden');
      });
    }

    docBody.classList.remove('body_better');
  }

  monthBlockDay.forEach(function (item) {
    item.addEventListener('click', dayMarking);
    item.addEventListener('mouseenter', dayFocusing);
    item.addEventListener('mouseleave', dayBluring);
  });
  clearBtn.addEventListener('click', clearAll);
  var markedDaysInStorage = Object.keys(localStorage).filter(function (k) {
    return k !== 'body-bg' && document.getElementById(k);
  });
  markedDaysInStorage.forEach(function (item) {
    document.getElementById(item).classList.add('month-list__cell_marked');
  });
  cssVars({
    // Targets
    rootElement: document,
    onlyLegacy: false
  });
}

window.addEventListener('load', MakeItOnLoad);