/**
 * Main utilities for Material Theme integration
 */

import {IDefaults} from '../../typings/interfaces/defaults';

export const materialThemes = [
  'eq-material-theme-default',
  'eq-material-theme-darker',
  'eq-material-theme-darker-high-contrast',
  'eq-material-theme-ocean',
  'eq-material-theme-ocean-high-contrast',
  'eq-material-theme-lighter',
  'eq-material-theme-lighter-high-contrast'
];

export const isMaterialTheme = (currentThemeId: string): boolean =>
  materialThemes.includes(currentThemeId);

export const getThemeIconVariant = (defaults: IDefaults, currentThemeId: string): string | null => {
  const found = Object.keys(defaults.themeIconVariants)
    .find(variant => currentThemeId.includes(variant.toLowerCase()));

  return found ? found.toLowerCase() : null;
};
