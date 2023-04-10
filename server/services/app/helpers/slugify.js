const { default: slugify } = require('slugify');

const slug = (title) => {
  const options = {
    replacement: '-',
    remove: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
    lower: true,
    strict: false,
    locale: 'en',
    trim: true,
  };
  return slugify(title, options)
    .concat('rmysh')
    .concat(Math.ceil(Math.random() * 2341));
};

module.exports = {
  slug,
};
