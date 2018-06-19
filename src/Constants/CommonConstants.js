const APIConstants = {
  LIVE_DEV_ADDRESS: 'https://crescenttesting.azurewebsites.net/api',
  LIVE_PROD_ADDRESS: 'https://lunarprod.azurewebsites.net/api',
};

export const hostname = window && window.location && window.location.hostname;
const CommonConstants = {
  API_ENDPOINT: hostname.startsWith('lunartesting.azurewebsites')
    ? APIConstants.LIVE_PROD_ADDRESS
    : APIConstants.LIVE_DEV_ADDRESS,
};

export default CommonConstants;
