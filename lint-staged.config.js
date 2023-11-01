module.exports = {
  "*.js": ["eslint --cache --fix", "prettier --write"],
  "*.css": "stylelint --cache --fix",
  "*.{json,md,html,css}": "prettier --write",
};
