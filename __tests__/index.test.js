const index = require('../index');
const fg = require('fast-glob');
const mockGlobs = require('./__fixtures__/globs.json');

const globSpy = jest.spyOn(fg, 'sync');
const cwdSpy = jest.spyOn(process, 'cwd');

beforeEach(() => {
  globSpy.mockImplementation(() => mockGlobs.control);
});

describe('generate', () => {
  test('control', () => {
    expect(index.generate()).toMatchSnapshot();
  });

  test('nesting', () => {
    globSpy.mockImplementation(() => mockGlobs.nesting);
    expect(index.generate()).toMatchSnapshot();
  });

  test('deep nesting', () => {
    globSpy.mockImplementation(() => mockGlobs.deepNesting);
    expect(index.generate()).toMatchSnapshot();
  });

  test('branching', () => {
    globSpy.mockImplementation(() => mockGlobs.branching);
    expect(index.generate()).toMatchSnapshot();
  });

  test('path', () => {
    expect(
      index.generate({ path: true, globOptions: { cwd: '/path/to/' } })
    ).toMatchSnapshot();
  });
});
