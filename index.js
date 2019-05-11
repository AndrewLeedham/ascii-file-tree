const tree = require('ascii-tree');
const { sep, basename } = require('path');
const fg = require('fast-glob');

/**
 * Checks if 2 arrays have value equality.
 *
 * @param {Array} array1 - First array.
 * @param {Array} array2 - Second array.
 * @returns Whether the arrays are equal.
 */
function arrayEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, index) => item === array2[index]);
}

/**
 * Finds how much overlap there is at the start of 2 arrays.
 *
 * @param {Array} array1 - First array.
 * @param {Array} array2 - Second array.
 * @returns The amount of items in array1 that overlap (from the start) with array2.
 */
function findArrayOverlap(array1, array2) {
  for (let i = array1.length; i > 0; i--) {
    if (arrayEqual(array1.slice(0, i), array2.slice(0, i))) {
      return i;
    }
  }
  return 0;
}

const defaultGlobOptions = {
  dot: true
};

// fast-glob options that can break things, so shouldn't be configurable.
const forcedGlobOptions = {
  stats: false,
  onlyFiles: true,
  onlyDirectories: false,
  unique: true,
  markDirectories: false,
  absolute: false,
  transform: null
};

/**
 * Generates an ascii tree structure.
 *
 * @param {Object} options - Options to configure what is included in the generated tree.
 * @param {Boolean} options.path - Whether to display the root path instead of ".".
 * @param {Array} options.globs - An array of globs.
 * @param {Object} options.globOptions - Options passed to {@link https://github.com/mrmlnc/fast-glob#options-1}.
 * @returns {string} Ascii tree structure.
 */
function generate({
  path = false,
  globs = ['./**/*', '!node_modules', '!.git'],
  globOptions = {}
} = {}) {
  globOptions = {
    ...defaultGlobOptions,
    ...globOptions,
    ...forcedGlobOptions
  };
  const files = fg.sync(globs, globOptions);
  let previous = [];
  const root = path ? globOptions.cwd : '.';
  const input =
    `#${root}\r\n` +
    files
      .map((name) => {
        const count = (name.match(new RegExp(sep, 'g')) || []).length;
        let out = '';
        let parts = name.split(sep).slice(0, -1);
        const overlap = findArrayOverlap(parts, previous);
        const relativeParts = overlap > 0 ? parts.slice(overlap) : parts;
        if (
          relativeParts.length > 0 &&
          !arrayEqual(previous, relativeParts) &&
          count > 0
        ) {
          for (let index = 0; index < relativeParts.length; index++) {
            out +=
              '#'.repeat(overlap + index + 2) + relativeParts[index] + '\r\n';
          }
          depth = count;
        }
        previous = parts;
        return out + '#'.repeat(count + 2) + basename(name);
      })
      .join('\r\n');
  return tree.generate(input);
}

exports.generate = generate;
