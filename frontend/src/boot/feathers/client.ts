import { boot } from 'quasar/wrappers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import { bootstrap } from '.';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  const apiClient = axios.create({ baseURL: process.env.API_URL_CLIENT });
  const restClient = rest();
  bootstrap({ services: restClient.axios(apiClient) });
});
