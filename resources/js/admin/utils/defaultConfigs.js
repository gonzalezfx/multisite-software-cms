import { parentProjectURL } from './baseData';

const typeTemplate = '"${label}" no es un valor de tipo ${type}';
const defaultValidateMessages = {
  default: "Error de validación en '${label}'",
  required: '"${label}" es un campo obligatorio',
  enum: "'${label}' debe ser alguno de [${enum}]",
  whitespace: '"${label}" no puede contener solo espacios en blanco',
  date: {
    format: "'${label}' tiene un formato inválido",
    parse: "'${label}' no se puede reconocer como fecha válida",
    invalid: "'${label}' es una fecha inválida",
  },
  types: {
    string: '"${label}" debe ser texto',
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: '"${label}" debe ser numérico',
    date: '"${label}" debe ser una fecha',
    boolean: typeTemplate,
    integer: '"${label}" debe ser un número entero',
    float: typeTemplate,
    regexp: typeTemplate,
    email: '"${label}" debe ser un correo válido',
    url: '"${label}" debe ser una URL válida',
    hex: typeTemplate,
  },
  string: {
    len: "'${label}' debe tener exáctamente ${len} caracteres",
    min: "'${label}' debe tener al menos ${min} caracteres",
    max: "'${label}' no puede tener más de ${max} caracteres",
    range: "'${label}' debe tener entre ${min} y ${max} caracteres",
  },
  number: {
    len: "'${label}' debe ser igual a ${len}",
    min: "'${label}' no puede ser menor a ${min}",
    max: "'${label}' no puede ser mayor a ${max}",
    range: "'${label}' debe ser entre ${min} y ${max}",
  },
  array: {
    len: "'${label}' must be exactly ${len} in length",
    min: "'${label}' cannot be less than ${min} in length",
    max: "'${label}' cannot be greater than ${max} in length",
    range: "'${label}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: '"${label}" tiene un patrón inválido',
  },
};

export const antFormSettings = {
  validateMessages: defaultValidateMessages,
};

const leafletMarker = {
  iconUrl: parentProjectURL + '/img/marker-icon-2x.png',
  shadowUrl: parentProjectURL + '/img/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  shadowSize: [41, 41], // size of the shadow
  iconAnchor: [13, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [14, 41], // the same for the shadow
  popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
};

export const leafletSettings = {
  leafletMarker: leafletMarker,
  defaultLatitude: 20.966798,
  defaultLongitude: -89.623286,
};
