module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "arrow-body-style": 0,
    "no-console": "off",
    "no-use-before-define": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "strict": "off",
    "no-underscore-dangle": "off",
    "prefer-rest-params": "off",
    "no-param-reassign": ["error", { "props": false }],
  }
};
