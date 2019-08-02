import { configure } from '@storybook/angular';

// automatically import all files ending in *.stories.ts
const reqApps = require.context('../apps', true, /\.stories\.ts$/);
const reqLibs = require.context('../libs', true, /\.stories\.ts$/);

function loadStories() {
  reqApps.keys().forEach(filename => reqApps(filename))
  reqLibs.keys().forEach(filename => reqLibs(filename))
}

configure(loadStories, module);
