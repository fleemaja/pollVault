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
