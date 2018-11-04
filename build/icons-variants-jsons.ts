import * as fs from 'fs';
import * as path from 'path';

import {IDefaults} from '../typings/interfaces/defaults';
import {getDefaultsJson} from '../src/helpers/fs';

import {PATHS} from './helpers/paths';

export default () => {
  const {themeIconVariants, variantsIcons}: IDefaults = getDefaultsJson();
  const themIconsJson = fs.readFileSync(path.resolve(PATHS.pathIcons), 'utf8');
  Object.keys(themeIconVariants).forEach(variantName => {
    const jsonDefaults = JSON.parse(themIconsJson);

    variantsIcons.forEach(iconname => {
      const newIconPath = jsonDefaults.iconDefinitions[iconname].iconPath.replace('.svg', `${variantName}.svg`);
      jsonDefaults.iconDefinitions[iconname].iconPath = newIconPath;

      fs.writeFileSync(
        PATHS.pathIconKey(variantName),
        JSON.stringify(jsonDefaults),
        {encoding: 'utf-8'}
      );
    });
  });
};
