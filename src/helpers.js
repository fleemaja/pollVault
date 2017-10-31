// Some details about the site
exports.siteName = `Poll Vault`;

exports.categories = [
  'Sports and Fitness',
  'TV and Movies',
  'Music and Art',
  'Food and Travel',
  'Science and Technology',
  'News and Politics',
  'Miscellaneous'
];

exports.isEmpty = (obj) => (
  Object.keys(obj).length === 0 && obj.constructor === Object
)

exports.letterToHexColor = {
  'a': '#FFCDD2',
  'b': '#F8BBD0',
  'c': '#E1BEE7',
  'd': '#D1C4E9',
  'e': '#C5CAE9',
  'f': '#BBDEFB',
  'g': '#B3E5FC',
  'h': '#B2EBF2',
  'i': '#B2DFDB',
  'j': '#C8E6C9',
  'k': '#DCEDC8',
  'l': '#F0F4C3',
  'm': '#FFF9C4',
  'n': '#FFECB3',
  'o': '#FFE0B2',
  'p': '#FFCCBC',
  'q': '#D7CCC8',
  'r': '#CFD8DC',
  's': '#F5F5F5',
  't': '#FF8A80',
  'u': '#B388FF',
  'v': '#8C9EFF',
  'w': '#80D8FF',
  'x': '#B9F6CA',
  'y': '#CCFF90',
  'z': '#FFE57F'
}
