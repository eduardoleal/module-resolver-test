/**
 * Get the current enviroment name
 * @return {string}
 */
const getEnv = () => process.env.NODE_ENV;

/**
 * Tell if the app is running in production mode
 * @return {boolean}
 */
const inProduction = () => getEnv() === 'production';

/**
 * Tell if the app is running in development mode
 * @return {boolean}
 */
const inDevelopment = () => inProduction === false;

export {
  getEnv,
  inProduction,
  inDevelopment,
};
