import * as path from 'path';
import * as execa from 'execa';
import * as rimraf from 'rimraf';
import {ncp} from 'ncp';

const pCopy = (src: string, dest: string): Promise<void> =>
  new Promise((resolve, reject): void =>
    ncp(src, dest, err => err ? reject(err) : resolve())
  );

const pRm = (dir: string): Promise<void> => new Promise((resolve, reject): void =>
  rimraf(dir, (err: any) => err ? reject(err) : resolve())
);

/**
 * Get remote Material Icons
 */
export default async (): Promise<void> => {
  const src = 'ssh://equinsuocha@vs-ssh.visualstudio.com:22/vsc-material-theme-icons/_ssh/vsc-material-theme-icons';
  const tmpDest = './_tmp-output-remote-icons';
  const dest = './src/icons/svgs';

  await execa('git', [
    'clone',
    '--depth=1',
    src,
    tmpDest
  ]);
  await pCopy(path.join(tmpDest, dest), dest);
  await pRm(tmpDest);
};
