/*----------------------------------------
hamburger
----------------------------------------*/
// $(function () {
//   $(".hamburger").click(function () {
//     $(".header__nav").fadeToggle();
//     $(".hamburger").toggleClass("open");
//   });
// });
// $(function () {
//   $("").on("click", function () {
//     $("").fadeToggle();
//     $("").toggleClass("");
//   });
// });
$(".hamburger").click(function () {
  $(".header__nav").fadeToggle();
  $(".hamburger").toggleClass("open");
});

/*----------------------------------------
menu
----------------------------------------*/

$(function () {
  $("img.ChangePhoto").click(function () {
    var ImgSrc = $(this).attr("src");
    var ImgAlt = $(this).attr("alt");
    $("img#MainPhoto").attr({ src: ImgSrc, alt: ImgAlt });
    $("img#MainPhoto").hide();
    $("img#MainPhoto").fadeIn("slow");
    return false;
  });
});

/*----------------------------------------
slideshow
----------------------------------------*/
$(document).ready(function () {
  $("#slide").slick({
    autoplay: true,
    arrows: false,
    dots: true,
    dotsClass: "indicator",
  });
});

/*----------------------------------------
menuタブ切り替え
----------------------------------------*/
$(document).ready(function () {
  // タブクリック時の動作
  $(".menu__item").on("click", function () {
    $(".menu__item, .panel").removeClass("active");
    $(this).addClass("active");

    var targetTab = $(this).data("tab");
    $("#" + targetTab).addClass("active");
  });

  // URLのクエリパラメータからタブを設定
  const params = new URLSearchParams(window.location.search);
  const selectedTab = params.get("tab");

  if (selectedTab) {
    $(".menu__item, .panel").removeClass("active");

    // 該当のタブに active クラスを付与
    $(`.menu__item[data-tab="${selectedTab}"]`).addClass("active");
    $(`#${selectedTab}`).addClass("active");
  }
});
