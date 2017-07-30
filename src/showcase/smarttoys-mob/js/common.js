$(document).ready(function () {

  // Empty links prevent default
  $("a[href='#']").click(function (e) {
    e.preventDefault();
  });

  // Header search-field
  $(".header-search_btn").click(function () {
    $(".header-form").addClass("header-form-active");
    setTimeout(function () {
      $(".header-form_search").focus();
    }, 200);
  });
  $(".header-form_search").blur(function () {
    $(".header-form").removeClass("header-form-active");
  });

  // Footer search-field
  $(".footer-subscribe_btn").click(function () {
    $(".footer-form").addClass("footer-form-active");
    setTimeout(function () {
      $(".footer-form_search").focus();
    }, 300);
  });
  $(".footer-form_search").blur(function () {
    $(".footer-form").removeClass("footer-form-active");
  });

  // Catalog-filter
  $(".catalog-filter_btn").click(function () {
    $(this).parent().find(".catalog-filter_list").toggleClass("catalog-filter_list-open");
    $(this).find(".fa-angle-down, .fa-angle-up").toggleClass("hidden");
  });

  // Catalog more (demonstration script)
  $(".catalog_more-btn").click(function () {
    $(".catalog-hidden").removeClass("hidden");
  });

  // Main menu
  var subHeading = $(".main-menu_sub-heading");

  $(".main-nav_toggle").click(function () {
    $(".main-menu").addClass("main-menu-active");
    $("body").addClass("fixed-body");
    $(".modal-underlayer").addClass("modal-underlayer_active");
  });
  $(".main-menu_close").click(function () {
    $(".main-menu").removeClass("main-menu-active");
    $("body").removeClass("fixed-body");
    $(".modal-underlayer").removeClass("modal-underlayer_active");
  });

  subHeading.on("click", "a.main-menu_back", function () {
    var thisDataAttr = $(this).attr("data-back"),
        targetDataMenu = $("#" + thisDataAttr);
    if (targetDataMenu.hasClass("main-menu-catalog_sub-list")) {
      $(".main-menu-catalog_sub-list").addClass("main-menu_sub-list__hidden");
      $(".main-menu-catalog").removeClass("main-menu_sub-list__hidden").addClass("main-menu_sub-list__active");
      var currentHeading = $(".main-menu_sub-list__active .main-menu-list_title");
      setTimeout(function () {
        subHeading.html(currentHeading.html());
      }, 100);
    } else if (targetDataMenu.hasClass("main-menu-catalog")) {
      $(".main-menu-catalog").addClass("main-menu_sub-list__hidden").removeClass("main-menu_sub-list__active");
      $(".main-menu_sub-list").addClass("main-menu_sub-list__hidden");
      $(".main-menu_sub-heading").addClass("main-menu_sub-heading__hidden");
    }
  });

  $(".main-menu .menu-list-item a").click(function () {
    var thisAttr = $(this).attr("data-target"),
        targetMenu = $("#" + thisAttr);
    if (!!(thisAttr)) {
      $(".main-menu_sub-list").addClass("main-menu_sub-list__hidden").removeClass('main-menu_sub-list__active');
      targetMenu.removeClass("main-menu_sub-list__hidden").addClass("main-menu_sub-list__active");
      subHeading.removeClass("main-menu_sub-heading__hidden");
      var currentHeading = $(".main-menu_sub-list__active .main-menu-list_title");
      setTimeout(function () {
        subHeading.html(currentHeading.html());
      }, 100);
    }
  });

  // Main filter
  var filterItem = $(".main-filter-list_item");

  $(".filter-title_btn").click(function () {
    $("body").addClass("fixed-body");
    $(".modal-underlayer").addClass("modal-underlayer_active");
    $(".filter-title").addClass("hidden");
    $(".filter_sub-title").removeClass("hidden");
    $(".main-filter").removeClass("main-filter_hidden");
    $(".main-header-filter").addClass("main-header-filter_active");
  });

  $(".filter-title_apply").click(function () {
    $("body").removeClass("fixed-body");
    $(".modal-underlayer").removeClass("modal-underlayer_active");
    $(".filter-title").removeClass("hidden");
    $(".filter_sub-title").addClass("hidden");
    $(".main-filter").addClass("main-filter_hidden");
    $(".main-header-filter").removeClass("main-header-filter_active");
    $(".main-filter_sub-list").removeClass("main-filter_sub-list__open");
    $(".main-filter-list_item .fa-angle-down").addClass("hidden");
    $(".main-filter-list_item .fa-angle-right").removeClass("hidden");
  });

  filterItem.on("click", "a", function () {
    $(".main-filter-list_item .fa-angle-down").addClass("hidden");
    $(".main-filter-list_item .fa-angle-right").removeClass("hidden");
    $(this).find(".fa-angle-right").addClass("hidden");
    $(this).find(".fa-angle-down").removeClass("hidden");
    $(".main-filter_sub-list").removeClass("main-filter_sub-list__open");
    $(this).next().addClass("main-filter_sub-list__open");
  });

  filterItem.on("change", "input", function () {
    $(".filter-btn").addClass("filter-btn_active");
  });

  //--- Slider for filter
  var filterRange = $(".main-filter_range-slider").slider({
    range: true,
    step: 1,
    min: 40,
    max: 10000,
    tooltip: 'hide',
    value: [40, 10000]
  });
  filterRange.on('change', function (value) {
    $(".min-slider_value").html(value.value.newValue[0]);
    $(".max-slider_value").html(value.value.newValue[1]);
  });

  // Catalog cart
  $(".catalog-item-descr_form-cart").on("click", function () {
    $(".header-cart").addClass("header-cart_active");
    var headerCartActive = $(".header-cart_active");
    $(this).addClass("catalog-item-descr_form-cart-active").find(".icon-cart-inside").addClass("hidden");
    $(".catalog-item-descr_form-cart-active").find(".icon-cart-checked").removeClass("hidden");
    headerCartActive.find(".fa-shopping-cart").addClass("hidden");
    headerCartActive.find(".header-full_cart").removeClass("hidden");
  });

});
