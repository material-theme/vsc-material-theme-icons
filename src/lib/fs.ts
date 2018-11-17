import {join} from 'path';

import {IDefaults} from '../../typings/interfaces/defaults';
import {PATHS} from './constants';
import {IPackageJSON} from '../../typings/interfaces/packagejson';
import {IThemeIconsJSON} from '../../typings/interfaces/icons';

export const getDefaultsJson = (): IDefaults => {
  const defaults: IDefaults = require(join(PATHS.rootDir, PATHS.defaults));

  if (defaults === undefined || defaults === null) {
    throw new Error('Cannot find defaults params');
  }

  return defaults;
};

export const getPackageJson = (): IPackageJSON =>
 require(join(PATHS.rootDir, PATHS.package));

export const getIconsVariantJson = (path: string): IThemeIconsJSON =>
 require(join(PATHS.extensionDir, path));

export const getAbsolutePath = (input: string): string =>
  join(PATHS.extensionDir, input);
