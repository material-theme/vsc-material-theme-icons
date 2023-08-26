/**
 * Main utilities for Material Theme integration
 */

import {IDefaults} from '../../typings/interfaces/defaults';

export const materialThemes = [
  'Material Theme',
  'Material Theme High Contrast',
  'Material Theme Darker',
  'Material Theme Darker High Contrast',
  'Material Theme Palenight',
  'Material Theme Palenight High Contrast',
  'Material Theme Ocean',
  'Material Theme Ocean High Contrast',
  'Material Theme Deep Forest',
  'Material Theme Deep Forest High Contrast',
  'Material Theme Lighter',
  'Material Theme Lighter High Contrast'
];

export const isMaterialTheme = (currentThemeId: string): boolean =>
  materialThemes.includes(currentThemeId);

export const getThemeIconVariant = (defaults: IDefaults, currentThemeId: string): string | undefined => {
  const found = Object.keys(defaults.themeIconVariants)
    .find(variant => currentThemeId.includes(variant));

  return found ? found.toLowerCase() : undefined;
};
