module.exports = {
  '*.{html,css,less,sass,scss,mjs,js,jsx,ts,tsx,vue,mpx,json,yml,md}': 'prettier --write',
  '*.{js,jsx,ts,tsx,cjs,mjs,vue,mpx}': 'eslint --fix',
  '*.{css,scss,vue,mpx,html}': 'stylelint --fix',
}
