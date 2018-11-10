import {join} from 'path';

import {IDefaults} from '../../typings/interfaces/defaults';
import {PATHS} from './constants';
import {IPackageJSON} from '../../typings/interfaces/packagejson';

export function getDefaultsJson(): IDefaults {
  const defaults: IDefaults = require(join(PATHS.rootDir, PATHS.defaults));

  if (defaults === undefined || defaults === null) {
    throw new Error('Cannot find defaults params');
  }

  return defaults;
}

export function getPackageJson(): IPackageJSON {
  return require(join(PATHS.rootDir, PATHS.package));
}
