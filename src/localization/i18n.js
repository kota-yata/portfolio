import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import ja from './ja.json';
import en from './en.json';

addMessages('ja', ja);
addMessages('en', en);

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
