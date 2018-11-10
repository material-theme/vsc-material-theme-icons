export interface IIcon {
  /**
   * Icon filename
   * @type {string}
   * @memberof IIcon
   */
  filename: string;
  /**
   * If set to true, the icon is marked as last
   * @type {boolean}
   * @memberof IIcon
   */
  last: boolean;
  /**
   * Icon's name
   * @type {string}
   * @memberof IIcon
   */
  name: string;
}

export interface IThemeIconsItem {
  iconPath: string;
}

export interface IThemeIconsAccents {
  iconDefinitions: {
    _folder_open: IThemeIconsItem;
    _folder_open_build: IThemeIconsItem;
  };
}

export interface IThemeIconsAccents {
  iconDefinitions: {
    _folder_open: IThemeIconsItem;
    _folder_open_build: IThemeIconsItem;
  };
}

export interface IThemeIconsVariants {
  iconDefinitions: {
    _folder_dark: IThemeIconsItem;
    _folder_dark_build: IThemeIconsItem;
    _folder_light: IThemeIconsItem;
    _folder_light_build: IThemeIconsItem;
    _folder_vscode: IThemeIconsItem;
    _folder_gulp: IThemeIconsItem;
    _folder_node: IThemeIconsItem;
    _folder_images: IThemeIconsItem;
    _folder_js: IThemeIconsItem;
    _folder_src: IThemeIconsItem;
    _folder_assets: IThemeIconsItem;
  };
}
