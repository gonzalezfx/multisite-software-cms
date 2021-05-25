const htmlTag = $('html'),
  body = $('body'),
  ajaxLoader = $('.ajax-loader'),
  headerWrapper = $('.header-wrapper');

let headerPinned = false,
  headerScrolled = false,
  windowScroll = 0;

$(document).ready(function() {
  windowScroll = $(window).scrollTop();

  /*
   *  Mobile menu
   */
  body.on('click', '.menu-trigger', function(e) {
    let thisElement = $(this);
    let menu = $('.header-menu');

    if (!thisElement.hasClass('open')) {
      thisElement.addClass('open');
      headerWrapper.addClass('menu-open');
      menu
        .stop()
        .fadeOut(0)
        .fadeIn('fast')
        .addClass('open');
    } else {
      thisElement.removeClass('open');
      menu
        .stop()
        .fadeOut('fast')
        .removeClass('open');
      headerWrapper.removeClass('menu-open');
    }
  });

  body.on('click', '.header-menu.open a', function(e) {
    let buttonTrigger = $('.menu-trigger');
    let menu = $('.header-menu');

    if (!buttonTrigger.hasClass('open')) {
      buttonTrigger.addClass('open');
      menu
        .stop()
        .fadeOut(0)
        .fadeIn('fast')
        .addClass('open');
    } else {
      buttonTrigger.removeClass('open');
      menu
        .stop()
        .fadeOut('fast')
        .removeClass('open');
    }
  });

  /*
   *  Navigation with scroll based on anchors
   */
  body.on('click', '.hashed-link', function(e) {
    e.preventDefault();

    let thisElement = $(this);
    let buttonTrigger = $('.menu-trigger');
    let menu = $('.header-menu');

    if (buttonTrigger.hasClass('open')) {
      buttonTrigger.removeClass('open');
      menu.removeClass('open');
    }

    let hash = thisElement.attr('href').split('#');

    if (hash[1] !== undefined && hash[1] != '') {
      let targetElement = $('#' + hash[1]);

      if (targetElement.length) {
        htmlTag.animate(
          {
            scrollTop: targetElement.offset().top - 100,
          },
          500
        );
      } else {
        window.location.href = thisElement.attr('href');
      }
    }
  });

  initComponents();
});

$(window).scroll(function(event) {
  windowScroll = $(window).scrollTop();

  updateHeaderPositionState();
});

/*
 * Helper to get url hash
 */
function checkHash() {
  try {
    let elementToScroll = $(window.location.hash);

    if (elementToScroll.length) {
      htmlTag.animate(
        {
          scrollTop: elementToScroll.offset().top - 100,
        },
        500
      );
    }
  } catch (err) {}
}

/*
 *  Get header scroll state
 */
function updateHeaderPositionState() {
  let maxScroll = 300;
  let maxScrollForShadow = 40;

  if (windowScroll > maxScrollForShadow && !headerScrolled) {
    headerWrapper.addClass('header-scrolled');
    headerScrolled = true;
  } else if (windowScroll <= maxScrollForShadow && headerScrolled) {
    headerWrapper.removeClass('header-scrolled');
    headerScrolled = false;
  }

  if (windowScroll > maxScroll && headerPinned) {
    headerWrapper.addClass('header-pinned');
    headerPinned = true;
  } else if (windowScroll <= maxScroll && headerPinned) {
    headerWrapper.removeClass('header-pinned');
    headerPinned = false;
  }
}

body.on('click', '.disabled, [disabled]', function(e) {
  e.preventDefault();
});

body.on('change', '.header-wrapper .search-box input', function(e) {
  const thisElement = $(this);
  const url = thisElement.closest('.search-box').attr('data-url');

  if (!helpers.isEmpty(url)) {
    ajaxLoader.fadeIn('fast');

    window.location.href = url + '?search=' + thisElement.val();
  }
});

function initComponents() {
  checkHash();
  updateHeaderPositionState();
}
