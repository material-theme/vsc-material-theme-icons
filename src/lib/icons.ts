import {IPackageJSON} from '../../typings/interfaces/packagejson';

export const getIconsPath = (pkg: IPackageJSON, iconsId: string): string => {
  const found = pkg.contributes.iconThemes.find(iconObj => iconObj.id === iconsId);
  return found ? found.path : '';
};
