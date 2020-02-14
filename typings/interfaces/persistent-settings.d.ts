export interface IExtensionSettings {
  version: string;
}

export interface ISettings {
  isWin: boolean;
  isInsiders: boolean;
  isOSS: boolean;
  isDev: boolean;
  persistentSettingsFilePath: string;
  vscodeVersion: string;
  extensionSettings: IExtensionSettings;
}

export interface IPersistentSettings {
  getSettings: () => ISettings;
  getState: () => IState;
  setState: (state: IState) => void;
  updateStatus: () => IState;
  deleteState: () => void;
  isNewVersion: () => boolean;
}

export interface IState {
  version: string;
}
