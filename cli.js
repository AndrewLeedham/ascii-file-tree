#!/usr/bin/env node

const aft = require('./index');
const program = require('commander');
const { version, description } = require('./package.json');

program
  .description(description)
  .version(version, '-v, --version')
  .arguments('[globs...]')
  .option('-c, --cwd <path>', 'the current working directory to search (default: process.cwd())')
  .option('-d, --deep <n>', 'only traverse n levels deep', parseInt)
  .option('-i, --ignore <globs>', 'exclude matches with an array of glob patterns')
  .option(
    '-D, --no-dot',
    'exclude matches with directory or file names that start with a dot'
  )
  .option('-F, --no-follow', "exclude symlinks")
  .option(
    '-C, --no-case',
    'disable case-insensitive matching'
  )
  .action((globs, command) => {
    const ignore = command.ignore ? command.ignore.split(',') : [];
    const options = {
      globs: globs.length > 0 ? globs : undefined,
      globOptions: {
        cwd: command.cwd === undefined ? process.cwd() : command.cwd,
        deep: command.deep === undefined ? true : command.deep,
        ignore,
        dot: !!command.dot,
        followSymlinkedDirectories: !!command.follow,
        case: !!command.case
      }
    };
    const output = aft.generate(options);
    console.log(output);
  })
  .parse(process.argv);

