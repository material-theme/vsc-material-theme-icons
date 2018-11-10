import {workspace} from 'vscode';

export const getCurrentThemeID = (): string | undefined =>
  workspace.getConfiguration().get<string>('workbench.colorTheme');
