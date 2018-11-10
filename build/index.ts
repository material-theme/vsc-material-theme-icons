import getRemoteIcons from './get-remote-icons';
import minimizeIcons from './svgo';
import buildIcons from './icons';
import minimizeJson from './json-minify';
import buildIconsAccents from './icons-accents';
import buildIconsVariants from './icons-variants';
import buildIconsVariantsJsons from './icons-variants-jsons';

getRemoteIcons()
  .then(minimizeIcons)
  .then(buildIcons)
  .then(minimizeJson)
  .then(buildIconsAccents)
  .then(buildIconsVariants)
  .then(buildIconsVariantsJsons)
  .then(() => console.log('### FINISHED ###'))
  .catch(console.error);
