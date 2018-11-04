import * as execa from 'execa';

import {PATHS} from './helpers/paths';

export default async () => {
  await execa('mkdir', [PATHS.icons]);
  await execa('svgo', ['-f', PATHS.srcSvgs, PATHS.icons]);
};
