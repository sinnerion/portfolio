$(function () {
  var popup = $('#request-form').html();
  $('.js-submit-request').popup({
    content: popup,
    type: 'html'
  });
});

$(document).on('click', '.js-send', function (e) {
  e.preventDefault();
  var parent = $(this).parent();
  if (formValid(parent)) {
    sendForm(parent);
  }
});

var formValid = function (parent) {
  var phone = parent.find('.js-input-phone');
  var email = parent.find('.js-input-email');
  var result = true;
  if (!phone.val()) {
    phone.addClass('error');
  }

  if (!phone.val()) {
    phone.addClass('error');
    result = false;
  } else {
    phone.removeClass('error');
  }

  if (!email.val() || !validateEmail(email.val())) {
    email.addClass('error');
    result = false;
  } else {
    email.removeClass('error');
  }

  return result;
};

var validateEmail = function (email) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return filter.test(email);
};

var sendForm = function (parent) {
  $.ajax({
    type: 'POST',
    url: './scripts/request.php',
    data: {
      phone: parent.find('.js-input-phone').val(),
      email: parent.find('.js-input-email').val()
    },
    success: function (data) {
      if (data) {
        parent.parent().find('.form-success').css('visibility', 'visible');
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
};
