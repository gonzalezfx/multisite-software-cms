const body = $('body');
const ajaxLoader = $('.ajax-loader');

$(window).on('load', function() {
  initOnLoadComponents();
});

$(window).ready(function() {
  initOnReadyComponents();
});

/*
 *  Select2 dropdowns
 */
function createSelect2Dropdowns() {
  const targetClass = 'select2-component';
  const selects = $('.' + targetClass + ':not(.initialized-select2)');

  selects.each(function(index, el) {
    const thisSelect = $(el);
    let initialClasses = thisSelect.attr('class');
    let selectConfig = {};
    const isMultiple = thisSelect.prop('multiple');
    const disableSearchConfig = !helpers.isEmpty(
      thisSelect.attr('data-disable-search')
    );
    const placeholder = thisSelect.attr('placeholder');

    if (disableSearchConfig) {
      selectConfig.minimumResultsForSearch = Infinity;
    }

    if (!helpers.isEmpty(placeholder)) {
      selectConfig.placeholder = placeholder;
      selectConfig.allowClear = true;
    }

    thisSelect.select2(selectConfig);

    thisSelect.addClass('initialized-select2');

    initialClasses = initialClasses.replace(targetClass, '');

    if (!helpers.isEmpty(initialClasses)) {
      thisSelect.next().addClass(initialClasses);
    }
  });
}

/**
 *  Leaflet Maps
 */
