import {workspace, commands} from 'vscode';
import {IMaterialThemeSettings} from '../../typings/interfaces/material-theme';

export const getCurrentThemeID = (): string =>
  workspace.getConfiguration().get<string>('workbench.colorTheme', '');

export const getCurrentIconsID = (): string =>
  workspace.getConfiguration().get<string>('workbench.iconTheme', '');

export const setIconsID = (id: string): Thenable<void> =>
  workspace.getConfiguration().update('workbench.iconTheme', id, true);

export const getMaterialThemeSettings = (): IMaterialThemeSettings =>
  workspace
    .getConfiguration()
    .get<IMaterialThemeSettings>('materialTheme', {accent: '', autoApplyIcons: false});

export const reloadWindow = (): Thenable<{} | undefined> =>
  commands.executeCommand('workbench.action.reloadWindow');
