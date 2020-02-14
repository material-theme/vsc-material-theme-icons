
// tslint:disable only-arrow-functions
// tslint:disable no-unused-expression
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {vscode} from '../utils';
import PersistentSettings from '../../src/lib/persistent-settings';
import {IState} from '../../typings/interfaces/persistent-settings';

const globalStoragePath = path.join(os.tmpdir(), 'vsc-material-theme');

describe('PersistentSettings: tests', function (): void {
  context('ensures that', function (): void {
    context('getting the settings', function (): void {
      it('more than once, returns the same instance', function (): void {
        const persistentSettings = new PersistentSettings(vscode, globalStoragePath);
        const settings = persistentSettings.getSettings();
        const settingsAgain = persistentSettings.getSettings();
        expect(settings).to.be.an.instanceOf(Object);
        expect(settingsAgain).to.be.an.instanceOf(Object);
        expect(settingsAgain).to.be.deep.equal(settings);
      });

      context('returns the correct name when application is the', function (): void {
        it('`Code - Insiders`', function (): void {
          vscode.env.appName = 'Visual Studio Code - Insiders';
          const settings = new PersistentSettings(vscode, globalStoragePath).getSettings();
          expect(settings.isInsiders).to.be.true;
          expect(settings.isOSS).to.be.false;
          expect(settings.isDev).to.be.false;
        });

        it('`Code`', function (): void {
          vscode.env.appName = 'Visual Studio Code';
          const settings = new PersistentSettings(vscode, globalStoragePath).getSettings();
          expect(settings.isInsiders).to.be.false;
          expect(settings.isOSS).to.be.false;
          expect(settings.isDev).to.be.false;
        });

        // it('`Code - OSS`', function () {
        //   vscode.env.appName = 'VSCode OSS';
        //   const settings = new PersistentSettings(vscode).getSettings();
        //   expect(settings.isInsiders).to.be.false;
        //   expect(settings.isOSS).to.be.true;
        //   expect(settings.isDev).to.be.false;
        // });

        // it('`Code - OSS Dev`', function () {
        //   vscode.env.appName = 'VSCode OSS Dev';
        //   const settings = new PersistentSettings(vscode).getSettings();
        //   expect(settings.isInsiders).to.be.false;
        //   expect(settings.isOSS).to.be.false;
        //   expect(settings.isDev).to.be.true;
        // });
      });
    });
  });

  context('ensures that', function (): void {
    let persistentSettings: PersistentSettings;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      persistentSettings = new PersistentSettings(vscode, globalStoragePath);
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      persistentSettings = undefined as any;
      sandbox.restore();
    });

    // it('the Error gets logged when writting the state fails', function () {
    //   const writeToFile = sandbox.stub(fs, 'writeFileSync').throws();
    //   const logStub = sandbox.stub(ErrorHandler, 'logError');
    //   const stateMock: IState = {
    //     version: '0.0.0',
    //     status: ExtensionStatus.notActivated,
    //     welcomeShown: false,
    //   };
    //   settingsManager.setState(stateMock);
    //   expect(logStub.called).to.be.true;
    //   expect(writeToFile.called).to.be.true;
    // });

    it('the state gets written to a settings file', function (): void {
      const writeToFile = sandbox.stub(fs, 'writeFileSync');
      const stateMock: IState = {
        version: '0.0.0'
      };
      persistentSettings.setState(stateMock);
      expect(writeToFile.called).to.be.true;
    });

    it('the settings status gets updated', function (): void {
      const stateMock: IState = {
        version: '1.0.0'
      };
      const getState = sinon
        .stub(persistentSettings, 'getState')
        .returns(stateMock);
      const setState = sinon.stub(persistentSettings, 'setState');
      persistentSettings.updateStatus();
      expect(getState.called).to.be.true;
      expect(setState.called).to.be.true;
    });

    it('the settings status does not get updated if no status is provided', function (): void {
      const stateMock: IState = {
        version: persistentSettings.getSettings().extensionSettings.version
      };
      const getState = sinon
        .stub(persistentSettings, 'getState')
        .returns(stateMock);
      const setState = sinon.stub(persistentSettings, 'setState');
      const state = persistentSettings.updateStatus();
      expect(getState.called).to.be.true;
      expect(setState.called).to.be.true;
      expect(state.version).to.be.equal(stateMock.version);
    });

    it('the settings file gets deleted', function (): void {
      const deleteFile = sandbox.stub(fs, 'unlinkSync');
      persistentSettings.deleteState();
      expect(deleteFile.called).to.be.true;
    });

    context('getting the state', function (): void {
      it('returns the state from the settings file', function (): void {
        const stateMock: IState = {
          version: '1.0.0'
        };
        sandbox.stub(fs, 'existsSync').returns(true);
        sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(stateMock));
        const state = persistentSettings.getState();
        expect(state).to.be.an.instanceOf(Object);
        expect(state).to.have.all.keys('version');
        expect(Object.keys(state)).to.have.lengthOf(1);
      });

      context('returns a default state when', function (): void {
        it('no settings file exists', function (): void {
          sandbox.stub(fs, 'existsSync').returns(false);
          const state = persistentSettings.getState();
          expect(state).to.be.instanceOf(Object);
          expect(state.version).to.be.equal('0.0.0');
        });

        it('reading the file fails', function (): void {
          sandbox.stub(fs, 'existsSync').returns(true);
          sandbox.stub(fs, 'readFileSync').throws(Error);
          sandbox.stub(console, 'error');
          const state = persistentSettings.getState();
          expect(state).to.be.instanceOf(Object);
          expect(state.version).to.be.equal('0.0.0');
        });

        it('parsing the file content fails', function (): void {
          sandbox.stub(fs, 'existsSync').returns(true);
          sandbox.stub(fs, 'readFileSync').returns('test');
          const state = persistentSettings.getState();
          expect(state).to.be.instanceOf(Object);
          expect(state.version).to.be.equal('0.0.0');
        });
      });
    });

    context('the `isNewVersion` function is', function (): void {
      it('truthy for a new extension version', function (): void {
        const stateMock: IState = {
          version: '0.0.1'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isNewVersion()).to.be.true;
        expect(getState.called).to.be.true;
      });

      it('falsy for the same extension version', function (): void {
        const stateMock: IState = {
          version: persistentSettings.getSettings().extensionSettings.version
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isNewVersion()).to.be.false;
        expect(getState.called).to.be.true;
      });

      it('falsy for an older extension version', function (): void {
        const stateMock: IState = {
          version: '100.0.0'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isNewVersion()).to.be.false;
        expect(getState.called).to.be.true;
      });

      it('falsy for a first install', function (): void {
        const stateMock: IState = {
          version: '0.0.0'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isNewVersion()).to.be.false;
        expect(getState.called).to.be.true;
      });
    });

    context('the `isFirstInstall` function is', function (): void {
      it('truthy for a new installation (from 0.0.0)', function (): void {
        const stateMock: IState = {
          version: '0.0.0'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isFirstInstall()).to.be.true;
        expect(getState.called).to.be.true;
      });

      it('falsy for a new extension version', function (): void {
        const stateMock: IState = {
          version: '0.0.1'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isFirstInstall()).to.be.false;
        expect(getState.called).to.be.true;
      });

      it('falsy for the same extension version', function (): void {
        const stateMock: IState = {
          version: persistentSettings.getSettings().extensionSettings.version
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isFirstInstall()).to.be.false;
        expect(getState.called).to.be.true;
      });

      it('falsy for an older extension version', function (): void {
        const stateMock: IState = {
          version: '100.0.0'
        };
        const getState = sinon
          .stub(persistentSettings, 'getState')
          .returns(stateMock);
        persistentSettings.getSettings();
        expect(persistentSettings.isFirstInstall()).to.be.false;
        expect(getState.called).to.be.true;
      });
    });
  });
});
