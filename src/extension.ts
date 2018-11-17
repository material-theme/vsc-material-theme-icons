
import * as vscode from 'vscode';

import fixIcons from './commands/fix-icons';

export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const fixIconsCommand = vscode.commands.registerCommand('eqMaterialThemeIcons.fixIcons', fixIcons);
    context.subscriptions.push(fixIconsCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('Todo');
}
