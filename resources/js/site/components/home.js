const html = $('html');
const body = $('body');
const topBanner = $('.top-banner');
const headerWrapper = $('.header-wrapper');
const ajaxLoader = $('.ajax-loader');
let windowScroll = 0;

$(document).ready(function(e) {
  /*
   *  Scroll down to skip full height viewport initial banner
   */
  body.on('click', '.scroll-down-arrow ', function(e) {
    e.preventDefault();

    if (topBanner.length) {
      let scrollDistance = topBanner.outerHeight();
      let headerHeight = headerWrapper.length ? headerWrapper.outerHeight() : 0;

      html.animate(
        {
          scrollTop: scrollDistance + headerHeight,
        },
        500
      );
    }
  });

  initComponents();
});

$(window).scroll(function(event) {
  windowScroll = $(window).scrollTop();

  updateScrollDownArrow();
});

$('.disable-on-submit').on('submit', function(e) {
  ajaxLoader.fadeIn('fast');
});

/* *****							*****************************************************               */
/* #####	SLIDERS					#####################################################               */
/* *****							*****************************************************               */

function createTopBanner() {
  let bannerSlider = $('.top-banner');

  if (bannerSlider.length) {
    const enableThumbs = bannerSlider.hasClass('enable-thumbs');

    bannerSlider.royalSlider({
      loop: true,
      imageScaleMode: 'fill',
      navigateByClick: false,
      arrowsNav: true,
      controlsInside: true,
      controlNavigation: enableThumbs ? 'thumbnails' : 'bullets',
      keyboardNavEnabled: false,
      fadeinLoadedSlide: true,
      sliderDrag: false,
      transitionSpeed: 400,
      transitionType: 'fade',
      autoPlay: {
        enabled: true,
        stopAtAction: true,
        pauseOnHover: false,
        delay: 5000,
      },
      block: {
        speed: 500,
        moveOffset: 100,
      },
      thumbs: {
        autoCenter: false,
        fitInViewport: false,
      },
    });

    let bannerSliderData = bannerSlider.data('royalSlider');

    setTimeout(() => {
      bannerSliderData.updateSliderSize(true);
    }, 300);
  }
}

/*
 *  Show or hide scroll down arrow icon
 */
function updateScrollDownArrow() {
  let scrollDownArrow = $('.scroll-down-arrow');

  if (scrollDownArrow.length) {
    let maxScroll =
      topBanner.outerHeight() - (headerWrapper.outerHeight() + 50);

    if (windowScroll >= maxScroll) {
      scrollDownArrow.fadeOut();
    } else {
      scrollDownArrow.fadeIn();
    }
  }
}

function initComponents() {
  createTopBanner();
}
