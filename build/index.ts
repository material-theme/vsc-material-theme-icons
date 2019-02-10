import getRemoteIcons from './get-remote-icons';
import minimizeIcons from './svgo';
import buildIcons from './icons';
import minimizeJson from './json-minify';
import buildIconsAccents from './icons-accents';
import buildIconsVariants from './icons-variants';
import buildIconsVariantsJsons from './icons-variants-jsons';
import * as ora from 'ora';

const spinner = ora('Running build').start();

getRemoteIcons()
  .then(() => {
    spinner.succeed('Got remote icons');
    return minimizeIcons();
  })
  .then(() => {
    spinner.succeed('Icon minimized');
    return buildIcons();
  })
  .then(() => {
    spinner.succeed('Icon built');
    return minimizeJson();
  })
  .then(() => {
    spinner.succeed('Json minimized');
    return buildIconsAccents();
  })
  .then(() => {
    spinner.succeed('Icon accents built');
    return buildIconsVariants();
  })
  .then(() => {
    spinner.succeed('Icon variants built');
    return buildIconsVariantsJsons();
  })
  .then(() => {
    spinner.succeed('Icons variants jsons built');
    spinner.color = 'green';
    spinner.text = 'Finished.';
    spinner.stop();
    return Promise.resolve();
  })
  .catch(error => {
    spinner.fail('Build failed');
    console.error(error);
  });
