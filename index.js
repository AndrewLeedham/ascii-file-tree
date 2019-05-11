const tree = require('ascii-tree');
const { sep, basename } = require('path');
const fg = require('fast-glob');

function arrayEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, index) => item === array2[index]);
}

function findArrayOverlap(array1, array2) {
  for (let i = array1.length; i > 0; i--) {
    if (arrayEqual(array1.slice(0, i), array2.slice(0, i))) {
      return i;
    }
  }
  return 0;
}

function generate({
  glob = ['./**/*', '!node_modules', '!.git'],
  globOptions = { dot: true }
} = {}) {
  const files = fg.sync(glob, globOptions);
  let previous = [];
  const input =
    '# .\r\n' +
    files
      .map((name) => {
        const count = (name.match(new RegExp(sep, 'g')) || []).length;
        let out = '';
        let parts = name.split(sep).slice(0, -1);
        const overlap = findArrayOverlap(parts, previous);
        const relativeParts = overlap > 0 ? parts.slice(overlap) : parts;
        if (relativeParts.length > 0 && !arrayEqual(previous, relativeParts) && count > 0) {
          for (let index = 0; index < relativeParts.length; index++) {
            out += '#'.repeat(overlap + index + 2) + relativeParts[index] + '\r\n';
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