function createLeafletMaps() {
  const mapsContainers = $('.leaflet-map:not(.initialized-map)');

  mapsContainers.each(function(index, el) {
    const currentMapContainer = $(el);
    const globalLatitude = parseFloat(currentMapContainer.attr('lat') ?? 0);
    const globalLongitude = parseFloat(currentMapContainer.attr('lon') ?? 0);
    let markers = [];
    let bounds = [];

    if (globalLatitude && globalLongitude) {
      markers.push({
        latitude: globalLatitude,
        longitude: globalLongitude,
        popupContent: null,
      });
    } else {
      const markersElements = currentMapContainer.find('.leaflet-marker');

      markersElements.each(function(index, el) {
        const currentMarkerElement = $(el);
        const latitude = parseFloat(currentMarkerElement.attr('lat') ?? 0);
        const longitude = parseFloat(currentMarkerElement.attr('lon') ?? 0);
        const popupContent = currentMarkerElement.html();

        currentMarkerElement.remove();

        if (!latitude && !longitude) return;

        bounds.push([latitude, longitude]);
        markers.push({
          latitude: latitude,
          longitude: longitude,
          popupContent: popupContent,
        });
      });
    }

    if (!markers.length) return;

    const currentMapId = 'leaflet-map-' + Date.now();
    currentMapContainer.attr('id', currentMapId);

    const leafletMap = L.map(currentMapId, {
      scrollWheelZoom: false,
    }).setView([markers[0].latitude, markers[0].longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    const locationIcon = L.icon({
      iconUrl: BASE_URL + '/img/marker-icon-2x.png',
      shadowUrl: BASE_URL + '/img/marker-shadow.png',
      iconSize: [25, 41], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      iconAnchor: [13, 40], // point of the icon which will correspond to marker's location
      shadowAnchor: [14, 41], // the same for the shadow
      popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
    });

    markers.forEach((marker, index) => {
      const locationMarker = L.marker([marker.latitude, marker.longitude], {
        icon: locationIcon,
      }).addTo(leafletMap);

      if (marker.popupContent) {
        locationMarker.bindPopup(marker.popupContent);

        if (markers.length == 1) {
          locationMarker.openPopup();
        }
      }
    });

    leafletMap.fitBounds(bounds);

    if (markers.length == 1) {
      leafletMap.setZoom(15);
    }

    currentMapContainer.addClass('initialized-map');
  });
}

/*
 * DYNAMIC SLIDER
 */
body.on('click', '.open-zoom-top-banner', function(e) {
  const thisElement = $(this);
  const topBanner = $('.top-banner');
  const topBannerData = topBanner.data('royalSlider');

  topBanner.addClass('zoom-banner');
  thisElement.hide();
  $('.close-zoom-top-banner').show();
  $('.top-banner-actions').addClass('open');

  topBannerData.stopAutoPlay();
  topBannerData.st.imageScaleMode = 'fit-if-smaller';
  topBannerData.updateSliderSize(true);
});

body.on('click', '.close-zoom-top-banner', function(e) {
  const thisElement = $(this);
  const topBanner = $('.top-banner');
  const topBannerData = topBanner.data('royalSlider');

  topBanner.removeClass('zoom-banner');
  thisElement.hide();
  $('.open-zoom-top-banner').show();
  $('.top-banner-actions').removeClass('open');

  topBannerData.st.imageScaleMode = 'fill';
  topBannerData.updateSliderSize(true);

  $(window).scrollTop(0);
});

body.on('click', '.dynamic-slider .dynamic-slider-trigger', function(e) {
  e.preventDefault();

  let thisElement = $(this);
  let sliderList = thisElement.closest('.dynamic-slider');
  let sliderItems = sliderList.find('.dynamic-slider-item');
  let currentItem = thisElement.closest('.dynamic-slider-item');

  if (!sliderItems.length) {
    return;
  }

  ajaxLoader.fadeIn('fast');
  body.append('<div class="royal-slider-dynamic rsDefault"></div>');

  let thisSlider = $('.royal-slider-dynamic');

  sliderItems.each(function(index, el) {
    let thisItem = $(el);
    let originalImage = thisItem.find('.dynamic-slider-original').attr('href');
    let thumbImage = thisItem.find('.dynamic-slider-thumb').attr('src');

    if (
      originalImage !== null &&
      originalImage !== undefined &&
      originalImage !== ''
    ) {
      thumbImage = !thumbImage ? originalImage : thumbImage;

      thisSlider.append('<img class="rsImg" src="' + originalImage + '" />');
    }
  });

  thisSlider.royalSlider({
    controlNavigation: 'none',
    loop: false,
    imageScaleMode: 'fit-if-smaller',
    navigateByClick: true,
    numImagesToPreload: 2,
    arrowsNav: true,
    arrowsNavAutoHide: true,
    arrowsNavHideOnTouch: true,
    keyboardNavEnabled: true,
    fadeinLoadedSlide: true,
    thumbs: {
      firstMargin: true,
    },
  });

  let thisSliderData = thisSlider.data('royalSlider');

  body.append('<div class="close-dynamic-slider"></div>');
  ajaxLoader.fadeOut('fast');
  thisSlider.fadeIn();

  thisSliderData.updateSliderSize(true);

  if (currentItem.length) {
    let slideNumber = parseInt(currentItem.attr('data-slide'));

    thisSliderData.goTo(slideNumber);
  }
});

body.on('click', '.close-dynamic-slider', function() {
  let thisSlider = $('.royal-slider-dynamic');

  thisSlider.data('royalSlider').destroy();
  thisSlider.remove();
  $(this).remove();
});

/* *****							*****************************************************               */
/* #####	GALLERY CAROUSEL		#####################################################               */
/* *****							*****************************************************               */

function createCarouselGalleries() {
  const galleries = $('.gallery-widget .gallery-items-list');

  if (galleries.length) {
    galleries.each(function(index, el) {
      const thisGallery = $(el);

      if (thisGallery.hasClass('slick-initialized')) {
        return;
      }

      const galleryContainer = thisGallery.closest('.gallery-widget');

      const galleryConfig = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        draggable: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

      if (galleryContainer.length) {
        const customSlides = galleryContainer.attr('data-slides');
        const infinite = galleryContainer.attr('data-infinite');
        const draggable = galleryContainer.attr('data-infinite');

        if (customSlides !== undefined) {
          galleryConfig.slidesToShow = parseInt(customSlides);
        }

        if (infinite !== undefined && infinite == 'true') {
          galleryConfig.infinite = true;
        } else if (infinite !== undefined && infinite == 'false') {
          galleryConfig.infinite = false;
        }

        if (draggable !== undefined && draggable == 'true') {
          galleryConfig.draggable = true;
        } else if (draggable !== undefined && draggable == 'false') {
          galleryConfig.draggable = false;
        }
      }

      console.log(galleryConfig);
      thisGallery.slick(galleryConfig);
    });
  }
}

/* *****						*****************************************************               */
/* #####	FANCYBOX        	#####################################################               */
/* *****						*****************************************************               */
$('.fancybox-trigger').fancybox({
  padding: 0,
});

function initOnReadyComponents() {
  createCarouselGalleries();
}

function initOnLoadComponents() {
  createSelect2Dropdowns();
  createLeafletMaps();
}

function initComponents() {
  initOnReadyComponents();
  initOnLoadComponents();
}
