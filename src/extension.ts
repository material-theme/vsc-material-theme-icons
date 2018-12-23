
import * as vscode from 'vscode';

import fixIcons from './commands/fix-icons';

export function activate(context: vscode.ExtensionContext) {
    const fixIconsCommand = vscode.commands.registerCommand('eqMaterialThemeIcons.fixIcons', fixIcons);
    context.subscriptions.push(fixIconsCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('Todo');
}
