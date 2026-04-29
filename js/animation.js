/*----------------------------------------
  animation.js
  既存の script.js に影響を与えず
  アニメーションだけを追加するファイルです。
  読み込み順：script.js の後に追加してください。
----------------------------------------*/

$(document).ready(function () {

  /*----------------------------------------
    1. スクロールフェードイン（Intersection Observer）
       .js-fade / .js-fade-left / .js-fade-right
       クラスを HTML に付けるだけで動く
  ----------------------------------------*/
  const fadeTargets = document.querySelectorAll(
    ".js-fade, .js-fade-left, .js-fade-right"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // 一度だけ発火
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeTargets.forEach((el) => observer.observe(el));
  } else {
    // フォールバック：全部表示
    fadeTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /*----------------------------------------
    2. index.html の各セクションに
       フェードクラスを自動付与
       （HTML を直接編集しなくてよい）
  ----------------------------------------*/

  // NEWSセクション
  $(".news__inner").addClass("js-fade");
  $(".news__list").addClass("js-stagger");
  $(".news__item").addClass("js-fade");

  // Conceptセクション
  $(".Concept_text").addClass("js-fade-left");
  $(".Concept_img").addClass("js-fade-right");

  // Menuセクション（heading）
  $(".menu_inner .heading__h2").addClass("js-fade");

  // menu_list の各アイテム
  $(".menu_list").addClass("js-stagger");
  $(".menu_item").addClass("js-fade");

  // sub_img
  $(".sub_img").addClass("js-fade");

  // shop セクション
  $(".shop_contents").each(function (i) {
    $(this).addClass("js-fade");
    $(this).css("transition-delay", (i * 0.15) + "s");
  });

  // sns セクション
  $(".sns_contents").addClass("js-fade");

  // menu1.html のメニューリスト
  $(".menu1_list").addClass("js-stagger");
  $(".menu1_item").addClass("js-fade");

  // menu_detail の商品詳細
  $(".menu1_detail-img").addClass("js-fade-left");
  $(".menu1_detail-text").addClass("js-fade-right");

  // Observer を再実行（動的付与したクラスに対応）
  const newTargets = document.querySelectorAll(
    ".js-fade:not(.is-visible), .js-fade-left:not(.is-visible), .js-fade-right:not(.is-visible)"
  );
  if ("IntersectionObserver" in window) {
    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    newTargets.forEach((el) => observer2.observe(el));
  } else {
    newTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /*----------------------------------------
    3. 軽量パララックス（sub_img）
       スクロール量に応じて画像を少しずらす
  ----------------------------------------*/
  function parallax() {
    $(".sub_img img").each(function () {
      const rect = this.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0) {
        const offset = scrolled * 0.08; // 強さの調整（小さいほど控えめ）
        $(this).css("transform", "translateY(" + offset + "px)");
      }
    });
  }

  $(window).on("scroll.parallax", parallax);
  parallax(); // 初期実行

  /*----------------------------------------
    4. ナビ：スクロールでヘッダー背景を
       半透明ブラックに切り替え
  ----------------------------------------*/
  $(window).on("scroll.header", function () {
    if ($(window).scrollTop() > 80) {
      $(".header").css({
        "background-color": "rgba(0,0,0,0.75)",
        "backdrop-filter": "blur(6px)",
        "transition": "background-color 0.5s ease",
      });
    } else {
      $(".header").css({
        "background-color": "transparent",
      });
    }
  });

  /*----------------------------------------
    5. MV：スライド切り替え時にテキストを
       一瞬フェードさせる（Slick の after イベント）
  ----------------------------------------*/
  $("#slide").on("afterChange", function () {
    $(".mainvisual-text h1")
      .css({ opacity: 0, transform: "translateY(14px)" })
      .animate({ opacity: 1 }, {
        duration: 600,
        step: function (now) {
          const y = 14 * (1 - now);
          $(this).css("transform", "translateY(" + y + "px)");
        },
      });
  });

  /*----------------------------------------
    6. ページ遷移：クリック時にフェードアウト
  ----------------------------------------*/
  // フェードイン（ページ表示時）
  $("body").css({ opacity: 0 }).animate({ opacity: 1 }, 500);

  // リンククリック時にフェードアウトしてから遷移
  $(document).on("click", "a[href]", function (e) {
    const href = $(this).attr("href");
    // 外部リンク・アンカーリンク・空は除外
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto")
    ) {
      return;
    }
    e.preventDefault();
    $("body").animate({ opacity: 0 }, 300, function () {
      window.location.href = href;
    });
  });

});
