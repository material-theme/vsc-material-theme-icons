
import * as vscode from 'vscode';

import fixIcons from './commands/fix-icons';
import Settings from './lib/persistent-settings';
import {changelogMessage} from './lib/messages';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const settings = new Settings(vscode, context.globalStoragePath);
    // const materialThemeInstalled = await isMaterialTheme(await getCurrentThemeID());

    // if (settings.isFirstInstall() && !materialThemeInstalled && await installationMessage()) {
    //     await openMaterialThemeExt();
    // }

    // TODO implement show changelog
    // if (settings.isNewVersion() && await changelogMessage()) {
    //
    // }

    if (settings.isNewVersion()) {
        changelogMessage(settings.getSettings().extensionSettings.version);
    }

    settings.updateStatus();
    const fixIconsCommand = vscode.commands.registerCommand('eqMaterialThemeIcons.fixIcons', fixIcons);
    context.subscriptions.push(fixIconsCommand);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
    // TODO
}
