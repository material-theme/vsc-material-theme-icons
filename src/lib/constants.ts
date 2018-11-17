import {join} from 'path';

export const PATHS = {
  rootDir: join(__dirname, '../../../'),  // From `out` dir
  extensionDir: join(__dirname, '../../'), // From `out` dir
  defaults: './src/defaults.json',
  package: './package.json'
};

export const FILES = {
  persistentSettings: 'eq-material-theme-icons.json',
};
