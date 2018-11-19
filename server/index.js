const md5File = require('md5-file');
const path = require('path');
const ignoreStyles = require('ignore-styles');

/*
 * ignoreStyles is a babel/register style hook to ignore style imports when
 * running in Node. This is for projects that use something like Webpack to
 * enable CSS imports in JavaScript. When you try to run the project in Node
 *
 * https://www.npmjs.com/package/ignore-styles
 */
const register = ignoreStyles.default;
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (extensions.find(extension => filename.endsWith(extension))) {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);
    mod.exports = `/static/media/${bn}`; // eslint-disable-line no-param-reassign
  } else {
    return ignoreStyles.noOp();
  }
  return null;
});

/*
 * The babel-register require hook will bind itself to node's require and automatically compile
 * es-6 files to es-5 for cross-browser compliance.
 */
require('@babel/register')({
  ignore: [/node_modules/, /build/],
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel',
    '@babel/plugin-proposal-class-properties'
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

require('./server');
