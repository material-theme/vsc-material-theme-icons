import * as fs from 'fs';
import {
  getCurrentThemeID,
  getCurrentIconsID,
  setIconsID,
  getMaterialThemeSettings,
  reloadWindow
} from '../lib/vscode';
import {isMaterialTheme, getThemeIconVariant} from '../lib/material-theme';
import {getDefaultsJson, getPackageJson, getIconsVariantJson, getAbsolutePath} from '../lib/fs';
import {getIconsPath} from '../lib/icons';
import {IAccents} from '../../typings/interfaces/defaults';
import {IThemeIconsIconPath} from '../../typings/interfaces/icons';

const getIconDefinition = (definitions: any, iconName: string): IThemeIconsIconPath =>
  (definitions as any)[iconName];

const replaceIconPathWithAccent = (iconPath: string, accentName: string): string =>
  iconPath.replace('.svg', `.accent.${ accentName }.svg`);

const isAccent = (accentName: string, accents: IAccents): boolean =>
  Boolean(Object.keys(accents).find(name => name === accentName));

const newIconPath = (accent: string, accents: IAccents, outIcon: IThemeIconsIconPath): string =>
  isAccent(accent, accents) ?
    replaceIconPathWithAccent(outIcon.iconPath, accent.replace(/\s+/, '-')) :
    outIcon.iconPath;

/**
 * Fix icons only when the Material Theme is installed and enabled
 */
export default async (): Promise<void> => {
  const deferred: any = {};
  const promise = new Promise((resolve, reject): void => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  // Current theme id set on VSCode (id of the package.json of the extension theme)
  const themeLabel = getCurrentThemeID();

  // If this method was called without Material Theme set, just return
  if (!isMaterialTheme(themeLabel)) {
    return deferred.resolve();
  }

  const DEFAULTS = getDefaultsJson();
  const PKG = getPackageJson();
  const MT_SETTINGS = getMaterialThemeSettings();

  const materialIconVariantID: string | undefined = getThemeIconVariant(DEFAULTS, themeLabel)
  const currentThemeIconsID: string = getCurrentIconsID();
  const newThemeIconsID = materialIconVariantID ?
    `eq-material-theme-icons-${materialIconVariantID}` : 'eq-material-theme-icons';

  // Just set the correct Material Theme icons variant if wasn't
  // Or also change the current icons set to the Material Theme icons variant
  // (this is intended: this command was called directly or `autoFix` flag was already checked by other code)
  if (currentThemeIconsID !== newThemeIconsID) {
    await setIconsID(newThemeIconsID);
  }

  // package.json iconThemes object for the current icons set
  const themeIconsPath = getIconsPath(PKG, newThemeIconsID);
  // Actual json file of the icons theme (eg. Material-Theme-Icons-Darker.json)
  const theme = getIconsVariantJson(themeIconsPath);

  for (const iconName of DEFAULTS.accentableIcons) {
    const distIcon = getIconDefinition(theme.iconDefinitions, iconName);
    const outIcon = getIconDefinition(DEFAULTS.icons.theme.iconDefinitions, iconName);

    if (typeof distIcon === 'object' && typeof outIcon === 'object') {
      distIcon.iconPath = newIconPath(MT_SETTINGS.accent, DEFAULTS.accents, outIcon);
    }
  }

  // Path of the icons theme .json
  const themePath: string = getAbsolutePath(themeIconsPath);
  // Write changes to current JSON icon
  fs.writeFile(themePath, JSON.stringify(theme), {encoding: 'utf-8'}, async (err: any) => {
    if (err) {
      deferred.reject(err);
      return;
    }

    deferred.resolve();
  });

  try {
    await promise;
    await reloadWindow();
  } catch (error) {
    console.trace(error);
  }
};
