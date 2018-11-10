import {join} from 'path';

export const PATHS = {
  rootDir: join(__dirname, '../../'),
  extensionDir: join(__dirname, '..'),
  defaults: './src/defaults.json',
  package: './package.json'
};

export const FILES = {
  persistentSettings: 'eq-material-theme-icons.json',
};
