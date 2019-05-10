const tree = require('ascii-tree');
const { sep, basename } = require('path');
const fg = require('fast-glob');

function arrayEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, index) => item === array2[index]);
}

function arrayStartsWith(array, start) {
  return arrayEqual(array.slice(0, start.length), start);
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
        if (
          parts.length > 0 &&
          arrayStartsWith(parts, previous) &&
          parts.length !== previous.length
        ) {
          parts = parts.slice(previous.length);
        }
        if (parts.length > 0 && !arrayEqual(previous, parts) && count > 0) {
          for (let index = 0; index < parts.length; index++) {
            out += '#'.repeat(index + 2) + parts[index] + '\r\n';
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
