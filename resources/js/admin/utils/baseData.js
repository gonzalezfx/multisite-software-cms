const appElement = document.getElementById('app');
const CSRFTokenMeta = document.querySelector('meta[name="csrf-token"]');

export const parentProjectURL = appElement.getAttribute('base-url');
export const CSRFToken = CSRFTokenMeta.getAttribute('content');
export const apiURL = `${parentProjectURL}/api`;
export const adminBaseURL = `${parentProjectURL}/admin`;
export const adminBaseURI = appElement.getAttribute('admin-base-uri');
export const ajaxUploadURL = `${parentProjectURL}/ajaxImageUpload`;
export const storageURL = `${parentProjectURL}/storage`;

// Static types
export const StaticTypes = {
  SECTION: {
    ALIGNMENT_TYPE_LEFT: 1,
    ALIGNMENT_TYPE_CENTER: 2,
    ALIGNMENT_TYPE_RIGHT: 3,

    BACKGROUND_TYPE_WHITE: 1,
    BACKGROUND_TYPE_SOFT_GRAY: 2,
    BACKGROUND_TYPE_BRAND_COLOR: 3,
  },
};

export const StaticTypesLabels = {
  SECTION: {
    ALIGNMENT_TYPE: {
      [StaticTypes.SECTION.ALIGNMENT_TYPE_LEFT]: 'Izquierda',
      [StaticTypes.SECTION.ALIGNMENT_TYPE_CENTER]: 'Centrado',
      [StaticTypes.SECTION.ALIGNMENT_TYPE_RIGHT]: 'Derecha',
    },
    BACKGROUND_TYPE: {
      [StaticTypes.SECTION.BACKGROUND_TYPE_WHITE]: 'Blanco',
      [StaticTypes.SECTION.BACKGROUND_TYPE_SOFT_GRAY]: 'Gris claro',
      [StaticTypes.SECTION.BACKGROUND_TYPE_BRAND_COLOR]: 'Rojo',
    },
  },
};
