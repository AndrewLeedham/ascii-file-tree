declare namespace AsciiFileTree {
  interface Options {
    globs?: string[],
    globOptions: FastGlob.Options
  }
  /**
   * Generates an ascii tree structure.
   *
   * @param options - Options to configure what is included in the generated tree.
   * @param options.globs - An array of globs.
   * @param options.globOptions - Options passed to {@link https://github.com/mrmlnc/fast-glob#options-1}.
   * @returns Ascii tree structure.
   */
  function generate(options: Options): string;
}

export = AsciiFileTree;
