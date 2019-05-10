[![npm package][npm-badge]][npm-link] [![license MIT][license-badge]][license] [![commit style angular][commit-style-badge]][commit-style-link] [![semantic-release][semantic-release-badge]][semantic-relase-link]

# ascii-file-tree
Generate an ascii tree structure for a file glob pattern.

## Usage
- Install
```bash
yarn add ascii-file-tree
# or
npm install ascii-file-tree --save
```
- Import and use
```javascript
const aft = require('ascii-file-tree');
// or
import aft from 'ascii-file-tree');

// Will log the file structure of your CWD excluding node_modules and .git.
console.log(aft.generate());
```

## API
- `generate([options])` Generate a file structure string.
  - `options`
    - `options.glob` An array of globs e.g. `['./source/**/*.js', '!*.test.js']`. Default: `['./**/*', '!node_modules', '!.git']`.
    - `options.globOptions` Options passed to fast-glob, see https://github.com/mrmlnc/fast-glob#options-1. Default: `{ dot: true }`.

---

[LICENSE][license] | [CHANGELOG][changelog] | [ISSUES][issues]

[license]: ./LICENSE
[changelog]: ./CHANGELOG.md

[issues]: https://github.com/AndrewLeedham/ascii-file-tree/issues

[circleci-badge]: https://flat.badgen.net/circleci/github/AndrewLeedham/ascii-file-tree
[circleci-link]: https://circleci.com/gh/AndrewLeedham/ascii-file-tree/tree/master

[npm-badge]: https://flat.badgen.net/npm/v/ascii-file-tree?color=cyan
[npm-link]: https://www.npmjs.com/package/ascii-file-tree

[license-badge]: https://flat.badgen.net/npm/license/ascii-file-tree

[commit-style-badge]: https://flat.badgen.net/badge/commit%20style/angular/purple
[commit-style-link]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[semantic-release-badge]: https://flat.badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic%20release/e10079
[semantic-relase-link]: https://github.com/semantic-release/semantic-release
