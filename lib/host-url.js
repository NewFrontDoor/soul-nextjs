const isDev = process.env.NODE_ENV === 'development';

export default isDev ? process.env.DEV_HOST : process.env.PROD_HOST;
