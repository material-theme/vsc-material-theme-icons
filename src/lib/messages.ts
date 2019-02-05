import {window as Window} from 'vscode';

const MESSAGES = {
  CHANGELOG: {
    message: 'Material Theme Icons was updated! Version ',
    // TODO Show changelog
    // message: 'Material Theme Icons was updated. Check the release notes for more details.',
    //options: {ok: 'Show me 📝', cancel: 'Maybe later ⏱'}
  },
  INSTALLATION: {
    message: 'Thank you for using Material Theme Icons! Install also the Material Theme for a more immersive experience.',
    options: {ok: 'Sure! 👌', cancel: 'Nope 😢'}
  }
};

export const changelogMessage = async (iconsVersion: string): Promise<string | undefined> =>
  Window.showInformationMessage(
    MESSAGES.CHANGELOG.message + iconsVersion,
  );

export const installationMessage = async (): Promise<boolean> =>
  await Window.showInformationMessage(
    MESSAGES.INSTALLATION.message,
    MESSAGES.INSTALLATION.options.ok,
    MESSAGES.INSTALLATION.options.cancel
  ) === MESSAGES.INSTALLATION.options.ok;
