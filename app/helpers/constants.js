import { Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';
import { settings } from '$config';

/**
 * StatusBar height for both Android and iOS
 *
 * @type {integer}
 */
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

/**
 * Valores numéricos da altura e largura da tela da statusBar. Funciona em iOS e Android
 * OBS: A altura já está descontando a altura da barra de status do dispositivo
 *
 * @type {integer}
 */
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;


/**
 * Schema url prefix
 * It's used for deep link our application
 * For more detail, see: https://reactnavigation.org/docs/guides/linking#URI-Prefix
 */
export const SCHEMA_PREFIX = Platform.OS === 'android' ?
  `${settings.uriPrefix}://${settings.uriPrefix}/` : `${settings.uriPrefix}://`;
