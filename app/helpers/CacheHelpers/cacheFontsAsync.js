import { Font } from 'expo';

/**
 * preload fonts and other assets
 * @param {Object} fonts
 * @return void
 */
const cacheFontsAsync = async (fonts) => {
  try {
    await Font.loadAsync(fonts);
    return true;
  } catch (e) {
    return false;
  }
};

export default cacheFontsAsync;
