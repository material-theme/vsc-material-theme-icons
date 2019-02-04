import {join} from 'path';
import {existsSync, writeFileSync, unlinkSync} from 'fs';
import {SemVer, lt} from 'semver';
import * as os from 'os';

import {IPersistentSettings, ISettings, IExtensionSettings, IState} from '../../typings/interfaces/persistent-settings';
import {IVSCode} from '../../typings/interfaces/vscode';
import {FILES} from './constants';
import {getPackageJson} from './fs';

export default class PersistentSettings implements IPersistentSettings {
  private settings: ISettings;

  constructor(private vscode: IVSCode) {
    this.settings = this.getSettings();
  }

  getSettings(): ISettings {
    const appName = this.vscode.env.appName || '';
    const isDev = /dev/i.test(appName);
    const isOSS = isDev && /oss/i.test(appName);
    const isInsiders = /insiders/i.test(appName);
    const vscodeVersion = new SemVer(this.vscode.version).version;
    const isWin = /^win/.test(process.platform);

    const vscodePath = this.vscodePath();
    const vscodeAppName = this.vscodeAppName(isInsiders, isOSS, isDev);
    const vscodeAppUserPath = join(vscodePath, vscodeAppName, 'User');
    const persistentSettingsFilePath = join(vscodeAppUserPath, FILES.persistentSettings);

    const {version} = getPackageJson();

    const extensionSettings: IExtensionSettings = {
      version
    };

    this.settings = {
      isDev,
      isOSS,
      isInsiders,
      isWin,
      vscodeVersion,
      vscodeAppUserPath,
      persistentSettingsFilePath,
      extensionSettings
    };

    return this.settings;
  }

  getState(): IState {
    const defaultState: IState = {
      version: '0.0.0'
    };

    if (!existsSync(this.settings.persistentSettingsFilePath)) {
      return defaultState;
    }

    try {
      return require(this.settings.persistentSettingsFilePath) as IState;
    } catch (error) {
      // TODO: errorhandler
      // ErrorHandler.logError(error, true);
      console.log(error);
      return defaultState;
    }
  }

  setState(state: IState): void {
    try {
      writeFileSync(this.settings.persistentSettingsFilePath, JSON.stringify(state));
    } catch (error) {
      // TODO: errorhandler
      // ErrorHandler.logError(error, true);
      console.log(error);
    }
  }

  deleteState(): void {
    unlinkSync(this.settings.persistentSettingsFilePath);
  }

  updateStatus(): IState {
    const state = this.getState();
    state.version = this.settings.extensionSettings.version;
    this.setState(state);
    return state;
  }

  isNewVersion(): boolean {
    console.log(this.getState().version, this.settings.extensionSettings.version);
    return lt(
      this.getState().version,
      this.settings.extensionSettings.version
    );
  }

  private vscodeAppName(isInsiders: boolean, isOSS: boolean, isDev: boolean): string {
    return process.env.VSCODE_PORTABLE
    ? 'user-data'
    : isInsiders
      ? 'Code - Insiders'
      : isOSS
        ? 'Code - OSS'
        : isDev
          ? 'code-oss-dev'
          : 'Code';
  }

  private vscodePath(): string {
    switch (process.platform) {
      case 'darwin':
        return `${os.homedir()}/Library/Application Support`;
      case 'linux':
        return `${os.homedir()}/.config`;
      case 'win32':
        return process.env.APPDATA as string;
      default:
        return '/var/local';
    }
  }
}
