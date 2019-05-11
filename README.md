[![travisci status][travisci-badge]][travisci-link] [![npm package][npm-badge]][npm-link] [![license MIT][license-badge]][license] [![commit style angular][commit-style-badge]][commit-style-link] [![semantic-release][semantic-release-badge]][semantic-relase-link]

# ascii-file-tree
> Generate an ascii tree structure for a file glob pattern.

E.g for this repo:
```
 .
├─ .editorconfig
├─ .gitignore
├─ .travis.yml
├─ CHANGELOG.md
├─ LICENSE
├─ README.md
├─ index.js
├─ package.json
├─ yarn.lock
└─ __tests__
   ├─ index.test.js
   ├─ __fixtures__
   │  └─ globs.json
   └─ __snapshots__
      └─ index.test.js.snap
```

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
### `generate([options]): string`
Generate a file structure string.

#### options
Name | Descriptions | Default
--- | --- | ---
glob (string[]) | An array of globs. | `['./source/**/*.js', '!*.test.js']`
globOptions (Object) | Options passed to [fast-glob][fast-glob] | `{ dot: true }`

---

[LICENSE][license] | [CHANGELOG][changelog] | [ISSUES][issues]

[license]: ./LICENSE
[changelog]: ./CHANGELOG.md
[issues]: https://github.com/AndrewLeedham/ascii-file-tree/issues
[fast-glob]: https://github.com/mrmlnc/fast-glob#options-1

[travisci-badge]: https://flat.badgen.net/travis/AndrewLeedham/ascii-file-tree
[travisci-link]: https://travis-ci.org/AndrewLeedham/ascii-file-tree

[npm-badge]: https://flat.badgen.net/npm/v/ascii-file-tree?color=cyan
[npm-link]: https://www.npmjs.com/package/ascii-file-tree

[license-badge]: https://flat.badgen.net/npm/license/ascii-file-tree

[commit-style-badge]: https://flat.badgen.net/badge/commit%20style/angular/purple
[commit-style-link]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[semantic-release-badge]: https://flat.badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic%20release/e10079
[semantic-relase-link]: https://github.com/semantic-release/semantic-release
