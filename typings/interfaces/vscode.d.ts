import * as vscode from 'vscode';

export interface IVSCodeEnv {
  appName?: string;
}

export interface IVSCode {
  env: IVSCodeEnv;
  version: string;
  workspace: IVSCodeWorkspace;
}

export interface IVSCodeWorkspace {
  rootPath?: string;
  workspaceFolders?: vscode.WorkspaceFolder[] | undefined;
}
