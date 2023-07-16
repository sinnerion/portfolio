$(function () {
  /* Отключение пустых ссылок (символ # в пути) */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* Dynamic age */
  Array.from(document.querySelectorAll(".about__age")).forEach(function(item){
    let myBirthDate;
    item.innerHTML=(myBirthDate="1992-04-19", ((new Date).getTime()-new Date(myBirthDate))/315576e5|0);
  });
  /* Dynamic age END */

  /* Main-nav toggling */
  const mainNav = $('.main-nav');
  const mainNavToggle = $('.main-nav-toggle');
  mainNavToggle.on('click', function () {
    $(this).toggleClass('main-nav-toggle_active');
    mainNav.fadeToggle();
    // mainNav.toggleClass('main-nav_active');
  });
  $(window).on('resize', function () {
    if($(window).width() > 767) {
      mainNav.removeAttr('style');
      mainNavToggle.removeClass('main-nav-toggle_active')
    }
  });
  /* Main-nav toggling END */

  /* Scroll-to links */
  const scrollToLink = $('a.scroll-to');
  scrollToLink.on('click', function (event) {
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html:not(:animated),body:not(:animated)").animate({
        scrollTop: $(hash).offset().top - 100
      }, 800);
      // history.pushState(null, null, this.hash);
    }
    return false;
  });
  /* Scroll-to links END */

  /* Theme changing */
  /* selectors */
  const themeToggleBtn = document.querySelector('.theme-toggle');

  /* state */
  const currentTheme = localStorage.getItem('theme');

  /* on mount */
  currentTheme && document.body.classList.add(currentTheme);

  /* handlers */
  const handleThemeToggle = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark-mode');
    } else {
      localStorage.removeItem('theme');
    }
  };

  /* events */
  themeToggleBtn.addEventListener('click', handleThemeToggle);
  /* Theme changing END */
});